import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() isLoginScreen: boolean = false;


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifique se a URL atual corresponde a uma página de login ou registro
        this.isLoginScreen = event.url.includes('login') || event.url.includes('register');
      }
    });
  }

  getBodyClass(): string {
    let styleClass = 'body'; // Classe padrão

    if (this.isLoginScreen) {
      styleClass += ' body-login'; // Adiciona a classe body-login se for a tela de login
    } else if (this.collapsed && this.screenWidth > 768) {
      styleClass += ' body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass += ' body-md-screen';
    }

    return styleClass;
  }
}
