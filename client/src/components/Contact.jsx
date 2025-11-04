import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");

    try {
      const response = await fetch("https://e-jansamvad-1.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ 
          firstName: "", 
          lastName: "", 
          email: "", 
          phone: "", 
          countryCode: "+91", 
          message: "" 
        });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl p-8">
        {/* Left Section: Contact Information */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Contact us through email, phone, or fill out the form below to submit your grievance. Our team will address your concerns promptly.
          </p>
          <div>
            <p className="text-lg text-gray-800 font-semibold">
              Email:{" "}
              <a href="mailto:ajoshi_be23@thapar.edu" className="text-blue-600">
              ajoshi_be23@thapar.edu
              </a>
            </p>

            <p className="text-lg text-gray-800 font-semibold">
              Phone: <span className="text-blue-600">+91 79807 XXXXX </span>
            </p>
          </div>
          <a
            href="./faqs"
            className="text-blue-600 font-medium underline hover:text-blue-700"
          >
            FAQ's
          </a>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Support Hours
              </h2>
              <p className="text-gray-600">
                Monday to Friday, 9 AM to 6 PM
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Feedback & Suggestions
              </h2>
              <p className="text-gray-600">
                We value your feedback and continuously improve based on your suggestions.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Media Inquiries</h2>
              <p className="text-lg text-gray-800 font-semibold">
                Email:{" "}
                <a href="mailto:mediasupport@bitrix.com" className="text-blue-600">
                  mediasupport@bitrix.com (Future Scope)
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="grid grid-cols-3 gap-4">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="+62">+62</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="col-span-2 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
            ></textarea>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
            {status && (
              <p className="text-center text-sm font-medium text-gray-700 mt-2">
                {status}
              </p>
            )}
          </form>
          {/* <p className="text-sm text-gray-500 mt-4">
            By contacting us, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>.
          </p> */}
        </div>
      </div>
    </div>
  );
} 