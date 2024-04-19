import { Component, inject } from '@angular/core';
import { RoleService } from '../../../modules/roles/role.service';
import { ProfileService } from '../../../services/profile.service';
import { Role } from '../../../constants/role.code';

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
