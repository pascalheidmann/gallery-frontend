import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {map, Observable, of, Subject, tap} from "rxjs";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DialogModule, MatIconModule, MatButtonModule, HttpClientModule]
})
export class UploadComponent {
    private files = [];
    public files$: Subject<File[]> = new Subject<File[]>();
    public previews$: Observable<string[]> = this.files$.pipe(
        tap(console.log),
        map((files: File[]) =>
            files.map((file) => URL.createObjectURL(file))
        ),
    );

    constructor(private http: HttpClient) {
    }

    public onFileSelected({event}: { event: any }) {
        // @ts-ignore
        Array.from(event.target.files).forEach((file: File | null) => {
           if (file) {
               // @ts-ignore
               this.files.push(file);
           }
        });

        this.files$.next(this.files);
        //let files = of(event.target.files);

    }
}
