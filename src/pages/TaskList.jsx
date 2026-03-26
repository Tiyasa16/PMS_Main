// import { useState } from "react";
// import { initialTasks } from "../constants/dashboardData"

// const TABS = ["All", "Mine", "Overdue"];

// /**
//  * TaskList
//  * Props:
//  *   tasks         {Array}              – task objects (defaults to initialTasks)
//  *   onTaskToggle  {(id) => void}       – called when a task checkbox is clicked
//  *                                        (if omitted, component manages state internally)
//  */
// export default function TaskList({ tasks: tasksProp, onTaskToggle }) {
//   const [internalTasks, setInternalTasks] = useState(initialTasks);
//   const [activeTab, setActiveTab] = useState("All");

//   // Support both controlled (tasksProp) and uncontrolled usage
//   const tasks = tasksProp ?? internalTasks;
//   const handleToggle = onTaskToggle ?? ((id) => {
//     setInternalTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
//     );
//   });

//   const filtered =
//     activeTab === "Mine"
//       ? tasks.filter((_, i) => i % 2 === 0)
//       : activeTab === "Overdue"
//       ? tasks.filter((t) => !t.done)
//       : tasks;

//   return (
//     <div
//       style={{
//         background: "#fff",
//         border: "0.5px solid #e2dfd8",
//         borderRadius: 12,
//         padding: "18px 20px",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 12,
//         }}
//       >
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1917" }}>Active tasks</div>
//         <div style={{ display: "flex" }}>
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               style={{
//                 padding: "4px 12px",
//                 fontSize: 12,
//                 border: "none",
//                 background: "transparent",
//                 color: activeTab === tab ? "#1D9E75" : "#a8a59e",
//                 fontWeight: activeTab === tab ? 500 : 400,
//                 borderBottom: `2px solid ${activeTab === tab ? "#1D9E75" : "transparent"}`,
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Task rows */}
//       {filtered.map((task) => (
//         <div
//           key={task.id}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             padding: "8px 0",
//             borderBottom: "0.5px solid #f0ede5",
//           }}
//         >
//           {/* Checkbox */}
//           <div
//             onClick={() => handleToggle(task.id)}
//             style={{
//               width: 16,
//               height: 16,
//               borderRadius: 4,
//               flexShrink: 0,
//               cursor: "pointer",
//               border: task.done ? "none" : "1.5px solid #c8c5be",
//               background: task.done ? "#1D9E75" : "transparent",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {task.done && (
//               <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
//                 <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
//               </svg>
//             )}
//           </div>

//           {/* Text */}
//           <div
//             style={{
//               flex: 1,
//               fontSize: 13,
//               color: task.done ? "#b0ada6" : "#1a1917",
//               textDecoration: task.done ? "line-through" : "none",
//             }}
//           >
//             {task.text}
//           </div>

//           {/* Tag */}
//           <span
//             style={{
//               fontSize: 11,
//               padding: "2px 8px",
//               borderRadius: 4,
//               fontWeight: 500,
//               background: task.tagBg,
//               color: task.tagColor,
//             }}
//           >
//             {task.tag}
//           </span>

//           {/* Due date */}
//           <div style={{ fontSize: 11, color: "#b0ada6", whiteSpace: "nowrap" }}>{task.due}</div>
//         </div>
//       ))}
//     </div>
//   );
// }