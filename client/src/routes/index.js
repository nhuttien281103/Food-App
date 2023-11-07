import {
  LINK_ROUTER_CLIENT,
  LINK_ROUTER_DASHBOARD,
} from '@/configs/linkRoutes.config';
import { CheckOutSuccess, Login, Main } from '@/pages';
import {
  DBAddNewProduct,
  DBHome,
  DBOrder,
  DBProduct,
  Dashboard,
} from '@/pages/Dashboard';

//! routers client
export const CLIENT_ROUTES = [
  {
    path: LINK_ROUTER_CLIENT._HOME,
    component: Main,
  },
  {
    path: LINK_ROUTER_CLIENT._LOGIN,
    component: Login,
  },
  {
    path: LINK_ROUTER_CLIENT._DASHBOARD,
    component: Dashboard,
  },
  {
    path: LINK_ROUTER_CLIENT._CHECK_OUT_SUCCESS,
    component: CheckOutSuccess,
  },
];

//! routers dashboard
export const DASHBOARD_ROUTES = [
  {
    path: LINK_ROUTER_DASHBOARD._HOME,
    component: DBHome,
  },
  {
    path: LINK_ROUTER_DASHBOARD._ORDERS,
    component: DBOrder,
  },
  {
    path: LINK_ROUTER_DASHBOARD._PRODUCT,
    component: DBProduct,
  },
  {
    path: LINK_ROUTER_DASHBOARD._ADD_NEW_PRODUCT,
    component: DBAddNewProduct,
  },
];
