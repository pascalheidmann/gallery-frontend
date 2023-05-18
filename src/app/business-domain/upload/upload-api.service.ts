import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadPreview } from '../../data-domain/upload/models/uploadPreview';
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

    public uploads: { preview: UploadPreview, request: Observable<any> }[] = [];

    public upload(file: File, albumId: Uuid): void {//Observable<FileUpload> {
        let formData = new FormData();
        formData.append('file', file, file.name);

        const request = this.httpClient.post(
            `/api/album/${albumId}/upload`,
            formData
        );
        request.subscribe(() => {
            this.galleryDataService.refresh();
        });
        this.uploads.push({
            preview: {
                file: file,
                previewImage: URL.createObjectURL(file),
                isImage: file.type.startsWith('image'),
                isVideo: file.type.startsWith('video'),
            }, request: request
        });
    }
}
