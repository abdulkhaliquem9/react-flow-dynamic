import React, {useEffect, useState} from 'react';
import ReactFlow, {Controls} from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';
import aggregatedJSON from './Amya.json'
import {parseNodes, parseAggregatedData}  from './parsers'
import { sampleNodeData } from './sampleData';
import 'reactflow/dist/style.css';
 
export default function DynamicFlow() {
    const [nodeTypesState, setNodeTypes] = useState({});
    const [edgeTypesState, setEdgeTypes] = useState({});
    useEffect(() => {
        const nodeTypes = {
            'customNode': (nodeProps) => <CustomNode {...nodeProps} />,
        };
        setNodeTypes(nodeTypes);
        const edgeTypes = {
            'customEdge': (edgeProps) => <CustomEdge {...edgeProps} />,
          };
        setEdgeTypes(edgeTypes)
    },[])
    const {nodes, edges}= parseNodes(sampleNodeData.nodes)
    // const {nodes, edges}= parseNodes(parseAggregatedData(aggregatedJSON))
    console.log('...', {nodes, edges})

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow 
      edgeTypes={edgeTypesState}
      nodeTypes={nodeTypesState}
      nodes={nodes} 
      edges={edges}
      defaultViewport={{x:0, y: 0, zoom: 0.1}}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}