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
                    url: '/app/dashboard/default',
                    icon: 'feather icon-home'
                },
                {
                    id: 'feeds',
                    title: 'Fuentes de Informacion',
                    type: 'item',
                    url: '/app/feeds',
                    icon: 'fas fa-globe',
                    breadcrumbs: false
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
                    url: '/entity/tables',
                    icon: 'fas fa-network-wired',
                    breadcrumbs: false
                },
                {
                    id: 'networks',
                    title: 'Redes',
                    type: 'item',
                    url: '/network/tables',
                    icon: 'feather icon-sidebar',
                    breadcrumbs: false
                },
                {
                    id: 'contacts',
                    title: 'Contactos',
                    type: 'item',
                    url: '/contact/tables',
                    icon: 'feather icon-sidebar',
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
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'tlp',
                            title: 'TLP',
                            type: 'item',
                            url: '/app/tlp',
                            icon: 'fas fa-globe',
                            breadcrumbs: false
                        },          
                        {
                            id: 'priority',
                            title: 'Prioridades',
                            type: 'item',
                            url: '/list-Priorities',
                            classes: '',
                            icon: 'fa fa-exclamation-triangle',
                            breadcrumbs: false
            
                        },
                        {
                            id: 'taxonomy',
                            title: 'Taxonomia',
                            type: 'item',
                            url: '/app/taxonomy',
                            icon: 'fas fa-server',
                            breadcrumbs: false
                        }   
                    ]
                },
                
                {
                    id: 'users',
                    title: 'Usuarios',
                    type: 'item',
                    url: '/list-user',
                    classes: '',
                    icon: 'fa fa-user',
                    breadcrumbs: false,
                }
            ]
        
        },
        {
            id: 'Estados',
            title: 'Estados',
            type: 'group',
            icon: 'icon-ui',
            children: [
            {
                id: 'Estados',
                title: 'Estados',
                type: 'item',
                url: '/list-states',
                classes: '',
                icon: '',
                breadcrumbs: false,
            }
            ]
         
        },
        {
            id: 'new',
            title: 'Nuevo',
            type: 'group',
            icon: 'fas fa-network-wired',
            children: [
                {
                    id: 'playbook',
                    title: 'Playbook',
                    type: 'item',
                    url: '/playbook/tables',
                    icon: 'fas fa-network-wired',
                    breadcrumbs: false
                },
                {
                    id: 'task',
                    title: 'Tareas',
                    type: 'item',
                    url: '/task/tables',
                    icon: 'feather icon-sidebar',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'ui-element',
            title: 'UI ELEMENT',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'basic',
                    title: 'Components',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Button',
                            type: 'item',
                            url: '/basic/button'
                        },
                        {
                            id: 'badges',
                            title: 'Badges',
                            type: 'item',
                            url: '/basic/badges'
                        },
                        {
                            id: 'breadcrumb',
                            title: 'Breadcrumb',
                            type: 'item',
                            url: '/basic/breadcrumb'
                        },
                        {
                            id: 'collapse',
                            title: 'Collapse',
                            type: 'item',
                            url: '/basic/collapse'
                        },
                        {
                            id: 'tabs-pills',
                            title: 'Tabs & Pills',
                            type: 'item',
                            url: '/basic/tabs-pills'
                        },
                        {
                            id: 'typography',
                            title: 'Typography',
                            type: 'item',
                            url: '/basic/typography'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-forms',
            title: 'Forms & Tables',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'forms',
                    title: 'Forms',
                    type: 'item',
                    url: '/forms/form-basic',
                    icon: 'feather icon-file-text'
                },
                {
                    id: 'bootstrap',
                    title: 'Bootstrap Table',
                    type: 'item',
                    url: '/tables/bootstrap',
                    icon: 'feather icon-server'
                }
            ]
        },
        {
            id: 'chart-maps',
            title: 'Chart & Maps',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'charts',
                    title: 'Charts',
                    type: 'item',
                    url: '/charts/nvd3',
                    icon: 'feather icon-pie-chart'
                },
                {
                    id: 'maps',
                    title: 'Maps',
                    type: 'item',
                    url: '/maps/google-map',
                    icon: 'feather icon-map'
                }
            ]
        },
        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'auth',
                    title: 'Authentication',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    children: [
                        {
                            id: 'signup-2',
                            title: 'Sign UP (template)',
                            type: 'item',
                            url: '/auth/signup-2',
                            target: true,
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-2',
                            title: 'Sign IN (template)',
                            type: 'item',
                            url: '/auth/signin-2',
                            target: true,
                            breadcrumbs: false
                        }
                    ]
                },
                {
                    id: 'sample-page',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/sample-page',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                }
            ]
        },
        {
            id: 'resources',
            title: 'Resources',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'product-page',
                    title: 'Download Product',
                    type: 'item',
                    url: 'https://appseed.us/product/react-node-js-datta-able',
                    classes: 'nav-item',
                    icon: 'feather icon-download',
                    target: true,
                    external: true
                },
                {
                    id: 'support',
                    title: 'Get Support',
                    type: 'item',
                    icon: 'feather icon-help-circle',
                    classes: 'nav-item',
                    url: 'https://appseed.us',
                    target: true,
                    external: true
                }
            ]
        }
    ]
};

export default menuItems;
