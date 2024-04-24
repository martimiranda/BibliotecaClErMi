import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
            ButtonModule,
            AvatarModule,
            AvatarGroupModule,
            ButtonModule,
            AutoCompleteModule,
            FormsModule,
            RouterLink,
            DropdownModule,
            InputTextModule
          ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
