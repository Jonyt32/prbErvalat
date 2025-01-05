import { Component, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/swagger/model/client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AddClientComponent {
  @Output() clientAdded = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  client: Client = {
    sharedKey: '',
    businessId: '',
    email: '',
    phone: '',
    dateAdded: new Date().toISOString(),
  };

  constructor(private clientService: ClientService) {}

  addClient() {
    this.clientService.createClient(this.client).subscribe(() => {
      this.clientAdded.emit(); // Informar que un cliente fue agregado
    });
  }

  cancel() {
    this.close.emit(); // Informar al padre que el modal debe cerrarse
  }
}
