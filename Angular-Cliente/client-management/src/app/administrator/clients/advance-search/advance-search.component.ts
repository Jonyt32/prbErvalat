import { Component, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/swagger/model/client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AdvanceSearchComponent {
  @Output() searchResults = new EventEmitter<Client[]>();
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  businessId: string = '';
  email: string = '';
  phone: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private clientService: ClientService) {}

  search() {
    this.clientService
      .advancedSearch(
        this.businessId || undefined,
        this.email || undefined,
        this.phone || undefined,
        this.startDate || undefined,
        this.endDate || undefined
      )
      .subscribe((data) => {
        this.searchResults.emit(data);
      });
  }
  cancel() {
    this.close.emit(); // Emitir evento para informar al componente padre que debe cerrar el modal
  }
}
