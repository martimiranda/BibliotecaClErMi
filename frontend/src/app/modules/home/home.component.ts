import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginComponent } from '../../core/auth/login/login.component';
import { ItemService } from '../../services/item.service';
import { DialogService } from '../../services/dialog.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ButtonModule, AutoCompleteModule, FormsModule, MenuModule, RouterLink, ToastModule, LoginComponent],
    providers: [MessageService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    router = inject(Router);
    _itemService = inject(ItemService);
    _dialogService = inject(DialogService);

    items: any[] | undefined;

    selectedItem: string = '';
    searchResults!: any[];

    suggestions: any[] | undefined;
    search(event: AutoCompleteCompleteEvent) {
        const query = event.query;
        if (query.length >= 3) {
            this._itemService
                .searchItems(query)
                .then((response: any) => {
                    this.searchResults = response;
                })
                .catch((error: any) => {
                    console.error('Error fetching items', error);
                    this._dialogService.showDialog(
                        'ERROR',
                        "No s'han pogut carregar els resultats de la cerca. Si us plau, torna-ho a provar més tard.",
                    );
                });
        }
    }

    navigateToSearchPage() {
        if (this.selectedItem) {
            this.router.navigate(['/search'], { queryParams: { term: this.selectedItem } });
        } else {
            this._dialogService.showDialog('ATENCIÓ', 'Si us plau, introdueix un terme de cerca.');
        }
    }
}
