import React from 'react';
import toast from 'react-hot-toast';


export default ({ nodes, edges }) => {
  const handleClick = () => {
    // Check if every node has at least one edge (either as source or target)
    const allNodesConnected = nodes.every(node => {
      const nodeId = node.id;

      // Count edges where this node is either source or target
      const connectedEdges = edges.filter(edge =>
        edge.source === nodeId || edge.target === nodeId
      );

      // Return true if this node has at least 1 edge
      return connectedEdges.length >= 1;
    });

    if (allNodesConnected) {
      toast.success('Saved Flow! 🎉');
    } else {
      toast.error('Cannot save flow! ❌');
    }

    return allNodesConnected;
  }
  return (
    <div className="header">
      <button className="xy-theme__button button-save" onClick={handleClick} >Save Changes</button>
      <>&nbsp;&nbsp;</>
    </div>
  );

};
