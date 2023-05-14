import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Uuid} from "../../../../infrastructure/uid/uuid";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DetailComponent {
    @Input()
    public documentId: Uuid | null = null;
}
