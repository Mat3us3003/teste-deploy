import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth: number;
  hide: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  hide = false;
  screenWidth = 0;
  navData = navbarData;

  userType: string = "";

  constructor(
    private router: Router
    ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();
        this.userType = window.localStorage.getItem('userType') as string;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
        hide: this.hide,
      });
    }
  }

  ngOnInit(): void {
    this.userType = window.localStorage.getItem('userType') as string;
    this.screenWidth = window.innerWidth;
    this.checkRoute();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
      hide: this.hide,
    });
  }

  checkRoute(): void {
    const url = this.router.url;

    if (url === '/login' || url === '/register') {
      this.hide = true;
    } else {
      this.hide = false;
    }

    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
      hide: this.hide,
    });
  }
}
