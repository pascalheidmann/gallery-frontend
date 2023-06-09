import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Dialog, DialogModule, DialogRef} from "@angular/cdk/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import {CommonModule, Location} from "@angular/common";
import {DetailComponent} from "../../detail/detail/detail.component";
import {UploadComponent} from "../upload/upload.component";

@Component({
    selector: 'app-upload-outlet',
    templateUrl: './upload-outlet.component.html',
    styleUrls: ['./upload-outlet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DialogModule, DetailComponent]
})
export class UploadOutletComponent implements OnInit {
    constructor(
        private readonly dialog: Dialog,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly location: Location
    ) {
    }

    public ngOnInit(): void {
        let dialogRef: DialogRef<unknown, UploadComponent> = this.dialog.open(UploadComponent, {
            width: '95dvw',
            height: '95dvh',
            maxWidth: '800px',
            maxHeight: '800px',
            hasBackdrop: true,
            closeOnDestroy: true,
            data: {}
        });

        dialogRef.closed.subscribe(() => this.router.navigated && this.location.back());
    }
}
