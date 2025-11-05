import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    state: "choose",
    city: "choose",
    phone: "",
    email: "",
    password: "",
    pincode: ""
  });

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
  const [list, setList] = useState(stateLists["choose"]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setList(stateLists[newState]);
    setFormData({ ...formData, state: newState, city: "choose" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Validation functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (!formData.password || !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.pincode || !formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!formData.address || !formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    if (!formData.state || formData.state === "choose") {
      newErrors.state = "Please select a state";
    }

    if (!formData.city || formData.city === "choose") {
      newErrors.city = "Please select a city";
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    return newErrors;
  };

  async function handleSignup() {
    // ✅ Validate form before submission
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("❌ Please fix the errors above");
      return;
    }

    setIsLoading(true);
    setStatus(null);
    setErrors({});
    
    console.log(formData);
    
    try {
      const response = await fetch("https://e-jansamvad-1.onrender.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        setStatus("✅ Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.status === 400) {
        // ✅ Handle specific field errors from backend
        if (data.field === "email") {
          setErrors({ email: "A user with this email already exists" });
          setStatus("❌ A user with this email already exists");
        } else if (data.field === "phone") {
          setErrors({ phone: "A user with this phone number already exists" });
          setStatus("❌ A user with this phone number already exists");
        } else {
          setStatus("❌ " + (data.error || "Registration failed"));
        }
      } else {
        setStatus("❌ Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setStatus("❌ Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 bg-fill bg-center relative"
    style={{ backgroundImage: "url('/images/login-bg.jpg')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Registration / Sign-up Form
        </h2>
        <p className="text-gray-500 text-center mt-1">
          Fill in your details to create an account.
        </p>

        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-600">Full Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Password *</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Gender *</label>
              <div className="flex space-x-4 mt-1">
                {["Male", "Female", "Transgender"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={gender} 
                      checked={formData.gender === gender}
                      onChange={handleChange} 
                      className="text-indigo-500 focus:ring-indigo-400" 
                    />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Pincode *</label>
              <input 
                type="text" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleChange} 
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                  errors.pincode ? "border-red-500" : ""
                }`}
                maxLength="6"
              />
              {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-600">Address *</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">State *</label>
              <select 
                name="state" 
                value={formData.state} 
                onChange={handleStateChange} 
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                  errors.state ? "border-red-500" : ""
                }`}
              >
                {States.map((state, index) => (
                  <option key={index} value={state}>
                    {state === "choose" ? "-- Select State --" : state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">City *</label>
              <select 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                disabled={selectedState === "choose"}
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none disabled:bg-gray-200 disabled:cursor-not-allowed ${
                  errors.city ? "border-red-500" : ""
                }`}
              >
                {list.map((item, index) => (
                  <option key={index} value={item}>
                    {item === "choose" ? "-- Select City --" : item}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Phone *</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                  errors.phone ? "border-red-500" : ""
                }`}
                maxLength="10"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* ✅ Status message */}
          {status && (
            <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
              status.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {status}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-full font-semibold shadow-md mt-6 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register ➜"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
