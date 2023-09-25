import { Component } from '@angular/core';
import { CalendarOptions, LocaleInput  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt-br';


@Component({
  selector: 'room-calendar',
  templateUrl: './room-calendar.component.html',
  styleUrls: ['./room-calendar.component.scss']
})
export class RoomCalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],

    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    },

    events: [
      {
        title: 'Evento 1',
        start: '2023-09-10T10:00:00',
        end: '2023-09-11T12:00:00',
        color: '#0C4CA4'
      },
      {
        title: 'Evento 4',
        start: '2023-09-10T16:00:00',
        end: '2023-09-13T18:00:00',
        color: '#48A35D'
      },
      {
        title: 'Evento 2',
        start: '2023-09-15T14:00:00',
        end: '2023-09-16T16:00:00',
        color: '#0C4CA4'
      },
      {
        title: 'Evento 3',
        start: '2023-09-15T16:00:00',
        end: '2023-09-16T18:00:00',
        color: '#48A35D'
      },
    ],
    locale: ptLocale,

  };

}
