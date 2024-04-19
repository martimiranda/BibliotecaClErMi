import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    imports: [SidebarComponent, RouterModule, HeaderComponent],
})
export class LayoutComponent {
    title = 'SintagmiaSquareApp';
    sidebarLock: boolean = false;
    screenWidth!: number;

    constructor(private router: Router) {
        this.getScreenSize();

        router.events.subscribe((route) => {
            if (this.screenWidth < 768) {
                this.sidebarLock = false;
            }
        });
    }

    sidebarLockToggle(): void {
        this.sidebarLock = !this.sidebarLock;
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(): void {
        if (typeof window !== 'undefined') {
            this.screenWidth = window.innerWidth;
        }
        console.log(this.screenWidth);
    }
}
