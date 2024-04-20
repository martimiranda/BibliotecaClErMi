import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';
import { ProfileServic } from '/../../../../services/profile.service';
import { Router } from '@angular/router';

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
            cif: new FormControl('', [Validators.required, Validators.minLength(9), LoginComponent.isValidCIF()]),
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

    static isValidCIF(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const cif = control.value;
            const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
            var match = cif.match(CIF_REGEX);
            if (match === null) {
                return { invalidCIF: true };
            }

            var letter = match[1],
                number = parseInt(match[2], 10),
                controlValue = match[3];

            var even_sum = 0;
            var odd_sum = 0;
            var n;

            for (var i = 0; i < number.toString().length; i++) {
                n = parseInt(number.toString()[i], 10);

                if (i % 2 === 0) {
                    n *= 2;
                    odd_sum += n < 10 ? n : n - 9;
                } else {
                    even_sum += n;
                }
            }

            var control_digit = 10 - parseInt((even_sum + odd_sum).toString().slice(-1), 10);
            var control_letter = 'JABCDEFGHI'.substring(control_digit, control_digit + 1);

            var isValid = false;
            if (letter.match(/[ABEH]/)) {
                isValid = controlValue === control_digit.toString();
            } else if (letter.match(/[KPQS]/)) {
                isValid = controlValue === control_letter;
            } else {
                isValid = controlValue === control_digit.toString() || controlValue === control_letter;
            }

            return isValid ? null : { invalidCIF: true };
        };
    }
}
