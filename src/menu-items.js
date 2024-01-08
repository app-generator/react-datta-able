import { handleLogout } from './layouts/AdminLayout/NavBar/NavRight/index';

const menuItems = {
    items: [ 
        {
            id: 'principal',
            title: 'Principal',
            type: 'group',
            children: [
                {
                    id: 'dashboard',
                    title: 'Métricas',
                    type: 'item',
                    url: '/metrics',
                    icon: 'feather icon-home',
                    breadcrumbs: false
                },
                {
                    id: 'feeds',
                    title: 'Fuentes',
                    type: 'item',
                    url: '/feeds',
                    icon: 'feather icon-globe',
                    breadcrumbs: false
                },
                {
                    id: 'Eventos',
                    title: 'Eventos',
                    type: 'item',
                    url: '/events',
                    classes: '',
                    icon: 'feather icon-alert-circle',
                    breadcrumbs: false,
                },
                {
                    id: 'case',
                    title: 'Casos',
                    type: 'item',
                    url: '/cases',
                    icon: 'feather icon-search',
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'constituency',
            title: 'Constituencias',
            type: 'group',
            icon: 'fas fa-network-wired',
            children: [
                {
                    id: 'entity',
                    title: 'Entidades',
                    type: 'item',
                    url: '/entities',
                    icon: 'fas fa-cubes',
                    breadcrumbs: false
                },
                {
                    id: 'networks',
                    title: 'Redes',
                    type: 'item',
                    url: '/networks',
                    icon: 'feather icon-share-2',
                    breadcrumbs: false
                },
                {
                    id: 'contacts',
                    title: 'Contactos',
                    type: 'item',
                    url: '/contacts',
                    icon: 'far fa-address-book',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'config',
            title: 'Configuración',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'platform',
                    title: 'Plataforma',
                    type: 'collapse',
                    icon: 'feather icon-settings',
                    link: false,
                    children: [
                        {
                            id: 'tlp',
                            title: 'TLP',
                            type: 'item',
                            url: '/tlp',
                            icon: '',
                            breadcrumbs: false
                        },          
                        {
                            id: 'priority',
                            title: 'Prioridades',
                            type: 'item',
                            url: '/priorities',
                            classes: '',
                            icon: '',
                            breadcrumbs: false
            
                        },
                        {
                            id: 'playbook',
                            title: 'Playbooks',
                            type: 'item',
                            url: '/playbooks',
                            icon: '',
                            breadcrumbs: false
                        },
                        {
                            id: 'taxonomy',
                            title: 'Taxonomia',
                            type: 'item',
                            url: '/taxonomies',
                            icon: '',
                            breadcrumbs: false
                        },
                        {
                            id: 'Estados',
                            title: 'Estados',
                            type: 'item',
                            url: '/states',
                            classes: '',
                            icon: '',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Plantilla',
                            title: 'Plantilla',
                            type: 'item',
                            url: '/templates',
                            classes: '',
                            icon: '',
                            breadcrumbs: false,
                        },
                        {
                            id: 'users',
                            title: 'Usuarios',
                            type: 'item',
                            url: '/users',
                            classes: '',
                            icon: '',
                            breadcrumbs: false,
                        }
                    ]
                }
            ]
        }
    ],
    itemsBottom: [
        {
            id: 'principal',
            title: '',
            type: 'group',
            children: [
                {
                    id: 'profile',
                    title: 'Perfil',
                    type: 'item',
                    url: '/profile',
                    classes: '',
                    icon: 'feather icon-user',
                    breadcrumbs: false,
                },
                {
                    id: 'logout',
                    title: 'Logout',
                    type: 'item',
                    url: '',
                    classes: 'logout-btn',
                    icon: 'fa fa-sign-out-alt',
                    breadcrumbs: false,
                    onClick: handleLogout,
                }
            ]
        }
    ]
};

export default menuItems;
