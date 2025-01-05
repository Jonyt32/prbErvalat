import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { AddClientComponent } from "../add-client/add-client.component";
import { AdvanceSearchComponent } from "../advance-search/advance-search.component";
import { Client } from 'src/app/swagger/model/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, AddClientComponent, AdvanceSearchComponent],
})
export class ClientManagementComponent {
  clients: Client[] = [];
  sharedKeyFilter: string = '';
  showAddClientModal: boolean = false;
  showAdvanceSearchModal: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data || [];
    });
  }

  filterBySharedKey() {
    if (this.sharedKeyFilter && this.sharedKeyFilter != '') {
      this.clientService.getClientBySharedKey(this.sharedKeyFilter).subscribe((data) => {
        if (data) {
          this.clients = [data];
        } else {
          this.clients = [];
        }
      });
    }
    else{
      this.loadClients();
    }
  }

  openAddClientModal() {
    this.showAddClientModal = true;
  }

  openAdvanceSearchModal() {
    this.showAdvanceSearchModal = true;
  }

  closeModal() {
    this.showAddClientModal = false;
    this.showAdvanceSearchModal = false;
  }

  exportData() {
    const csvContent = [
      'Shared Key,Business ID,Email,Phone,Date Added',
      ...this.clients.map(
        (client) =>
          `${client.sharedKey},${client.businessId},${client.email},${client.phone},${client.dateAdded}`
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clients.csv';
    link.click();
  }
}
