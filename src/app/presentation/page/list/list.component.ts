import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadApiService } from '../../../business-domain/upload/upload-api.service';
import {UserDataService} from "../../../business-domain/user/user-data.service";
import {GalleryDataService} from "../../../business-domain/gallery/gallery-data.service";
import {CdkVirtualForOf} from "@angular/cdk/scrolling";
import {Router, RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Document, DocumentPreview} from "../../../data-domain/gallery/models/gallery";
import {Uuid} from "../../../infrastructure/uid/uuid";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        NgOptimizedImage,
        CdkVirtualForOf,
        RouterLink,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
    ]
})
export class ListComponent {
    constructor(
        public readonly userDataServiceService: UserDataService,
        public readonly galleryDataService: GalleryDataService,
        public readonly uploadApiService: UploadApiService,
        public readonly router: Router,
    ) {
    }

    public showUpload(): void {
        this.router.navigate(['', {relativeUrl: true, outlets: {overlay: ['upload']}}]);
    }

    public getPreviewId(index: number, preview: DocumentPreview): Uuid {
        return preview.id;
    };

    public getDocumentId(index: number, document: Document): Uuid {
        return document.id;
    }
}
