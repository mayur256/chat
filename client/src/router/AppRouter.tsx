// Top level imports
import React, { ReactElement, Suspense, useEffect } from "react";

// React-router library
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"

// Utilities
import { isLoggedIn } from "../utilities/Common";

// Layouts
const Login = React.lazy((): any => import('../components/layouts/Login'));
const Home = React.lazy((): any => import('../components/layouts/Home'));

// Routes definition
const routes = [
  {
    name: 'home',
    path: '/',
    component: <Home />,
  },
  {
    name: 'login',
    path: 'login',
    component: <Login />,
  },
];

// Component Definition
const AppRouter = (): ReactElement => {
  // hooks
  const navigate = useNavigate();

  // useEffect
  useEffect((): void => {
    // check if user is logged in and  if user is not logged in 
    // redirect user to login page
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  // generate routes
  const routeElements = routes.map(({ name, path, component }): any => (
    <Route key={name} path={path} element={
      <Suspense fallback={<div>Loading...</div>}>
        {component}
      </Suspense>
    } />
  ));

  return (
    <Routes>
      {routeElements}
    </Routes>
  );
};

export default AppRouter;
