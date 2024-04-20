import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { JwtGuard } from './guards/jwt.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'landing',
        component: LoginComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        // canActivate: [JwtGuard],
        children: [{ path: 'dashboard', pathMatch: 'full', component: DashboardComponent }],
    },
    { path: '**', redirectTo: '' },
];
