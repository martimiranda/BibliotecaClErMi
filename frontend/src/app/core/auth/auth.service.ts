import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    _http = inject(HttpClient);
    _storage = inject(StorageService);

    private baseUrl: string = environment.apiUrl;

    async login(cif: string, password: string) {
        const body = { companyCIF: cif, password: password };

        try {
            let response: any = await firstValueFrom(
                this._http.post(`${this.baseUrl}/auth/login`, body, {
                    observe: 'response',
                    withCredentials: true,
                }),
            );
            response = response.body;

            this._storage.setItem('token', response.token);
            return response;
        } catch (error: any) {
            console.error('Error during login', error);
            throw error;
        }
    }

    async validateToken(): Promise<boolean> {
        try {
            const response = await firstValueFrom(
                this._http.get(`${this.baseUrl}/auth/verify`, {
                    observe: 'response',
                }),
            );
            return response ? true : false;
        } catch (error: any) {
            console.error('Error during token validation', error);
            return false;
        }
    }

    getToken() {
        return this._storage.getItem('token') || '';
    }

    async refreshToken() {
        try {
            let response: any = await firstValueFrom(this._http.get(`${this.baseUrl}/auth/refresh`));
            if (!response.token) {
                throw new Error('Token is undefined or null');
            }
            this._storage.setItem('token', response.token);
        } catch (error: any) {
            console.error('Error during token refresh', error);
            throw error;
        }
    }
}
