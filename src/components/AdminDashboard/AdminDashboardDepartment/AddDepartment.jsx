import { useState, useRef } from "react";
import AdminDashboardBreadcrumb from '../../AdminDashboardBreadcrumb';
import ReactQuill from "react-quill-new";
import { singleImageUpload } from "../../../Hooks/ImageUpload";
import usePostData from "../../../Hooks/usePostData";
import { server_url } from "../../../Config/API";
import toast from "react-hot-toast";

const initialState = {
    name: "",
    thumbnail: null,
    totalCredit: 0,
    seatAvailable: 0,
    status: "",
    description: "",
};


const statuses = ["Active", "Inactive"];

const AddDepartment = () => {
    const [form, setForm] = useState(initialState);
    const [images, setImages] = useState("")
    const quillRef = useRef();
    const { postData, loading } = usePostData(`${server_url}/department/addDepartment`);

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
        const data = { ...form, thumbnail: images };
        const result = await postData(data);
        console.log(data)
        if (result.success) {
            toast.success("Department added successfully!");
            setForm(initialState);
            setImages("");
        }
    };

    return (
        <div className="bg-[#F0FBEF] min-h-screen">
            <AdminDashboardBreadcrumb
                items={[
                    { name: "Department", path: "department/add-department" },
                    { name: "Add Department", path: "department/add-department" },
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
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form?.name}
                            onChange={handleChange}
                            placeholder="Enter Department Name"
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Thumbnail (Optional)
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                name="thumbnail"
                                onChange={handleChangeUploadImage}
                                className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            />
                            <img className="w-16 rounded-[8px]" src={images} alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Total Credit
                        </label>
                        <input
                            type="number"
                            name="totalCredit"
                            value={form?.totalCredit}
                            onChange={handleChange}
                            placeholder="Enter Total Credit"
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            required
                        />
                        
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Seat Available
                        </label>
                        <input
                            type="number"
                            name="seatAvailable"
                            value={form?.seatAvailable}
                            onChange={handleChange}
                            placeholder="Enter Available seat"
                            className="w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:outline-none"
                            required
                        />
                        
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
                {/* Department Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Department Description
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
               
                {/* Submit Button */}

                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-[8px] px-10 py-3 text-lg transition" disabled={loading ? true : false}>
                    {loading && <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>}
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;