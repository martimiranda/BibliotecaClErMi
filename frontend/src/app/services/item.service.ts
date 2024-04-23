import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    private _router = inject(Router);

    private baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    async searchItems(term: string) {
        try {
            const response: any = await firstValueFrom(
                this.http.get(`${this.baseUrl}/items/search`, {
                    params: { term: term },
                    observe: 'response',
                }),
            );
            console.log('ItemService | searchItems - response -> ', response);

            return response;
        } catch (error: any) {
            console.error('Error fetching items', error);
            throw error;
        }
    }
}
