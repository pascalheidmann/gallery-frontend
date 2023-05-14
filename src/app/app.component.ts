import {ChangeDetectionStrategy, Component} from '@angular/core';
import {trigger} from "@angular/animations";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'gallery-frontend';
    public overlayIsOpen: any;
}
