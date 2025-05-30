import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  menuOpen = false;
  @ViewChild('mobileToggle', { static: false }) mobileToggleEl!: ElementRef<HTMLButtonElement>;


  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleHamburgerMenu() {
    const el = document.querySelector('.mobile-nav');
    if (!el) {
      console.warn('mobile-nav element not found!');
      return;
    }
    el.classList.toggle('open');
  }
  
  
}
