import { ChangeDetectorRef, Injectable } from '@angular/core';
import {Uuid} from "../../../infrastructure/uid/uuid";
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Document, DocumentDetails } from '../models/gallery';
import {HttpClient} from "@angular/common/http";

interface CategoryListResponse {
    documents: Document[]
}

@Injectable({
    providedIn: 'root'
})
export class GalleryApiClientService {

    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    public fetchDocuments$(categoryId: Uuid): Observable<Document[]> {
        return this.httpClient.get<CategoryListResponse>(`/api/album/${categoryId}/`)
            .pipe(
                map((response: CategoryListResponse) => response.documents)
            );
    }

    public fetchDocumentDetails$(documentId: Uuid): Observable<DocumentDetails> {
        return this.httpClient.get<DocumentDetails>(`/api/document/${documentId}/`)
            .pipe(
                shareReplay(1, 600)
            );
    }
}
