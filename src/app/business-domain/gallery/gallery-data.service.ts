import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    concatMap, concatWith,
    map,
    Observable,
    of, startWith,
    switchMap, tap,
    timer,
    withLatestFrom
} from 'rxjs';
import { Document } from '../../data-domain/gallery/models/gallery';
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
            )
        )
    );

    public document$(documentId: Uuid): Observable<Document | undefined> {
        return this.documents$.pipe(
            startWith([]),
            map((documents: Document[]) => documents?.find(
                document => document.id === documentId)),
        );
    }
}
