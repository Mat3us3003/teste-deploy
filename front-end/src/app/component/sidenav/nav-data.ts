
export const navbarData = [
    {
        routeLink: 'home',
        icon:'fa-solid fa-home',
        label: 'Início',
        permission: ['Normal', 'Authorizer', 'Admin']
    },
    {
        routeLink: 'calendar',
        icon:'fa-regular fa-calendar',
        label: 'Calendário',
        permission: ['Normal', 'Authorizer', 'Admin']
    },
    {
        routeLink: 'rooms',
        icon:'fa-solid fa-map-location-dot',
        label: 'Espaços',
        permission: ['Normal', 'Authorizer', 'Admin']
    },
    {
        routeLink: 'dashboard',
        icon:'fa-solid fa-chart-simple',
        label: 'Dashboard',
        permission: ['Admin']
    },
    {
        routeLink: 'requests',
        icon:'fa-regular fa-clipboard',
        label: 'Solicitações',
        permission: ['Admin', 'Authorizer']
    },
    {
      routeLink: 'userslist',
      icon:'fa-solid fa-users',
      label: 'Usuários',
      permission: ['Admin']
  },
    {
        routeLink: 'profile',
        icon:'fa-solid fa-user',
        label: 'Perfil',
        permission: ['Normal', 'Authorizer', 'Admin']
    },
    {
        routeLink: 'logout',
        icon:'fa-solid fa-right-from-bracket',
        label: 'Sair',
        permission: ['Normal', 'Authorizer', 'Admin']
    },


]
