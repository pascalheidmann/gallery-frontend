import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {of, withLatestFrom} from "rxjs";
import {Uuid} from "../../../../infrastructure/uid/uuid";
import {CommonModule, Location} from "@angular/common";
import {DetailComponent} from "../detail/detail.component";
import {Dialog, DialogModule, DialogRef} from "@angular/cdk/dialog";

@Component({
    selector: 'app-detail-outlet',
    templateUrl: './detail-outlet.component.html',
    styleUrls: ['./detail-outlet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DialogModule, DetailComponent]
})
export class DetailOutletComponent implements OnInit {
    public documentId$ = of(this.route.snapshot.paramMap.get('id') as Uuid);

    public overlay$ = this.documentId$.pipe(
        withLatestFrom()
    );

    constructor(
        private readonly dialog: Dialog,
        private readonly route: ActivatedRoute,
        private readonly location: Location
    ) {
    }

    public ngOnInit(): void {
        let dialogRef: DialogRef<unknown, DetailComponent> = this.dialog.open(DetailComponent, {
            width: '100vh',
            height: '100vh',
            maxWidth: '1200px',
            maxHeight: '1200px',
            hasBackdrop: true,
            closeOnDestroy: true,
            data: {
                documentId$: this.documentId$
            }
        });

        dialogRef.closed.subscribe(() => this.location.back());
    }

}
