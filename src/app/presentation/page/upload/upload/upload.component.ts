import {ChangeDetectionStrategy, Component, HostBinding, HostListener} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {map, Observable, Subject} from "rxjs";
import {UploadApiService} from "../../../../business-domain/upload/upload-api.service";
import {MatCardModule} from "@angular/material/card";

interface UploadPreview {
    file: File;
    previewImage: string;
    isImage: boolean;
    isVideo: boolean;
}

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DialogModule, MatIconModule, MatButtonModule, HttpClientModule, MatCardModule]
})
export class UploadComponent {
    private files = [];
    public files$: Subject<File[]> = new Subject<File[]>();

    public previews$: Observable<UploadPreview[]> = this.files$.pipe(
        map((files: File[]) =>
            files.map(
                (file: File) => ({
                    file: file,
                    previewImage: URL.createObjectURL(file),
                    isImage: file.type.startsWith('image'),
                    isVideo: file.type.startsWith('video'),
                })
            )
        ),
    );

    @HostBinding('class.fileover')
    public dragOver: boolean = false;

    constructor(
        private readonly uploadApiService: UploadApiService,
        private readonly location: Location,
    ) {
    }

    public onFileSelected({event}: { event: any }) {
        this.addFiles(Array.from(event.target.files))
    }

    private addFiles(files: File[]): void {
        files.forEach((file: File | null) => {
            if (file) {
                // @ts-ignore
                this.files.push(file);
            }
        });

        this.files$.next(this.files);
    }

    public uploadAll(): void {
        this.files.forEach((file: File) => {
            this.uploadApiService.upload(file);
        });
        this.location.back();
    }

    public removeFile(index: number): void {
        this.files.splice(index, 1);
        this.files$.next(this.files);
    }

    @HostListener('dragover', ['$event'])
    public dragEnter(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver = true;
    }

    @HostListener('dragleave', ['$event'])
    public dragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver = false;
    }

    @HostListener('drop', ['$event'])
    public dragDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver = false;

        const files = event.dataTransfer?.files ?? [];
        console.log(files);
        if (files?.length > 0) {
            this.addFiles(Array.from(files));
        }
    }
}
