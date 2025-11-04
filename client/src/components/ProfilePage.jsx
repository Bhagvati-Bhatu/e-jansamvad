import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ setActivePage, showToast }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // ✅ Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(mobile)) return "Mobile number must be exactly 10 digits";
    return "";
  };

  const validatePincode = (pincode) => {
    if (pincode && !/^\d{6}$/.test(pincode)) return "Pincode must be exactly 6 digits";
    return "";
  };

  const validateState = (state) => {
    if (!state.trim()) return "State is required";
    if (!/^[a-zA-Z\s]+$/.test(state)) return "State can only contain letters";
    return "";
  };

  const validateDistrict = (district) => {
    if (!district.trim()) return "District is required";
    if (!/^[a-zA-Z\s]+$/.test(district)) return "District can only contain letters";
    return "";
  };

  const validateAddress = (address) => {
    if (!address.trim()) return "Address is required";
    if (address.trim().length < 10) return "Address must be at least 10 characters";
    return "";
  };

  async function handleSaveProfile(event) {
    event.preventDefault();
    console.log("Saving profile...");

    const name = document.getElementById("name").value;
    const genderRadio = document.querySelector('input[name="gender"]:checked');
    const gender = genderRadio ? genderRadio.value : "";
    const state = document.getElementById("state").value;
    const city = document.getElementById("district").value;
    const pincode = document.getElementById("pincode").value;
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;

    // ✅ Run all validations
    const newErrors = {
      name: validateName(name),
      gender: !gender ? "Please select a gender" : "",
      state: validateState(state),
      district: validateDistrict(city),
      pincode: validatePincode(pincode),
      address: validateAddress(address),
      mobile: validateMobile(mobile)
    };

    // Remove empty error messages
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);

    // ✅ If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      return;
    }

    try {
      const response = await fetch("https://e-jansamvad-1.onrender.com/user/profileUpdate", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name, gender, state, city, pincode, address, mobile
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("showProfileUpdateToast", "true");
        setActivePage("home");
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile:", data.message || "Unknown error");
        alert("Failed to update profile: " + (data.message || "Please try again"));
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl p-8"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
        >
          Profile Information
        </motion.h2>

        <form className="space-y-6" onSubmit={handleSaveProfile}>
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </motion.div>
          </div>

          {/* Gender, State, District */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2 w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-700">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2 w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-700">Female</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="mr-2 w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-700">Other</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </motion.div>

            {/* State */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.state ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </motion.div>

            {/* District */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">District *</label>
              <input
                type="text"
                id="district"
                name="district"
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.district ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
            </motion.div>
          </div>

          {/* Pincode & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                maxLength="6"
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.pincode ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </motion.div>
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </motion.div>
          </div>

          {/* Mobile Number */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">Mobile Number *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                maxLength="10"
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.mobile ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </motion.div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Save Profile
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
