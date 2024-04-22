import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '../auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, PasswordModule, ButtonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    private _authService = inject(AuthService);
    private _profileService = inject(ProfileService);
    private _router = inject(Router);

    cif: string = '';
    password: string = '';

    loginError: boolean = false;
    errorMessage: string = "L'usuari o la contrasenya són incorrectes.";
    loginForm!: FormGroup;

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            cif: new FormControl('', [Validators.required, Validators.minLength(9)]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        });
    }

    async onLogin() {
        if (this.loginForm.status == 'INVALID') {
            const keys = Object.keys(this.loginForm.controls);

            for (const key of keys) {
                const controlErrors: ValidationErrors | null = this.loginForm.get(key)!.errors;
                if (!controlErrors) continue;
                const error = Object.keys(controlErrors)[0];
                // TO DO, REPLACE DEFAULT ALERT WHEN CUSTOM ALERTS ARE AVAILABLE
                if (error) {
                    this.loginError = true;
                    this.errorMessage = "L'usuari o la contrasenya són incorrectes.";
                    return;
                }
            }
        }

        try {
            const response = await this._authService.login(this.loginForm.get('cif')?.value, this.loginForm.get('password')?.value);

            if (response.token) {
                const profile = await this._profileService.getSelfProfileData();
                this._profileService.selfProfileData = profile;
                console.log('login.component | onLogin - profile -> ', profile);

                this._router.navigateByUrl('/');
            } else throw new Error('CIF or password are incorrect');
        } catch (error: any) {
            switch (error.status) {
                case 401:
                    this.loginError = true;
                    break;
                case 500:
                    alert('SERVER ERROR');
                    break;
                default:
                    this.loginError = true;
                    break;
            }
        }
    }
}
