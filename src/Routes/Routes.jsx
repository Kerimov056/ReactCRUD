import Crud from "../Pages/Crud";
import { Home } from "../Pages/Home";
import {MainLayout} from "../Layouts/MainLayout"
import { useRoutes } from "react-router-dom";
import Update from "../Pages/Update";
export default function Routes() {
    let routes = [
        {
        path:"/",
        element: <MainLayout />,
        children: [
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/Crud",
                element:<Crud />
            },
            {
                path:"/Update/:id",
                element:<Update />
            }
        ],
    }
];
    return useRoutes(routes)
}