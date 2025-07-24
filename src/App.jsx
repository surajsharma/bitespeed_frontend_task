import React, { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
} from '@xyflow/react';

import Sidebar from './Sidebar';
import Header from './Header';
import '@xyflow/react/dist/style.css';

import Node from './Node';

const initialNodes = [
  { id: 'provider-1', type: 'node', data: { msg: 'message from Node 1' }, position: { x: 100, y: 100 } },
  {
    id: 'provider-2', type: 'node',
    data: { msg: 'message from Node 2' },
    position: { x: 250, y: 5 },
  },
  { id: 'provider-3', type: 'node', data: { msg: 'Node 5' }, position: { x: 400, y: -100 } },
];

const initialEdges = [
  {
    id: 'provider-e1-2',
    source: 'provider-1',
    sourceHandle: 'out',       // ← explicitly choose correct source handle
    target: 'provider-2',
    targetHandle: 'in',        // ← explicitly choose correct target handle
    animated: true,
    markerEnd: {
      type: 'arrowclosed',
    },
  }   //  { id: 'provider-e2-3', source: 'provider-2', target: 'provider-3' },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { node: Node };

const ProviderFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  const [selectedNodeIds, setSelectedNodeIds] = useState([]);

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <Header />
          <div className="inner-wrapper">
            <ReactFlow
              className='reactflow'
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background />
            </ReactFlow>
            <Sidebar nodes={nodes} setNodes={setNodes} />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
