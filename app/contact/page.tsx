// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("Sending...");

//     try {
//       // Using EmailJS service
//       const res = await fetch("/api/sendEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setStatus("Message sent successfully!");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setStatus("Failed to send message. Try again later.");
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus("Error sending message.");
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Top Image */}
//       <div
//         className="h-96 bg-cover bg-center relative"
//         style={{ backgroundImage: 'url("/image/contact.jpg")' }}
//       >
//         <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center">
//           <h1 className="text-5xl font-bold text-white">Contact Us</h1>
//         </div>
//       </div>

//       {/* Contact Form & Map */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Form */}
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-3xl font-bold mb-6 text-gray-900">
//               Get In Touch
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Name</label>
//                 <input
//                   type="email"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//                 {/* With warning icon */}
//                 <p className="text-sm text-amber-600 mt-1 flex items-center">
//                   <span className="mr-1">⚠️</span>
//                   Important: Use a valid email to receive our feedback
//                 </p>
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows={5}
//                   className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//               >
//                 Send Message
//               </button>
//             </form>
//             {status && <p className="mt-4 text-gray-700">{status}</p>}
//           </div>

//           {/* Google Map, Iframe link from google */}
//           <div className="h-96 rounded-lg overflow-hidden shadow-md">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7979.488330481498!2d32.564177925423465!3d0.3493270869376776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbba0d18f9e11%3A0x1c8590df1e518e01!2sKalerwe%20parents%20school!5e0!3m2!1sen!2sug!4v1759130890923!5m2!1sen!2sug
// "
//               className="w-full h-full border-0"
//               allowFullScreen
//               loading="lazy"
//             ></iframe>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState(""); // Track focused field

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top Image */}
      <div
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: 'url("/image/contact.jpg")' }}
      >
        <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Contact Form & Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
              Get In Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Email Field with Conditional Hint */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {/* Hint appears only when email field is focused */}
                {focusedField === "email" && (
                  <p className="text-sm text-amber-600 mt-2 flex items-start">
                    <span className="mr-2 mt-0.5">💡</span>
                    Important: Use a valid email to receive our feedback
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={handleBlur}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
            {status && (
              <p
                className={`mt-4 ${
                  status.includes("successfully")
                    ? "text-green-600"
                    : status.includes("error") || status.includes("Failed")
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {status}
              </p>
            )}
          </div>

          {/* Google Map */}
          <div className="h-80 sm:h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7979.488330481498!2d32.564177925423465!3d0.3493270869376776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbba0d18f9e11%3A0x1c8590df1e518e01!2sKalerwe%20parents%20school!5e0!3m2!1sen!2sug!4v1759130890923!5m2!1sen!2sug"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
