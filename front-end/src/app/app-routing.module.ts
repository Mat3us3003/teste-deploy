import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { RequestsComponent } from './component/requests/requests.component';
import { ProfileComponent } from './component/profile/profile.component';
import { LoginComponent } from './component/login/login.component';
import { RoomsComponent } from './component/rooms/rooms.component';
import { RoomDetailsComponent } from './component/room-details/room-details.component';
import { RoomCalendarComponent } from './component/room-calendar/room-calendar.component';
import { RegisterComponent } from './component/register/register.component';
import { LogoutGuard } from './guard/logout.guard';
import { UserslistComponent } from './component/userslist/userslist.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path: '', canActivate: [LoginGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'requests', component: RequestsComponent},
    {path: 'userslist', component: UserslistComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'rooms', component: RoomsComponent},
    {path: 'room-details', component: RoomDetailsComponent},
    {path: 'room-calendar', component: RoomCalendarComponent},
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent, canActivate: [LogoutGuard]},
  {path: 'register', component: RegisterComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
