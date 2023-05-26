import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserDataService } from '../../../business-domain/user/user-data.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
    ],
    standalone: true
})
export class RegisterFormComponent {
    constructor(
        public readonly userDataService: UserDataService,
        private readonly fb: FormBuilder,
    ) {}


    public formGroup: FormGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.email],
    }, {updateOn: "blur"});


    public register(event: SubmitEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.formGroup.valid) {
            //return;
        }

        this.userDataService.register(this.formGroup.get('email')?.value, this.formGroup.get('name')?.value);
    }
}
