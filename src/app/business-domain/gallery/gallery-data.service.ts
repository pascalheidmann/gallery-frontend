import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Document} from "../../data-domain/gallery/models/gallery";

@Injectable({
    providedIn: 'root'
})
export class GalleryDataService {
    public readonly documents$ = new BehaviorSubject<Document[]>([
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
