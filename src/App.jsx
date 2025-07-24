import React, { useState, useCallback, useMemo } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Node from './Node';

import Droppable from './Droppable.jsx';
import { DndContext } from '@dnd-kit/core';
import { Toaster } from 'react-hot-toast';

import { initialEdges, initialNodes } from './data.jsx';

const FlowContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [message, setMessage] = useState("");
  const nodeTypes = useMemo(() => ({ node: Node }), []);

  const reactFlowInstance = useReactFlow();
  const { project } = reactFlowInstance;

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge({
      ...params,
      markerEnd: {
        type: 'arrowclosed',
      },
    }, els)),
    [],
  );

  function handleDragEnd(event) {
    const { over } = event;

    if (!over || over.id !== 'droppable') {
      return;
    }

    const { activatorEvent, delta } = event;
    if (!activatorEvent) return;

    const { clientX: startX, clientY: startY } = activatorEvent;
    const finalX = startX + delta.x;
    const finalY = startY + delta.y;

    let position;

    if (typeof project === 'function') {
      position = project({ x: finalX, y: finalY });
    } else if (typeof reactFlowInstance.screenToFlowPosition === 'function') {
      position = reactFlowInstance.screenToFlowPosition({ x: finalX, y: finalY });
    } else {
      position = { x: finalX, y: finalY }; // Fallback to screen coordinates
    }

    const newNode = {
      id: `provider-${nodes.length + 1}`,
      type: 'node',
      data: { msg: `node ${nodes.length + 1}` },
      position
    };

    setNodes((nodes) => [...nodes, newNode]);
  }

  const handleSelectionChange = useCallback(({ nodes }) => {
    const newIds = nodes.map(n => n.id);

    // Shallow compare arrays
    const isSame =
      newIds.length === selectedNodeIds.length &&
      newIds.every((id, idx) => id === selectedNodeIds[idx]);

    if (!isSame) {
      setSelectedNodeIds(newIds);
    }

    const newMessage = nodes[0]?.data?.msg || "";
    setMessage(newMessage);
  }, [selectedNodeIds]);

  return (
    <>
      <Header nodes={nodes} edges={edges} />
      <div className="inner-wrapper" >
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable>
            <ReactFlow
              className="reactflow"
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onSelectionChange={handleSelectionChange}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background />
            </ReactFlow>
          </Droppable>
          <Sidebar
            message={message}
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            selectedNodeId={selectedNodeIds[0]}
            nodeSelected={selectedNodeIds.length > 0}
          />
        </DndContext>
      </div>
    </>
  );
};

const ProviderFlow = (props) => {
  return (
    <div className="providerflow">
      <Toaster position="top-center" />
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <FlowContent />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
