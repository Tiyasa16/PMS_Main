// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Completed", value: 40 },
//   { name: "Pending", value: 25 },
//   { name: "In Progress", value: 20 },
//   { name: "Cancelled", value: 15 }
// ];

// const COLORS = ["#4CAF50", "#FFC107", "#2196F3", "#F44336"];

// const PieChartBox = () => {
//   return (
//     <div style={{ width: "400px", height: "300px" }}>
//       <h3>Project Status</h3>

//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {data.map((entry, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>

//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PieChartBox;