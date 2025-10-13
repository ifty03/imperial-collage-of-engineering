import NoticeDetails from "../components/Notice/NoticeDetails";
import Notice from "../Pages/Notice";
import Login from "../components/Auth/Login";

const PublicRoutes = [
    { path: "/", Component: Notice },
    { path: "/sign-in", Component: Login },
    { path: "/notice", Component: Notice },
    { path: "/notice/details", Component: NoticeDetails },
];

export default PublicRoutes;
