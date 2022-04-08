// Top level imports
import React, { ReactElement, Suspense, ComponentType } from "react";

// React-router library
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

// Utilities
import { isLoggedIn } from "../utilities/Common";

// Layouts
const Login = React.lazy((): Promise<{ default: ComponentType }> => import('../components/layouts/Login'));
const Home = React.lazy((): Promise<{ default: ComponentType }> => import('../components/layouts/Home'));

// Routes definition
const routes = [
  {
    name: 'home',
    path: '/',
    component: <Home />,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'login',
    path: 'login',
    component: <Login />,
  },
];

// Component Definition
const AppRouter = (): ReactElement => {
  // generate routes
  const routeElements = routes.map(({ name, path, component, meta }): any => (
    <Route
      key={name}
      path={path}
      element={
        meta?.requiresAuth && !isLoggedIn() ? (
          <Navigate to="/login" replace />
        ) : (
          <Suspense fallback={<div>Loading...</div >}>
            {component}
          </Suspense >
        )
      }
    />
  ));

  return (
    <Routes>
      {routeElements}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
