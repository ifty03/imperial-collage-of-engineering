import NoticeDetails from "../components/Notice/NoticeDetails";
import Notice from "../Pages/Notice";
import Login from "../components/Auth/Login";
import Departments from "../Pages/Departments";
import DepartmentsDetails from "../components/Departments/DepartmentsDetails";

const PublicRoutes = [
    { path: "/", Component: Notice },
    { path: "/sign-in", Component: Login },
    { path: "/notice", Component: Notice },
    { path: "/notice/details/:id", Component: NoticeDetails },

    { path: "/departments", Component: Departments },
    { path: "/departments/details/:id", Component: DepartmentsDetails },
];

export default PublicRoutes;
