import { Injectable, inject } from '@angular/core';
import { Role } from '../constants/role.code';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private _router = inject(Router);
    private _storageService = inject(StorageService);

    private baseUrl: string = environment.apiUrl;
    selfProfileData: any;

    constructor(private http: HttpClient) {}

    profileDataChanges = new BehaviorSubject<any>(null);

    async ngOnInit() {
        this.selfProfileData = await this.getSelfProfileData();
        this.profileDataChanges.subscribe((value) => {
            this.selfProfileData = value;
        });
    }

    async getSelfProfileData() {
        try {
            const response: any = await firstValueFrom(
                this.http.get(`${this.baseUrl}/user/userDetails`, {
                    observe: 'response',
                }),
            );

            this.selfProfileData = response.body.userDetails;
            this.profileDataChanges.next(this.selfProfileData);
            return this.selfProfileData;
        } catch (error: any) {
            console.error('Error fetching profile data', error);
            this.logout();
            throw error;
        }
    }

    async getSelfProfileDataWithoutLoading() {
        if (!this.selfProfileData) await this.getSelfProfileData();
        return this.selfProfileData;
    }

    async getRole() {
        if (!this.selfProfileData) await this.getSelfProfileData();
        return this.selfProfileData.role;
    }

    async getUserID() {
        if (!this.selfProfileData) await this.getSelfProfileData();
        return this.selfProfileData.id;
    }

    logout() {
        this.selfProfileData = null;
        this._storageService.removeItem('token');
        this._router.navigateByUrl('/login');
    }
}
