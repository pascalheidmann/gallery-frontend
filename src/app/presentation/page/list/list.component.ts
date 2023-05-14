import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {UserDataService} from "../../../business-domain/user/user-data.service";
import {GalleryDataService} from "../../../business-domain/gallery/gallery-data.service";
import {CdkVirtualForOf} from "@angular/cdk/scrolling";
import {Document} from "../../../data-domain/gallery/models/gallery";
import {Router, RouterLink} from "@angular/router";

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
    ]
})
export class ListComponent {
    constructor(
        public readonly userDataServiceService: UserDataService,
        public readonly galleryDataService: GalleryDataService,
        public readonly router: Router,
    ) {
    }
}
