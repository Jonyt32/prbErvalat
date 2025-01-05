import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './administrator/header/header.component';
import { SidebarComponent } from './administrator/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sidebarOpen = window.innerWidth > 768; // Por defecto abierto en pantallas grandes

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sidebarOpen = event.target.innerWidth > 768;
  }
}
