import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, shareReplay} from "rxjs";
import {Document} from "../../data-domain/gallery/models/gallery";
import {HttpClient} from "@angular/common/http";

const apiUrl = '/api/album/01GZA1QY5ZGB5EW7BC528F06JH/'

@Injectable({
    providedIn: 'root'
})
export class GalleryDataService {
    constructor(private readonly httpClient: HttpClient) {
    }

    public readonly documents$: Observable<Document[]> = this.httpClient.get<{documents: Document[]}>(apiUrl)
        .pipe(
            shareReplay(1, 120),
            map(response => response.documents)
        );

    public readonly _documents$ = new BehaviorSubject<Document[]>([
        {
            id: 'test',
            created: new Date(),
            updated: null,
            type: 'image',
            path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
            previews: [
                {
                    width: 500,
                    height: 500,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
                    mime: 'image/jpeg'
                },
                {
                    width: 100,
                    height: 100,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-320.jpg',
                    mime: 'image/jpeg'
                }
            ]
        },
        {
            id: 'test',
            created: new Date(),
            updated: null,
            type: 'image',
            path: 'https://source.unsplash.com/random/900×700/?wedding',
            previews: [
                {
                    width: 500,
                    height: 500,
                    path: 'https://source.unsplash.com/random/500×500/?wedding',
                    mime: 'image/jpeg'
                },
                {
                    width: 100,
                    height: 100,
                    path: 'https://source.unsplash.com/random/100×100/?wedding',
                    mime: 'image/jpeg'
                }
            ]
        },
        {
            id: 'test',
            created: new Date(),
            updated: null,
            type: 'image',
            path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
            previews: [
                {
                    width: 500,
                    height: 500,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
                    mime: 'image/jpeg'
                },
                {
                    width: 100,
                    height: 100,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-320.jpg',
                    mime: 'image/jpeg'
                }
            ]
        },
        {
            id: 'test',
            created: new Date(),
            updated: null,
            type: 'image',
            path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
            previews: [
                {
                    width: 500,
                    height: 500,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
                    mime: 'image/jpeg'
                },
                {
                    width: 100,
                    height: 100,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-320.jpg',
                    mime: 'image/jpeg'
                }
            ]
        },
        {
            id: 'test',
            created: new Date(),
            updated: null,
            type: 'image',
            path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
            previews: [
                {
                    width: 500,
                    height: 500,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-800w.jpg',
                    mime: 'image/jpeg'
                },
                {
                    width: 100,
                    height: 100,
                    path: 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-320.jpg',
                    mime: 'image/jpeg'
                }
            ]
        }
    ]);
}
