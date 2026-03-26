// // import { ProgressBar } from "../ui/DashboardPrimitives";
// // import { projects as defaultProjects } from "../../constants/dashboardData";

// import { ProgressBar } from "../components/ui/DashboardPrimitives";
// // import { projects as defaultProjects } from "../constants/dashboardData";
// /**
//  * ProjectProgress
//  * Props:
//  *   projects  {Array}  – array of { id, name, color, progress }
//  *                        defaults to dashboardData.projects
//  *   onViewAll {() => void}
//  */
// export default function ProjectProgress({ projects = defaultProjects, onViewAll }) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         border: "0.5px solid #e2dfd8",
//         borderRadius: 12,
//         padding: "18px 20px",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 14,
//         }}
//       >
//         <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1917" }}>Project progress</span>
//         <span
//           onClick={onViewAll}
//           style={{ fontSize: 12, color: "#1D9E75", cursor: "pointer" }}
//         >
//           View all
//         </span>
//       </div>

//       {projects.map((p) => (
//         <div key={p.id} style={{ marginBottom: 13 }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: 5,
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//               <div
//                 style={{
//                   width: 8,
//                   height: 8,
//                   borderRadius: "50%",
//                   background: p.color,
//                 }}
//               />
//               <span style={{ fontSize: 12.5, color: "#3d3c39" }}>{p.name}</span>
//             </div>
//             <span style={{ fontSize: 12, fontWeight: 500, color: "#888780" }}>{p.progress}%</span>
//           </div>
//           <ProgressBar value={p.progress} color={p.color} />
//         </div>
//       ))}
//     </div>
//   );
// }