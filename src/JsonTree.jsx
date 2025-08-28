// import React from "react";
// import Tree from "react-d3-tree";

// // Function to recursively convert JSON to tree nodes
// function convertToTreeData(obj, nodeName = "root") {
//   if (typeof obj !== "object" || obj === null) {
//     return { name: `${nodeName}: ${obj}` };
//   }

//   if (Array.isArray(obj)) {
//     return {
//       name: nodeName,
//       children: obj.map((item, index) => convertToTreeData(item, `Item ${index + 1}`))
//     };
//   }
// // 
//   return {
//     name: nodeName,
//     children: Object.entries(obj).map(([key, value]) => convertToTreeData(value, key))
//   };
// }

// const JsonTree = ({ data }) => {
//   const treeData = [convertToTreeData(data, "Root")];

//   return (
//     <div style={{ width: "100%", height: "600px" }}>
//       <Tree data={treeData} orientation="vertical" />
//     </div>
//   );
// };

// export default JsonTree;
