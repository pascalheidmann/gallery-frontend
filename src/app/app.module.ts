import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatToolbarModule} from "@angular/material/toolbar";
import {DetailOutletComponent} from './presentation/page/detail/detail-outlet/detail-outlet.component';
import {CdkConnectedOverlay} from "@angular/cdk/overlay";
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from "@angular/material/select";
import { DetailComponent } from './presentation/page/detail/detail/detail.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        CdkConnectedOverlay
    ],
    providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule {
}
