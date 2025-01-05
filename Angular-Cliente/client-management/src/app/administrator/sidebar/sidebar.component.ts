import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class SidebarComponent {
  @Input() isOpen = false; // Controla si el sidebar está abierto
  @Output() closeSidebar = new EventEmitter<void>();

  isSmallScreen(): boolean {
    return window.innerWidth <= 768;
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isSmallScreen()) {
      this.isOpen = true; // Mantener visible en pantallas grandes
    }
  }
}
