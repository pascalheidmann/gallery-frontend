import {Observable} from "rxjs";

export interface FileUpload {
    response: Observable<any>;
    fileName: string;
    percent: number;
    file: File;
}
