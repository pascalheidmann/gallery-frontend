import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {Uuid} from "../../../../infrastructure/uid/uuid";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
    public documentId$ = of(this.route.snapshot.paramMap.get('id') as Uuid);

    constructor(
        private readonly route: ActivatedRoute,
    ) {
    }
}
