import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './service/user.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  showSidenav = true;
  isLogin = false;
  isSideNavCollapsed = false;
  screenWidth = 0;
  shouldShowSideNav = false; // Controla se o sidenav deve ser exibido

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {
    // Assine os eventos de navegação para verificar a URL atual
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifique se a URL atual corresponde a uma página de login ou registro
        this.isLogin = event.url.includes('login') || event.url.includes('register');
      }
    });

    // Assine os eventos de roteamento para mostrar ou ocultar o sidenav
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidenav = !(event.url === '/login' || event.url === '/register');
      }
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  onToggleSideNavShow(event: boolean) {
    this.isSideNavCollapsed = event;
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  isAuthorizer(): boolean {
    return this.userService.isAuthorizer();
  }
}
