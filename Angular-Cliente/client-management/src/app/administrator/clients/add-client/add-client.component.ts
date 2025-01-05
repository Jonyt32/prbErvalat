import { Component, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/swagger/model/client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class AddClientComponent {
  @Output() clientAdded = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  clientForm: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Valida si está vacío y tiene formato de correo
      phone: ['', Validators.required]
    });
  }

  addClient() {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;
      this.clientService.createClient(client).subscribe(() => {
        this.clientAdded.emit(); // Informar que un cliente fue agregado
        alert(`Cliente con el email: ${client.email} agregado`);
        this.cancel();
      });
    }
    
  }

  cancel() {
    this.close.emit(); // Informar al padre que el modal debe cerrarse
  }
}
