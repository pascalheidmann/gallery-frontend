import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, shareReplay, switchMap, timer} from "rxjs";
import {Document} from "../../data-domain/gallery/models/gallery";
import {HttpClient} from "@angular/common/http";

const apiUrl = '/api/album/01GZA1QY5ZGB5EW7BC528F06JH/'

@Injectable({
    providedIn: 'root'
})
export class GalleryDataService {
    constructor(private readonly httpClient: HttpClient) {
    }

    public readonly documents$: Observable<Document[]> = timer(500, 60000).pipe(
        switchMap(() => this.httpClient.get<{ documents: Document[] }>(apiUrl)),
        shareReplay(1, 60),
        map(response => response.documents)
    );
}
