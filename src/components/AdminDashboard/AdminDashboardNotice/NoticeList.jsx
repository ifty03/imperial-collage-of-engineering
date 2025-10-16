import { FaEdit, FaTrash } from "react-icons/fa";
import AdminDashboardBreadcrumb from '../../AdminDashboardBreadcrumb';
import Pagination from "../../../shared/Pagination/Pagination";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import useGetData from "../../../Hooks/useGetData";
import { server_url } from "../../../Config/API";
import Loader from "../../../shared/Loader";
import useDeleteData from "../../../Hooks/useDeleteData";
import toast from "react-hot-toast";



const NoticeList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const { data, loading,refetch } = useGetData(
        `${server_url}/notice/getNotice`,
        { params: { page: currentPage, limit: pageLimit } }
    );
    const { deleteData } = useDeleteData(`${server_url}/notice/deleteNotice`);

    if (loading) {
        return <Loader />
    }

    const handleDelete=async(id) => {
       const confirm = window.confirm("Are you sure you want to delete this notice?");
        if (confirm) {
            const result = await deleteData(id);
        if(result.success){
            toast.success("Notice deleted successfully");
           refetch();
        } else {
            toast.error("Failed to delete notice: " + result?.error);
        }
       }
       else{
        // do nothing
       }
    }
    return (
        <div className="">
            <AdminDashboardBreadcrumb
                items={[
                    { name: "Notice", path: "notice/notice-list" },
                    { name: "Add Notice", path: "notice/notice-list" },
                ]}
            />
            {/* Filters and Add Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-6">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <select className=" border bg-[#F0FBEF] border-gray-300 rounded-[8px]  px-6 py-2 text-gray-500 focus:outline-none w-full md:w-auto">
                        <option>Select Department</option>
                    </select>
                    <select className=" border bg-[#F0FBEF] border-gray-300 !rounded-[8px] px-6 py-2 text-gray-500 focus:outline-none w-full md:w-auto">
                        <option>Select Category</option>
                    </select>
                    <button className=" border border-gray-300 rounded-[8px] px-6 py-2 text-gray-500 flex items-center gap-2 w-full md:w-auto">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
                        Sort by
                    </button>
                </div>
                <Link to="/admin-dashboard/notice/add-notice" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-[8px] px-10 py-2 text-lg transition">
                    Add Notice
                </Link>
            </div>
            {/* Table */}
            <div className="w-full overflow-x-auto rounded-2xl bg-white">
                <table className="min-w-[900px] w-full">
                    <thead className="bg-[#EAF2FA]">
                        <tr className=" text-gray-500 text-left text-sm">
                            <th className="py-4 px-4 font-medium">SL NO.</th>
                            <th className="py-4 px-4 font-medium">IMAGE</th>
                            <th className="py-4 px-4 font-medium">NOTICE TITLE</th>
                            <th className="py-4 px-4 font-medium">CATEGORY</th>
                            <th className="py-4 px-4 font-medium">DEPARTMENT</th>
                            <th className="py-4 px-4 font-medium">STATUS</th>
                            <th className="py-4 px-4 font-medium">ACTION BUTTON</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((notice, idx) => (
                            <tr key={notice?._id} className="border-b last:border-b-0">
                                <td className="py-4 px-4 font-semibold text-gray-700">#{String(idx + 1).padStart(2, "0")}</td>
                                <td className="py-4 px-4">
                                    <img
                                        src={notice?.image}
                                        alt={notice?.title}
                                        className="w-20 h-14 object-cover rounded-[8px]"
                                    />
                                </td>
                                <td className="py-4 px-4 font-medium text-gray-900">{notice?.title}</td>
                                <td className="py-4 px-4 text-gray-700">{notice?.category}</td>
                                <td className="py-4 px-4 text-gray-700">{notice?.department}</td>
                                <td className="py-4 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${notice?.status === "Active"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {notice?.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 flex gap-4 items-center">
                                    <Link to={`/admin-dashboard/notice/edit/${notice?._id}`} className="flex font-semibold items-center gap-1 text-blue-600 text-base">
                                        <FaEdit className="w-4 h-4" /> Edit
                                    </Link>
                                    <button onClick={() => {
                                        handleDelete(notice?._id)
                                    }} className="flex font-semibold items-center gap-1 text-red-500  text-base">
                                        <RiDeleteBin6Line className="w-4 h-4" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination and Item Per Page */}
                <Pagination
                    total={data?.total}
                    page={currentPage}
                    limit={pageLimit}
                    onPageChange={(newPage, newLimit) => {
                        setCurrentPage(newPage);
                        setPageLimit(newLimit);
                    }}
                />
            </div>
        </div>
    );
};

export default NoticeList;