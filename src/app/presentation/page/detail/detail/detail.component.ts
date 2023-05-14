import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {Observable} from "rxjs";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
    ],
})
export class DetailComponent {
    constructor(
        @Inject(DIALOG_DATA) public data: { documentId$: Observable<string> },
    ) {
    }
}
