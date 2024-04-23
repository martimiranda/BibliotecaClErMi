import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SearchComponent } from './modules/search/search.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        children: [
            { path: '', redirectTo: 'inici', pathMatch: 'full' },

            { path: 'inici', component: HomeComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'cercar-llibre', component: SearchComponent }
        ]
    }
]
