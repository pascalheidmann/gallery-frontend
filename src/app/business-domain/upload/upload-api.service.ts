import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, timer, withLatestFrom } from 'rxjs';
import { UploadPreview } from '../../data-domain/upload/models/uploadPreview';
import {
    Upload,
    uploadOperator
} from '../../infrastructure/rxjs/upload/upload';
import { Uuid } from '../../infrastructure/uid/uuid';
import { GalleryDataService } from '../gallery/gallery-data.service';

@Injectable({
    providedIn: 'root',
})
export class UploadApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly galleryDataService: GalleryDataService
    ) {
    }

    public uploads: {
        preview: UploadPreview,
        upload$: Observable<Upload<any>>
    }[] = [];

    //public uploads$ = timer(1000).pipe(switchMap(() => of(this.uploads)));

    public upload(file: File, albumId: Uuid): void {//Observable<FileUpload> {
        let formData = new FormData();
        formData.append('file', file, file.name);

        const upload$ = this.httpClient.post(
            `/api/album/${albumId}/upload`,
            formData,
            {
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(uploadOperator());

        upload$.pipe(delay(2000)).subscribe(() => this.galleryDataService.refresh())

        this.uploads.push({
            preview: {
                file: file,
                previewImage: URL.createObjectURL(file),
                isImage: file.type.startsWith('image'),
                isVideo: file.type.startsWith('video'),
            },
            upload$: upload$
        });
    }
}
