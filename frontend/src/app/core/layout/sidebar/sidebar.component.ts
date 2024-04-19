import { Component, HostListener, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from './sidebar.interface';
import { RoleService } from '../../../modules/roles/role.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Role } from '../../../constants/role.code';
import { PrimeIcons } from 'primeng/api';
import { ProfileService } from '../../../services/profile.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    _roleService = inject(RoleService);
    router = inject(Router);
    _profileService = inject(ProfileService);

    @Input() sidebarLock: boolean = false;

    menuItems!: MenuItem[];
    configurationMenuItems!: MenuItem[];

    signOut = {
        label: 'Salir',
        routerLink: '*',
        icon: PrimeIcons.SIGN_OUT,
        hidden: true,
    };

    items!: any;

    sidebarHover: boolean = false;
    sidebarTrueHover: boolean = false;
    screenWidth!: any;

    role: any;
    userData!: any;

    @HostListener('window:resize', ['$event'])
    getScreenSize(): void {
        this.screenWidth = window.innerWidth;
    }

    async ngOnInit() {
        this.primeNgConfig.ripple = true;
        this.role = await this._profileService.getRole();

        switch (this.role.id) {
            case Role.ADMIN:
                this.menuItems = [
                    {
                        label: 'Inicio',
                        routerLink: '/',
                        icon: PrimeIcons.HOME,
                        hidden: true,
                    },
                    {
                        label: 'Resumen de pedidos',
                        routerLink: '/orderSummary',
                        icon: PrimeIcons.FILE,
                        hidden: true,
                    },
                    {
                        label: 'Ir a la tienda online',
                        routerLink: '*',
                        icon: PrimeIcons.GLOBE,
                        hidden: true,
                    },
                ];
                this.configurationMenuItems = [
                    {
                        label: 'Roles',
                        routerLink: '/roles',
                        icon: PrimeIcons.USER,
                        hidden: true,
                    },
                    {
                        label: 'Clientes',
                        routerLink: '/clients',
                        icon: PrimeIcons.USERS,
                        hidden: true,
                    },
                ];
                break;
            case Role.CLIENT:
                this.menuItems = [
                    {
                        label: 'Inicio',
                        routerLink: '/',
                        icon: PrimeIcons.HOME,
                        hidden: true,
                    },
                    {
                        label: 'Nuevo pedido',
                        routerLink: '/newOrder',
                        tooltip: 'Les teves coumitats',
                        icon: PrimeIcons.BOX,
                        hidden: true,
                    },
                    {
                        label: 'Resumen pedidos',
                        routerLink: '/orderSummary',
                        icon: PrimeIcons.FILE,
                        hidden: true,
                    },
                    {
                        label: 'Ir a la tienda online',
                        routerLink: '*',
                        icon: PrimeIcons.GLOBE,
                        hidden: true,
                    },
                    {
                        label: 'Datos personales',
                        routerLink: '/myData',
                        icon: PrimeIcons.USER,
                        hidden: true,
                    },
                ];
                break;
        }
    }

    menuClick(item: MenuItem) {
        if (item.expanded != undefined) {
            item.expanded = !item.expanded;
            return;
        }

        if (item.routerLink != undefined) {
            this.router.navigate([item.routerLink]);
            return;
        }

        if (item.externalLink != undefined) {
            this.goToExternalLink(item.externalLink);
        }
    }

    isCurrentPage(item: MenuItem): boolean {
        if (item.routerLink) {
            console.log('router.url -> ', this.router.url);
            console.log('item.routerLink -> ', item.routerLink);

            return item.routerLink != '' && item.routerLink === this.router.url;
        }
        return false;
    }

    subMenuState(item: MenuItem): string {
        var isExpanded = item.expanded;
        if (isExpanded) {
            return 'expanded';
        } else return 'collapsed';
    }

    middleClick(e: any, item: MenuItem): void {
        if (item.routerLink == undefined) return;
        if (e.button == 1) {
            console.log('/' + item.routerLink);
            window.open('/' + item.routerLink, '_blank');
        }
        e.preventDefault();
    }

    sidebarMouseEnter() {
        this.getScreenSize();
        if (this.screenWidth >= 768) {
            this.sidebarHover = true;
            this.sidebarLock = true;
        }
    }
    sidebarMouseLeave() {
        this.sidebarHover = false;
        this.sidebarLock = false;
    }

    logout() {
        this._profileService.logout();
    }
}
