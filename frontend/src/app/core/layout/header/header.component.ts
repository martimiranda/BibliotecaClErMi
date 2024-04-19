import { Component, inject } from '@angular/core';
import { Role } from '../../../constants/role.code';
import { RoleService } from '../../../services/role.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    _roleService = inject(RoleService);
    _profileService = inject(ProfileService);

    role: any;
    Role = Role;

    async ngOnInit() {
        this.role = await this._profileService.getRole();
    }
}
