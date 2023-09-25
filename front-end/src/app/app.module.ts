import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { BodyComponent } from './component/body/body.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { RequestsComponent } from './component/requests/requests.component';
import { ProfileComponent } from './component/profile/profile.component';
import { LoginComponent } from './component/login/login.component';
import { RoomsComponent } from './component/rooms/rooms.component';
import { RoomDetailsComponent } from './component/room-details/room-details.component';
import { RoomCalendarComponent } from './component/room-calendar/room-calendar.component';
import { RegisterComponent } from './component/register/register.component';
import { PhonePipe } from './pipe/phone.pipe';
import { DatePipePipe } from './pipe/date.pipe';
import { CpfPipe } from './pipe/cpf.pipe';
import { UserslistComponent } from './component/userslist/userslist.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { StoreModule } from '@ngrx/store';
import { CalendarFeature } from './component/calendar/reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    HomeComponent,
    CalendarComponent,
    RequestsComponent,
    ProfileComponent,
    LoginComponent,
    RoomsComponent,
    RoomDetailsComponent,
    RoomCalendarComponent,
    RegisterComponent,
    RequestsComponent,
    PhonePipe,
    DatePipePipe,
    CpfPipe,
    UserslistComponent,
  ],
  imports: [
    StoreModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forFeature(CalendarFeature),
    NgbModalModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    StoreModule.forRoot({}, {}),
    NgbModule
  ],

  exports: [],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
