import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import axios from 'axios';
import { AdminContext } from '@/context/AdminContext';

const AddDoctors = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { aToken } = useContext(AdminContext);

    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        experience: '',
        fees: '',
        speciality: '',
        degree: '',
        address: {
            line1: '',
            line2: '',
        },
        about: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'line1' || name === 'line2') {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            if (selectedFile) {
                data.append("image", selectedFile);
            }

            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'address') {
                    data.append('address', JSON.stringify(value));
                } else {
                    data.append(key, value);
                }
            });

            const res = await axios.post(`${url}/api/admin/add-doctor`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${aToken}`,
                },
            });
            console.log("res.data.success", res.data.success);

            if (res.data.success) {
                setFormData({
                    name: '',
                    email: '',
                    experience: '',
                    fees: '',
                    speciality: '',
                    degree: '',
                    address: {
                        line1: '',
                        line2: '',
                    },
                    about: '',
                })
                setSelectedFile(null);
                setPreviewImage(null);
                document.getElementById('doctorImageInput').value = '';
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h1 className='text-[25px] text-[#4B5563] font-bold mb-5'>Add Doctor</h1>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
                {/* Upload */}
                <div className="mb-6">
                    <label className="cursor-pointer">
                        <img
                            src={previewImage || assets.upload_area}
                            alt="Upload"
                            className="object-cover h-32 w-32 rounded-full border border-dashed border-gray-300"
                        />
                        <input type="file" id="doctorImageInput" hidden accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                {/* Form fields */}
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Doctor Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Doctor Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Doctor Email</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="********"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Experience</label>
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="e.g. 5 years"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Fees</label>
                            <input
                                type="text"
                                name="fees"
                                value={formData.fees}
                                onChange={handleChange}
                                placeholder="e.g. ₹500"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Speciality</label>
                            <select
                                name="speciality"
                                value={formData.speciality}
                                onChange={handleChange}
                                className="w-full border rounded-md px-4 py-2 bg-white"
                            >
                                <option disabled value="">Select a speciality</option>
                                <option value="General physician">General physician</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                placeholder="e.g. masters"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="line1"
                                value={formData.address.line1}
                                onChange={handleChange}
                                placeholder="Street address"
                                className="w-full border rounded-md px-4 py-2 mb-2"
                            />
                            <input
                                type="text"
                                name="line2"
                                value={formData.address.line2}
                                onChange={handleChange}
                                placeholder="City, State, ZIP"
                                className="w-full border rounded-md px-4 py-2"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <textarea
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Enter about information..."
                        className="w-full border rounded-md px-4 py-2 mt-4"
                    ></textarea>
                </div>


                {/* Submit */}
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Doctor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDoctors;
