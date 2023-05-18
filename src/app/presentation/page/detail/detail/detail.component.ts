import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable, switchMap } from 'rxjs';
import { GalleryDataService } from '../../../../business-domain/gallery/gallery-data.service';
import { Document } from '../../../../data-domain/gallery/models/gallery';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class DetailComponent {
    constructor(
        @Inject(DIALOG_DATA) public data: { documentId$: Observable<string> },
        public readonly galleryDataService: GalleryDataService,
    ) {
    }

    public readonly documents$ = this.galleryDataService.documents$;

    public document$ = this.data.documentId$.pipe(
        switchMap(
            documentId => this.galleryDataService.document$(documentId)
        )
    );

    public async download(element: Document): Promise<void> {
        const image = await fetch(element.path);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = element.path.split('/').slice(-1)[0];
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
