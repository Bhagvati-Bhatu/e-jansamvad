import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ setActivePage, showToast }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const stateLists = {
    "choose": ["choose"],
    "Andhra Pradesh": ["choose","Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Rajahmundry", "Kakinada", "Anantapur", "Nellore", "Kadapa", "Chittoor"],
    "Arunachal Pradesh": ["choose","Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Roing", "Tezu", "Along", "Seppa", "Changlang"],
    "Assam": ["choose","Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur", "Tinsukia", "Nagaon", "Diphu", "Bongaigaon", "Sivasagar"],
    "Bihar": ["choose","Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Begusarai", "Purnia", "Samastipur", "Ara", "Chhapra"],
    "Chhattisgarh": ["choose","Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Jagdalpur", "Rajnandgaon", "Raigarh", "Ambikapur", "Dhamtari"],
    "Goa": ["choose","Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute", "Bicholim", "Canacona", "Curchorem", "Sanguem"],
    "Gujarat": ["choose","Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar", "Bhavnagar", "Anand", "Junagadh", "Bhuj"],
    "Haryana": ["choose","Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak", "Hisar", "Yamunanagar", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["choose","Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Chamba", "Bilaspur", "Hamirpur", "Una"],
    "Jharkhand": ["choose","Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Palamu", "Dumka"],
    "Karnataka": ["choose","Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Shivamogga", "Davanagere", "Ballari", "Tumakuru", "Udupi"],
    "Kerala": ["choose","Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Palakkad", "Kollam", "Kannur", "Kottayam", "Malappuram"],
    "Madhya Pradesh": ["choose","Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Ratlam", "Rewa", "Sagar", "Satna", "Chhindwara"],
    "Maharashtra": ["choose","Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
    "Manipur": ["choose","Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul", "Tamenglong", "Senapati", "Kakching", "Jiribam", "Moreh"],
    "Meghalaya": ["choose","Shillong", "Tura", "Nongpoh", "Baghmara", "Jowai", "Williamnagar", "Resubelpara", "Mairang", "Nongstoin", "Khliehriat"],
    "Mizoram": ["choose","Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Bairabi", "Saitual"],
    "Nagaland": ["choose","Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng"],
    "Odisha": ["choose","Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Puri", "Balasore", "Bhadrak", "Angul", "Jeypore"],
    "Punjab": ["choose","Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Moga", "Ferozepur"],
    "Rajasthan": ["choose","Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar", "Bharatpur", "Sikar", "Chittorgarh"],
    "Sikkim": ["choose","Gangtok", "Namchi", "Mangan", "Gyalshing", "Pelling", "Rangpo", "Jorethang", "Ravangla", "Lachen", "Lachung"],
    "Tamil Nadu": ["choose","Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Vellore", "Tirunelveli", "Erode", "Thoothukudi", "Dindigul"],
    "Telangana": ["choose","Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar", "Siddipet", "Ramagundam", "Mancherial", "Adilabad"],
    "Tripura": ["choose","Agartala", "Udaipur", "Kailashahar", "Dharmanagar", "Ambassa", "Belonia", "Kamalpur", "Sonamura", "Khowai", "Bishalgarh"],
    "Uttar Pradesh": ["choose","Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Aligarh"],
    "Uttarakhand": ["choose","Dehradun", "Haridwar", "Nainital", "Almora", "Rishikesh", "Mussoorie", "Pithoragarh", "Rudrapur", "Haldwani", "Tehri"],
    "West Bengal": ["choose","Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Kharagpur", "Bardhaman", "Midnapore", "Berhampore"],
    "Delhi": ["choose","New Delhi", "Connaught Place", "Chandni Chowk", "Saket", "Karol Bagh", "Rohini", "Dwarka", "Lajpat Nagar", "Hauz Khas", "Janakpuri"]
  };

  const States = Object.keys(stateLists);
  const [selectedState, setSelectedState] = useState("choose");
  const [selectedDistrict, setSelectedDistrict] = useState("choose");
  const [districtList, setDistrictList] = useState(stateLists["choose"]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setDistrictList(stateLists[newState]);
    setSelectedDistrict("choose"); // Reset district when state changes
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

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
    if (!state || state === "choose") return "Please select a state";
    return "";
  };

  const validateDistrict = (district) => {
    if (!district || district === "choose") return "Please select a district";
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
    const state = selectedState;
    const city = selectedDistrict;
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

            {/* State Dropdown */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">State *</label>
              <select
                id="state"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.state ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              >
                {States.map((state, index) => (
                  <option key={index} value={state}>
                    {state === "choose" ? "-- Select State --" : state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </motion.div>

            {/* District Dropdown */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">District *</label>
              <select
                id="district"
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={selectedState === "choose"}
                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.district ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              >
                {districtList.map((district, index) => (
                  <option key={index} value={district}>
                    {district === "choose" ? "-- Select District --" : district}
                  </option>
                ))}
              </select>
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
