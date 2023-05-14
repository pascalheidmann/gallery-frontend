import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {of, withLatestFrom} from "rxjs";
import {Uuid} from "../../../../infrastructure/uid/uuid";
import {CommonModule} from "@angular/common";
import {DetailComponent} from "../detail/detail.component";
import {Overlay} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Component({
    selector: 'app-detail-outlet',
    templateUrl: './detail-outlet.component.html',
    styleUrls: ['./detail-outlet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DetailComponent]
})
export class DetailOutletComponent implements OnInit {
    public documentId$= of(this.route.snapshot.paramMap.get('id') as Uuid);

    @ViewChild(TemplateRef, { static: true })
    // @ts-ignore
    private templateRef: TemplateRef<HTMLElement>;

    public overlay$ = this.documentId$.pipe(
        withLatestFrom()
    );

    constructor(
        private readonly route: ActivatedRoute,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly overlay: Overlay
    ) {
    }

    public ngOnInit(): void {

        const positionStrategyBuilder = this.overlay.position();

        const positionStrategy = positionStrategyBuilder.global();

        const scrollStrategy = this.overlay.scrollStrategies.block();

        const overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy,
            scrollStrategy,
        });

        const templatePortal = new TemplatePortal(this.templateRef, this.viewContainerRef);

        overlayRef.attach(templatePortal);

        overlayRef.backdropClick().subscribe(() => {

            overlayRef.dispose();
        });
    }
}
