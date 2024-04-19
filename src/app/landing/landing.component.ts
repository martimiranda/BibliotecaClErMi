import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';

// SEARCHER
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    InputTextModule,
    PasswordModule,
    CommonModule,
    ToastModule,
    SpeedDialModule
  ],
  providers: [MessageService],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {
  // MENU
  items: MenuItem[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
      this.items = [
          {
              icon: 'pi pi-book',
              command: () => {
                  this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
              }
          },
          {
              icon: 'pi pi-envelope',
              command: () => {
                  this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
              }
          },
          {
              icon: 'pi pi-cog',
              command: () => {
                  this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
              }
          }
      ];
  }

  // SEARCHER
  searcher: any[] | undefined;

  selectedItem: any;

  suggestions: any;

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(searcher => event.query + '-' + searcher);
  }
  // -----------------------------------------
}