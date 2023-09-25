import { Component, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from './event-utils';
import { CalendarFeature, selectEventsCount } from './reducer';
import * as CalendarActions from './actions';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent{
  calendarOptions: CalendarOptions = {

    buttonText: {
      listWeek: "Agendamentos",
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia"
    },
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleCreateEventClick.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    locale:  'pt-br',
  };

  calendarVisible$ = this.store.select(CalendarFeature.selectCalendarVisible);
  events$ = this.store.select(CalendarFeature.selectEvents);
  eventsCount$ = this.store.select(selectEventsCount);

  constructor(private readonly store: Store, private modalService: BsModalService) { }

  handleCalendarToggle() {
    this.store.dispatch(CalendarActions.toggleCalendar());
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  eventModalTemplate!: TemplateRef<any>;

  newEvent: any = {}; // Objeto para armazenar os dados do novo evento
  eventModalRef: BsModalRef | null = null; // Inicialize eventModalRef como null

  handleCreateEventClick() {
    this.openEventModal(this.eventModalTemplate);
  }

  // Função para abrir o modal de cadastro de evento
  openEventModal(template: TemplateRef<any>) {
    this.newEvent = {}; // Limpa os campos do formulário
    this.eventModalRef = this.modalService.show(template);
    this.openModals.push(this.eventModalRef);
  }


  // Função para fechar o modal
  closeEventModal() {
    if (this.eventModalRef) {
      this.eventModalRef.hide();
    }
  }
  openModals: BsModalRef[] = [];



  closeAllModals() {
    this.openModals.forEach((modal: BsModalRef) => {
      modal.hide();
    });
    this.openModals = []; // Limpa a lista de modais abertos
  }

  // Função para criar o evento com base nos dados do formulário
  createEvent() {
    const { title, start, end, room, allDay } = this.newEvent;

    if (title && start && end) {
      const event: EventInput = {
        id: createEventId(),
        title,
        start,
        end,
        room,
        allDay: allDay || false,
      };

      this.store.dispatch(CalendarActions.createEvent({ event }));

      // Fecha o modal após criar o evento
      this.closeEventModal();
    }
  }
}
