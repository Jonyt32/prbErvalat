import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagementComponent } from './client-management.component';

describe('ClientManagementComponent', () => {
  let component: ClientManagementComponent;
  let fixture: ComponentFixture<ClientManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientManagementComponent]
    });
    fixture = TestBed.createComponent(ClientManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});