// import React, { useState, useRef, useEffect } from "react";
// import { Icons } from "./Icons";
// // import CreateUserModal from "./CreateUserModal";

// const NavItem = ({ icon, label }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const ref = useRef(null);

//   const isUser = label === "User";

//   useEffect(() => {
//     const close = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", close);
//     return () => document.removeEventListener("mousedown", close);
//   }, []);

//   return (
//     <div ref={ref} className="relative">

//       {/* Main Button */}
//       <button
//         onClick={() => isUser && setDropdownOpen(!dropdownOpen)}
//         className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded"
//       >
//         {Icons[icon] || Icons.users}
//         {label}
//         {isUser && Icons.chevronDown}
//       </button>

//       {/* Dropdown */}
//       {isUser && dropdownOpen && (
//         <div className="bg-white shadow rounded mt-1">
//           <button
//             onClick={() => {
//               setDropdownOpen(false);
//               setModalOpen(true);
//             }}
//             className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
//           >
//             {Icons.plus}
//             Create User
//           </button>
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && <CreateUserModal onClose={() => setModalOpen(false)} />}
//     </div>
//   );
// };

// export default NavItem;