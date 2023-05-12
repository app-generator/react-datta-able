import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    {
        exact: true,
        guard: GuestGuard,
        path: '/auth/signin',
        component: lazy(() => import('./views/auth/signin/SignIn1'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/auth/signup',
        component: lazy(() => import('./views/auth/signup/SignUp1'))
    },
    {
        exact: true,
        path: '/auth/signin-2',
        component: lazy(() => import('./views/auth/signin/SignIn2'))
    },
    {
        exact: true,
        path: '/auth/signup-2',
        component: lazy(() => import('./views/auth/signup/SignUp2'))
    },
    {
        path: '*',
        layout: AdminLayout,
        guard: AuthGuard,
        routes: [
            {
                exact: true,
                path: '/app/feeds',
                component: lazy(() => import('./views/feeds/ListFeed'))
            },
            {
                exact: true,
                path: '/app/feeds/create',
                component: lazy(() => import('./views/feeds/CreateFeed'))
            },
            {
                exact: true,
                path: '/app/feeds/edit',
                component: lazy(() => import('./views/feeds/EditFeed'))
            },
            {
                exact: true,
                path: '/app/taxonomies',
                component: lazy(() => import('./views/taxonomy/ListTaxonomies'))
            },
            {
                exact: true,
                path: '/app/taxonomies/create',
                component: lazy(() => import('./views/taxonomy/CreateTaxonomy'))
            },
            {
                exact: true,
                path: '/app/taxonomies/edit',
                component: lazy(() => import('./views/taxonomy/EditTaxonomy'))
            },            
            {
                exact: true,
                path: '/app/tlp',
                component: lazy(() => import('./views/tlp/ListTLP'))
            },
            {
                exact: true,
                path: '/app/dashboard/default',
                component: lazy(() => import('./views/dashboard/DashDefault'))
            },

            {
                exact: true,
                path: '/basic/button',
                component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
            },
            {
                exact: true,
                path: '/basic/badges',
                component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
            },
            {
                exact: true,
                path: '/basic/breadcrumb',
                component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
            },
            {
                exact: true,
                path: '/basic/collapse',
                component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
            },
            {
                exact: true,
                path: '/basic/tabs-pills',
                component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
            },
            {
                exact: true,
                path: '/basic/typography',
                component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
            },

            {
                exact: true,
                path: '/forms/form-basic',
                component: lazy(() => import('./views/forms/FormsElements'))
            },
            {
                exact: true,
                path: '/tables/bootstrap',
                component: lazy(() => import('./views/tables/BootstrapTable'))
            },

            {
                exact: true,
                path: '/charts/nvd3',
                component: lazy(() => import('./views/charts/nvd3-chart'))
            },
            {
                exact: true,
                path: '/maps/google-map',
                component: lazy(() => import('./views/maps/GoogleMaps'))
            },
            {
                exact: true,
                path: '/sample-page',
                component: lazy(() => import('./views/extra/SamplePage'))
            },
            {
                exact: true,
                path: '/contacts',
                component: lazy(() => import('./views/contact/ListContact'))
            },
            {
                exact: true,
                path: '/contacts/create',
                component: lazy(() => import('./views/contact/CreateContact'))
            },
            {
                exact: true,
                path: '/contacts/edit',
                component: lazy(() => import('./views/contact/EditContact'))
            },
            {
                exact: true,
                path: '/entities',
                component: lazy(() => import('./views/entity/ListEntity'))
            },
            {
                exact: true,
                path: '/entities/create',
                component: lazy(() => import('./views/entity/CreateEntity'))
            },
            {
                exact: true,
                path: '/entities/edit',
                component: lazy(() => import('./views/entity/EditEntity'))
            },
            {
                exact: true,
                path: '/networks',
                component: lazy(() => import('./views/network/ListNetwork'))
            },
            {
                exact: true,
                path: '/networks/create',
                component: lazy(() => import('./views/network/CreateNetwork'))
            },
            {
                exact: true,
                path: '/networks/edit',
                component: lazy(() => import('./views/network/EditNetwork'))
            },
            {
                exact: true,
                path: '/priorities',
                component: lazy(() => import('./views/priority/ListPriority'))
            },
            {
                exact: true,
                path: '/priorities/create',
                component: lazy(() => import('./views/priority/CreatePriority'))
            },
            {
                exact: true,
                path:'/priorities/edit',
                component: lazy(() => import('./views/priority/EditPriority'))
            },
            {
                exact: true,
                path: "/users",
                component: lazy(() => import('./views/user/ListUser'))
            },
            {
                exact: true,
                path: "/users/create",
                component: lazy(() => import('./views/user/CreateUser'))
            },
            {
                exact: true,
                path: "/users/edit",
                component: lazy(() => import('./views/user/EditUser'))
            },
            {
                exact: true,
                path: "/app/states",
                component: lazy(() => import('./views/state/ListState'))
            },
            {
                exact: true,
                path: "/app/states/create",
                component: lazy(() => import('./views/state/CreateState'))
            },
            {
                exact: true,
                path: "/app/states/edit",
                component: lazy(() => import('./views/state/EditState'))
            },
            {
                exact: true,
                path: "/events",
                component: lazy(() => import('./views/event/ListEvent'))
            },
            {
                exact: true,
                path: "/events/create",
                component: lazy(() => import('./views/event/CreateEvent'))
            },
            {
                exact: true,
                path:"/events/edit" ,  
                component: lazy(() => import('./views/event/EditEvent'))
            },
            {
                exact: true,
                path: "/events/view",
                component: lazy(() => import('./views/event/ReadEvent'))
            },
            {
                exact: true,
                path: '/playbooks',
                component: lazy(() => import('./views/playbook/ListPlaybook'))
            },
            {
                exact: true,
                path: '/playbooks/create',
                component: lazy(() => import('./views/playbook/CreatePlaybook'))
            },
            {
                exact: true,
                path: '/playbooks/edit',
                component: lazy(() => import('./views/playbook/EditPlaybook'))
            },
            {
                exact: true,
                path: '/cases',
                component: lazy(() => import('./views/case/ListCase'))
            },
            {
                exact: true,
                path: '/cases/create',
                component: lazy(() => import('./views/case/CreateCase'))
            },
            {
                exact: true,
                path: '/cases/edit',
                component: lazy(() => import('./views/case/EditCase'))
            },
            {
                exact: true,
                path: '/cases/view',
                component: lazy(() => import('./views/case/ReadCase'))
            },
            {
                exact: true,
                path: "/templates",
                component: lazy(() => import('./views/template/ListTemplate'))
            },
            {
                exact: true,
                path: "/templates/create",
                component: lazy(() => import('./views/template/CreateTemplate'))
            },
            {
                exact: true,
                path: "/templates/edit",
                component: lazy(() => import('./views/template/EditTemplate'))
            },
            {
                path: '*',
                exact: true,
                component: () => <Redirect to={BASE_URL} />
            }
        ]
    }
];

export default routes;
