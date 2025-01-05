import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Client } from 'src/app/swagger/model/client';
import { ClientService } from 'src/app/services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AdvanceSearchComponent {
  @Output() searchResults = new EventEmitter<Client[]>();
  @Output() close = new EventEmitter<void>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.searchForm = this.fb.group(
      {
        businessId: [''],
        email: ['', [Validators.email]],
        phone: [''],
        startDate: [''],
        endDate: [''],
      },
      { validators: [this.dateRangeValidator] } 
    );
  }

  search() {
    if (this.searchForm.valid) {
      const { businessId, email, phone, startDate, endDate } = this.searchForm.value;

      this.clientService
        .advancedSearch(
          businessId || undefined,
          email || undefined,
          phone || undefined,
          startDate || undefined,
          endDate || undefined
        )
        .subscribe((data) => {
          if (data && data.length > 0) {
            this.searchResults.emit(data);
          } else {
            alert('No se encontraron resultados');
          }
          this.cancel();
        });
    }
  }

  cancel() {
    this.close.emit(); // Emitir evento para informar al componente padre que debe cerrar el modal
  }

  private dateRangeValidator(group: AbstractControl) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        group.get('startDate')?.setErrors({ startDateAfterEnd: true });
        group.get('endDate')?.setErrors({ endDateBeforeStart: true });
      } else {
        group.get('startDate')?.setErrors(null);
        group.get('endDate')?.setErrors(null);
      }
    }

    return null;
  }
}
