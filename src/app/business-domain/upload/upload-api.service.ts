import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileUpload} from "../../data-domain/upload/models/upload";

const uploadUrl = '/api/album/01GZA1QY5ZGB5EW7BC528F06JH/upload';

@Injectable({
    providedIn: 'root',
})
export class UploadApiService {
    constructor(private readonly httpClient: HttpClient) {
    }

    public upload(file: File): void {//Observable<FileUpload> {
        let formData = new FormData();
        formData.append('file', file, file.name);
        let request = this.httpClient.post(uploadUrl, formData).subscribe(() => console.log);
/*
        return new Observable<FileUpload>({
            response: request,
            fileName: file.name,
            percent: 0,
            file: file,
        });*/
    }
}
