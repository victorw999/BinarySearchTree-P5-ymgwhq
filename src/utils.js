// // for TrieTree only
// function calculateDepth(node) {
//   if (!node) {
//     return 0;
//   }
  
//   let maxChildDepth = 0;
//   if (node.children) { // Assuming 'children' property for general tree
    
//     for (const key in node.children) {
//       console.log("key", key)
//       maxChildDepth = Math.max(maxChildDepth, calculateDepth(node.children[key])); 
//     }
//   }

//   return 1 + maxChildDepth; 
// }
