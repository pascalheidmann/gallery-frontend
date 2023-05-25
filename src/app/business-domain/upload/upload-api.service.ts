import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    EMPTY,
    filter,
    map,
    Observable,
    of,
    retry,
    Subject,
    timer,
    withLatestFrom
} from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UploadPreview } from '../../data-domain/upload/models/uploadPreview';
import { Uuid } from '../../infrastructure/uid/uuid';
import { GalleryDataService } from '../gallery/gallery-data.service';

interface UploadQueueItem {
    preview: UploadPreview;
    request: Observable<any>;
}

@Injectable({
    providedIn: 'root',
})
export class UploadApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly galleryDataService: GalleryDataService
    ) {
    }

    public uploads: UploadQueueItem[] = [];
    public uploads$: Subject<UploadQueueItem[]> = new BehaviorSubject<UploadQueueItem[]>([]);

    private uploadFinished$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private newUpload$: Subject<null> = new Subject();

    private currentUpload$ = timer(1000, 1000).pipe(
        withLatestFrom([this.newUpload$, this.uploadFinished$]),
        distinctUntilChanged(),
        map((): UploadQueueItem | undefined => this.uploads.length > 0 ? this.uploads.shift() : undefined),
        // @ts-ignore
        filter((item: UploadQueueItem | undefined): boolean => item !== undefined),
        map((item: UploadQueueItem) => item.request.subscribe({
            complete: () => {
                this.uploads$.next(this.uploads ?? []);
                this.galleryDataService.refresh();
                this.uploadFinished$.next(1);
            }
        }))
    ).subscribe(() => {
    });

    public upload(file: File, albumId: Uuid): void {//Observable<FileUpload> {
        let formData = new FormData();
        formData.append('file', file, file.name);

        const request = this.httpClient.post(
            `/api/album/${albumId}/upload`,
            formData
        ).pipe(retry(3), catchError(() => of(EMPTY)));

        const nextUpload = {
            preview: {
                file: file,
                previewImage: URL.createObjectURL(file),
                isImage: file.type.startsWith('image'),
                isVideo: file.type.startsWith('video'),
            },
            request: request,
        };

        this.uploads.push(nextUpload);
        this.uploads$.next(this.uploads);
    }
}
