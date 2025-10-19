import React, { useEffect, useRef, useState } from "react";
import AdminDashboardBreadcrumb from '../../AdminDashboardBreadcrumb';
import useGetData from "../../../Hooks/useGetData";
import useUpdateData from "../../../Hooks/useUpdateData";
import { useParams } from "react-router-dom";
import { server_url } from "../../../Config/API";
import toast from "react-hot-toast";
import { singleImageUpload } from "../../../Hooks/ImageUpload";
import ReactQuill from "react-quill-new";
import Loader from "../../../shared/Loader";

const categories = ["Program & Event", "Departmental", "College-wide"];
const statuses = ["Active", "Inactive"];

const EditNotice = () => {
    const { id } = useParams(); // get notice id from route params
    const { data, loading, error, refetch } = useGetData(`${server_url}/notice/getNoticeById/${id}`);
    const { data: updateRes, loading: updating, error: updateError, updateData } = useUpdateData(`${server_url}/notice/updateNotice/${id}`);
    const { data: departments } = useGetData(`${server_url}/department/getDepartment`);

    const [form, setForm] = useState({});
    const [images, setImages] = useState("")
    const quillRef = useRef();

    useEffect(() => {
        if (data?.data) {
            setForm(data?.data)
        }
    }, [data, id, updating])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleQuillChange = (value) => {
        setForm((prev) => ({
            ...prev,
            description: value,
        }));
    };

    const handleChangeUploadImage = async (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image);
        await singleImageUpload(formData, setImages, images, "single");
    };

    // Custom image handler for Quill
    const imageHandler = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("image", file);

                // Use a callback to insert image into Quill editor
                await singleImageUpload(formData, (url) => {
                    if (url) {
                        const quill = quillRef.current.getEditor();
                        const range = quill.getSelection();
                        quill.insertEmbed(range ? range.index : 0, "image", url);
                    }
                }, images, "single");
            }
        };
    };
    // Quill modules with custom image handler
    const quillModules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateData({ ...form, image: images || form?.image });
        if (result.success) {
            refetch();
            toast.success("Notice updated successfully!");
        }

    };

    if (loading || updating) return <Loader />;
    if (error || updateError) return <div className="text-red-500">Error: {error || updateError}</div>;

    return (
        <div className="bg-[#F0FBEF] min-h-screen">
            <AdminDashboardBreadcrumb
                items={[
                    { name: "Notice", path: "notice/notice-list" },
                    { name: "Edit Notice", path: `notice/edit/${id}` },
                ]}
            />
            <form
                className="bg-white rounded-[10px] p-6 mt-6"
                onSubmit={handleSubmit}
            >
                {/* Top Row */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Notice Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Farewell Ceremony for Batch 03, Dept. of CSE, Session..."
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Image (Optional)
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                name="image"
                                onChange={handleChangeUploadImage}
                                className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            />
                            <img className="w-16 rounded-[8px]" src={images || form?.image} alt="" />
                        </div>
                    </div>
                </div>
                {/* Category, Department, Status */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Department (Optional)
                        </label>
                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                        >
                            <option value="">Select Department</option>
                            {departments?.data?.map((dep) => (
                                <option key={dep?._id} value={dep?.name}>{dep?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            required
                        >
                            <option value="">Select Status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Notice Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Notice Description
                    </label>
                    <ReactQuill
                        ref={quillRef}
                        value={form.description}
                        onChange={handleQuillChange}
                        theme="snow"
                        modules={quillModules}

                        className="bg-white !rounded-[8px]"
                    // style={{ minHeight: "400px" }}
                    />
                </div>
                {/* Button Labels and Links */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Button 1 Label
                        </label>
                        <input
                            type="text"
                            name="button1Label"
                            value={form.button1Label}
                            onChange={handleChange}
                            placeholder="View Event Details on Facebook"
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Button Link
                        </label>
                        <input
                            type="text"
                            name="button1Link"
                            value={form.button1Link}
                            onChange={handleChange}
                            placeholder="https://facebook.com/events/..."
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Button 2 Label
                        </label>
                        <input
                            type="text"
                            name="button2Label"
                            value={form.button2Label}
                            onChange={handleChange}
                            placeholder="Join Facebook Community"
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Button Link
                        </label>
                        <input
                            type="text"
                            name="button2Link"
                            value={form.button2Link}
                            onChange={handleChange}
                            placeholder="https://facebook.com/events/..."
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                        />
                    </div>
                </div>
                {/* Submit Button */}


                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-[8px] px-10 py-3 text-lg transition" disabled={loading ? true : false}>
                    {loading && <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>}
                    Update Notice
                </button>
            </form>
        </div>
    );
};

export default EditNotice;