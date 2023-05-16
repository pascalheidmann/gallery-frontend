import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GalleryDataService} from "../gallery/gallery-data.service";
import {tap} from "rxjs";

const uploadUrl = '/api/album/01GZA1QY5ZGB5EW7BC528F06JH/upload';

@Injectable({
    providedIn: 'root',
})
export class UploadApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly galleryDataService: GalleryDataService
        ) {
    }

    public upload(file: File): void {//Observable<FileUpload> {
        let formData = new FormData();
        formData.append('file', file, file.name);
        let request = this.httpClient.post(uploadUrl, formData)
            .pipe(tap(console.log))
            .subscribe(() => this.galleryDataService.refresh());
    }
}
