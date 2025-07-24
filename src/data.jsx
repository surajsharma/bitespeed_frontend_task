
export const initialNodes = [
  {
    id: 'provider-1',
    type: 'node',
    data: { msg: 'message from Node 1' },
    position: { x: 100, y: 100 }
  },
  {
    id: 'provider-2',
    type: 'node',
    data: { msg: 'message from Node 2' },
    position: { x: 250, y: 5 },
  },
  {
    id: 'provider-3',
    type: 'node',
    data: { msg: 'node 3' },
    position: { x: 400, y: -100 }
  },
];

export const initialEdges = [
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
  }];


