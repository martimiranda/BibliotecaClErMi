import { Component } from '@angular/core';
import { LibrosComponent } from './libros/libros.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { SelectItemGroup } from 'primeng/api'; // Add this import

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    LibrosComponent,
    CommonModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    InputTextModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  value: string | undefined;

  books: {
    image: string;
  }[] = [];

  groupedCities: SelectItemGroup[];

  selectedCity: string | undefined;

  constructor() {
    this.books.push(
      {
        image: 'https://libreria-alzofora.com/wp-content/uploads/2022/06/LISISTRATA-146209.jpg'
      },
      {
        image: 'https://libreria-alzofora.com/wp-content/uploads/2022/06/LISISTRATA-146209.jpg'
      },
    );

    this.groupedCities = [
      {
        label: 'Tipus',
        value: 'de',
        items: [
          { label: 'Llibre', value: 'Llibre' },
          { label: 'CD', value: 'CD' },
          { label: 'Dispositiu', value: 'Dispositiu' }
        ]
      },
      {
        label: 'Any',
        value: 'us',
        items: [
          { label: "Any d'edició", value: 'ANY' } 
        ]
      },
      {
        label: 'Editorial',
        value: 'jp',
        items: [
          { label: 'Editorial', value: 'EDI' }
        ]
      },
      {
        label: 'Llengua',
        value: 'jp',
        items: [
          { label: 'Editorial', value: 'LLE' }
        ]
      },
      {
        label: 'Centre',
        value: 'jp',
        items: [
          { label: 'Biblioteca', value: 'BIB' }
        ]
      },
      {
        label: 'Préstec',
        value: 'jp',
        items: [
          { label: 'En préstec', value: 'ENP' },
          { label: 'Lliure', value: 'LLI' },
          { label: 'Indiferent', value: 'IND' }
        ]
      },
      
    ];
  };

  // BÚSQUEDA AVANZADA
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

  search(event: any) {
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  cercarInput: string = '';
}
