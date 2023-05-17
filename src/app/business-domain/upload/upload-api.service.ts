import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
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

    public upload(file: File, albumId: Uuid): void {//Observable<FileUpload> {
        let formData = new FormData();
        formData.append('file', file, file.name);
        let request = this.httpClient.post(`/api/album/${albumId}/upload`, formData)
            .pipe(tap(console.log))
            .subscribe(() => this.galleryDataService.refresh());
    }
}
