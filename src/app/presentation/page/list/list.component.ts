import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {UserDataService} from "../../../business-domain/user/user-data.service";
import {GalleryDataService} from "../../../business-domain/gallery/gallery-data.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        NgOptimizedImage,
    ]
})
export class ListComponent {
    constructor(
        public readonly userDataServiceService: UserDataService,
        public readonly galleryDataService: GalleryDataService,
    ) {
    }
}
