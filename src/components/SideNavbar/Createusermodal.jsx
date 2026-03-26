// import React, { useState } from "react";
// import axios from "axios";
// import { Icons } from "./Icons";

// const CreateUserModal = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     systemRole: "user",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         "https://pms-l909.onrender.com/api/v1/auth/register",
//         formData,
//         { withCredentials: true }
//       );

//       setSuccess(true);
//       setTimeout(onClose, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl w-full max-w-md relative">

//         {/* Close */}
//         <button onClick={onClose} className="absolute top-3 right-3">
//           {Icons.x}
//         </button>

//         <h2 className="text-xl font-bold text-[#002d74]">Create User</h2>

//         {success ? (
//           <p className="text-green-600 mt-6">User Created Successfully!</p>
//         ) : (
//           <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">

//             <div className="flex gap-2">
//               <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 w-1/2 rounded" required />
//               <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 w-1/2 rounded" required />
//             </div>

//             <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" required />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full"
//               />
//               <span onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
//                 {showPassword ? Icons.eyeOff : Icons.eye}
//               </span>
//             </div>

//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full"
//               />
//               <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2 cursor-pointer">
//                 {showConfirmPassword ? Icons.eyeOff : Icons.eye}
//               </span>
//             </div>

//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             <button className="bg-[#002d74] text-white py-2 rounded">
//               {loading ? "Creating..." : "Create User"}
//             </button>

//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateUserModal;