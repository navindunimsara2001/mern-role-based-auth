import { RouteObject } from "react-router-dom";
import Login from "./Login"
import Register from "./Register";
import Profile from "./Profile";
import Navbar from "./Navbar";

const routes: RouteObject[] = [{
    path: "/",
    element : <Navbar/>,
    children : [
        {
            path : "/",
            element : <Login/>
        },
        {
            path: "/register",
            element:  <Register/>
        },
        {
            path: "/profile",
            element: <Profile/>
        }
    ]
}]

export default routes;