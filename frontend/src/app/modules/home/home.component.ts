import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../core/auth/login/login.component';

interface Cercar {
  name: string;
  code: string;
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
    LoginComponent,
    DropdownModule,
    InputTextModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  popupVisible = false;
  selectedItem: any;
  suggestions: any[] | undefined;
  categoria: any[] = [
    { name: 'llibre' },
    { name: 'revista' },
    { name: 'CD' },
    { name: 'dispositiu' }
  ];
  filteredItems: any[] = [];

  search(event: any) { // Adjust the type here
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  filterItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.categoria.length; i++) {
      let item = this.categoria[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }

  // SELECT
  cercaPer: Cercar[] | undefined;

  selectedCercar: Cercar | undefined;

  ngOnInit() {
      this.cercaPer = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];
  }

  cercarInput: string = '';
}
