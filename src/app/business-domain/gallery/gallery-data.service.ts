import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    concatMap,
    map,
    Observable,
    shareReplay,
    startWith,
    switchMap,
    timer
} from 'rxjs';
import {
    Document,
    DocumentDetails
} from '../../data-domain/gallery/models/gallery';
import { GalleryApiClientService } from '../../data-domain/gallery/services/gallery-api-client.service';
import { Uuid } from '../../infrastructure/uid/uuid';
import { albumId } from '../album-id';

@Injectable({
    providedIn: 'root'
})
export class GalleryDataService {
    private refresh$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

    constructor(
        private readonly apiClient: GalleryApiClientService,
    ) {
    }

    public refresh(): void {
        this.refresh$.next(null);
    }

    public readonly documents$: Observable<Document[]> = this.refresh$.pipe(
        switchMap(_ => timer(500, 60000).pipe(
                concatMap(_ => this.apiClient.fetchDocuments$(albumId)),
                shareReplay(1, 30)
            )
        )
    );

    public document$(documentId: Uuid): Observable<DocumentDetails> {
        return this.apiClient.fetchDocumentDetails$(documentId);
    }
}
