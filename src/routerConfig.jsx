import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";

const RegistrPage = lazy(()=> import('./RegistrPage').then(m => ({ default: m.RegistrPage })));
const AuthPage = lazy(()=> import('./AuthPage').then(m => ({ default: m.AuthPage })));
const Todo = lazy(() => import('./Todo').then(m => ({ default: m.Todo })));

export const routerConfig = (token) => [
    {
        path: ROUTES.MAIN,
        element: token ? <Navigate to={ROUTES.TODO} /> : <RegistrPage />,
    },
    {
        path: ROUTES.AUTH,
        element: token ? <Navigate to={ROUTES.TODO} /> : <AuthPage />,
    },
    {
        path: ROUTES.TODO,
        element: token ? <Todo /> : <Navigate to={ROUTES.AUTH} />
    },
    {
        path: ROUTES.ALL,
        element: <Navigate to={token ? ROUTES.TODO : ROUTES.MAIN} replace />
    }
];