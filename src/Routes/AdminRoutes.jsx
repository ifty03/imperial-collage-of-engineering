import AddDepartment from "../components/AdminDashboard/AdminDashboardDepartment/AddDepartment";
import DepartmentList from "../components/AdminDashboard/AdminDashboardDepartment/DepartmentList";
import EditDepartment from "../components/AdminDashboard/AdminDashboardDepartment/EditDepartment";
import AddNotice from "../components/AdminDashboard/AdminDashboardNotice/AddNotice";
import AddNoticeCategory from "../components/AdminDashboard/AdminDashboardNotice/AddNoticeCategory";
import EditNotice from "../components/AdminDashboard/AdminDashboardNotice/EditNotice";
import NoticeCategoryList from "../components/AdminDashboard/AdminDashboardNotice/NoticeCategoryList";
import NoticeList from "../components/AdminDashboard/AdminDashboardNotice/NoticeList";
import Notice from "../Pages/Notice";

const AdminRoutes = [
    { path: "", Component: AddNotice },
    { path: "notice/add-notice", Component: AddNotice },
    { path: "notice/notice-list", Component: NoticeList },
    { path: "notice/edit/:id", Component: EditNotice },
    { path: "notice/add-category", Component: AddNoticeCategory },
    { path: "notice/category-list", Component: NoticeCategoryList },

    { path: "department/add-department", Component: AddDepartment },
    { path: "department/department-list", Component: DepartmentList },
    { path: "department/edit/:id", Component: EditDepartment },
];

export default AdminRoutes;
