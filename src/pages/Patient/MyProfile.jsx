import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { PatientContext } from '@/context/PatientContext';

const MyProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [editable, setIsEditable] = useState(false);
  const { backendUrl, token, userData, setUserData, getUserProfileData } = useContext(PatientContext);

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressLine1Ref = useRef(null);
  const addressLine2Ref = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);

  useEffect(() => {
    if (editable) {
      emailRef.current?.focus();
    }
  }, [editable]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setUserData(prev => ({ ...prev, image: imageURL }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      const fileInput = document.getElementById("upload_img");
      if (fileInput && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const response = await axios.post(`${backendUrl}/api/user/user-profile-update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("Profile updated successfully");
        getUserProfileData();
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  useEffect(() => {
  }, [userData])

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-xl rounded-2xl p-6">
      <div className="flex items-center gap-6">
        <label htmlFor="upload_img" className="cursor-pointer">
          <img
            src={imagePreview ||`${backendUrl}/images/${userData?.image}`}
            alt="Profile"
            className="h-40 w-32 object-cover rounded-lg border border-gray-300"
          />
        </label>
        {editable && (
          <input
            type="file"
            id="upload_img"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{userData?.name}</h1>
          <p className="text-gray-500">Personal Profile</p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <section>
        <h2 className="text-lg font-semibold text-gray-700 underline mb-2">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            {editable ? (
              <input
                ref={emailRef}
                type="email"
                className="input-field"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              />
            ) : (
              <p className="text-gray-800">{userData?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Phone:</label>
            {editable ? (
              <input
                ref={phoneRef}
                type="text"
                className="input-field"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-gray-800">{userData?.phone}</p>
            )}
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-600">Address:</label>
        {editable ? (
          <div className="flex flex-col gap-2 mb-4">
            <input
              ref={addressLine1Ref}
              type="text"
              className="input-field"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              ref={addressLine2Ref}
              type="text"
              className="input-field"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </div>
        ) : (
          <p className="text-gray-800 mb-4">
            {userData?.address?.line1},<br />
            {userData?.address?.line2}
          </p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 underline mb-2">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Gender:</label>
            {editable ? (
              <input
                ref={genderRef}
                type="text"
                className="input-field"
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              />
            ) : (
              <p className="text-gray-800">{userData?.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Date of Birth:</label>
            {editable ? (
              <input
                ref={dobRef}
                type="date"
                className="input-field"
                value={userData.dob}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-800">{userData?.dob}</p>
            )}
          </div>
        </div>
      </section>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setIsEditable(!editable)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
        >
          {editable ? 'Cancel' : 'Edit'}
        </button>
        {editable && (
          <button
            onClick={(e) => {
              handleUpdate(e);
              setIsEditable(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
