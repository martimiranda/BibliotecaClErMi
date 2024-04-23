import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule }   from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginComponent } from '../../core/auth/login/login.component';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
            ButtonModule,
            AutoCompleteModule,
            FormsModule,
            MenuModule,
            RouterLink,
            ToastModule,
            LoginComponent
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent  {
    // POP UP OLVIDAR CONTRASEÑA
    popupVisible = false;
    showPopup() { this.popupVisible = true; }

    // AUTOCOMPLETE
    items: any[] | undefined;
    selectedItem: any;
    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
    
}
