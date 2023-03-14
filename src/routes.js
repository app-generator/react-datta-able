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
                path: '/app/feeds/new',
                component: lazy(() => import('./views/feeds/CreateFeed'))
            },
            {
                exact: true,
                path: '/app/feeds/edit',
                component: lazy(() => import('./views/feeds/EditFeed'))
            },            
            {
                exact: true,
                path: '/app/tlp',
                component: lazy(() => import('./views/tlp/TLP'))
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
                path: '/contact/tables',
                component: lazy(() => import('./views/contact/ListContact'))
            },
            {
                exact: true,
                path: '/contact/create',
                component: lazy(() => import('./views/contact/CreateContact'))
            },
            {
                exact: true,
                path: '/contact/edit',
                component: lazy(() => import('./views/contact/EditContact'))
            },
            {
                exact: true,
                path: '/entity/tables',
                component: lazy(() => import('./views/entity/ListEntity'))
            },
            {
                exact: true,
                path: '/entity/create',
                component: lazy(() => import('./views/entity/CreateEntity'))
            },
            {
                exact: true,
                path: '/entity/edit',
                component: lazy(() => import('./views/entity/EditEntity'))
            },
            {
                exact: true,
                path: '/network/tables',
                component: lazy(() => import('./views/network/ListNetwork'))
            },
            {
                exact: true,
                path: '/network/create',
                component: lazy(() => import('./views/network/CreateNetwork'))
            },
            {
                exact: true,
                path: '/network/edit',
                component: lazy(() => import('./views/network/EditNetwork'))
            },
            {
                exact: true,
                path: '/list-Priorities',
                component: lazy(() => import('./views/priority/ListPriority'))
            },
            {
                exact: true,
                path: '/add-Priority',
                component: lazy(() => import('./views/priority/CreatePriority'))
            },
            {
                exact: true,
                path: '/edit-Priority',
                component: lazy(() => import('./views/priority/EditPriority'))
            },
            {
                exact: true,
                path: '/list-user',
                component: lazy(() => import('./views/user/listUser'))
            },
            {
                exact: true,
                path: '/add-user',
                component: lazy(() => import('./views/user/addUser'))
            },
            {
                exact: true,
                path: "/edit-user",
                component: lazy(() => import('./views/user/editUser'))
            },
            {
                exact: true,
                path: "/list-states",
                component: lazy(() => import('./views/state/listState'))
            },
            {
                exact: true,
                path: "/add-state",
                component: lazy(() => import('./views/state/addState'))
            },
            {
                exact: true,
                path: "/edit-state",
                component: lazy(() => import('./views/state/editState'))
            },
            {
                exact: true,
                path: '/playbook/tables',
                component: lazy(() => import('./views/playbook/ListPlaybook'))
            },
            {
                exact: true,
                path: '/playbook/create',
                component: lazy(() => import('./views/playbook/CreatePlaybook'))
            },
            {
                exact: true,
                path: '/playbook/edit',
                component: lazy(() => import('./views/playbook/EditPlaybook'))
            },
            {
                exact: true,
                path: '/task/tables',
                component: lazy(() => import('./views/task/ListTask'))
            },
            {
                exact: true,
                path: '/task/create',
                component: lazy(() => import('./views/task/CreateTask'))
            },
            {
                exact: true,
                path: '/task/edit',
                component: lazy(() => import('./views/task/EditTask'))
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
