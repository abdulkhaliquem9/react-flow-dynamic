import React, {useEffect, useState} from 'react';
import ReactFlow, {Controls} from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';
import aggregatedJSON from './Amya.json'
import {parseNodes, generateEdges, parseAggregatedData}  from './parsers'
import 'reactflow/dist/style.css';

const data = {
    nodes: [
        // level-1
        {id: '1', deviceType: 'BACKBONE', level: '1', child: [{id: '1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-2', isConnected: true, conn_color: 'yellow'}, {id:'1-3', isConnected: true, conn_color: 'yellow'}, {id:'1-4', isConnected: true, conn_color: 'yellow'}]},
        {id: '2', deviceType: 'BACKBONE', level: '1', child: [{id: '1-1', isConnected: true, conn_color: 'green'}, {id:'1-2', isConnected: true, conn_color: 'green'}, {id:'1-3', isConnected: true, conn_color: 'green'}, {id:'1-4', isConnected: true, conn_color: 'green'}]},
        // {id: '3', deviceType: 'BACKBONE', level: '1', child: [{id: '1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-2', isConnected: true, conn_color: 'yellow'}, {id:'1-3', isConnected: true, conn_color: 'yellow'}, {id:'1-4', isConnected: true, conn_color: 'yellow'}]},
        // {id: '4', deviceType: 'BACKBONE', level: '1', child: [{id: '1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-2', isConnected: true, conn_color: 'yellow'}, {id:'1-3', isConnected: true, conn_color: 'yellow'}, {id:'1-4', isConnected: true, conn_color: 'yellow'}]},
        // {id: '5', deviceType: 'BACKBONE', level: '1', child: [{id: '1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-2', isConnected: true, conn_color: 'yellow'}, {id:'1-3', isConnected: true, conn_color: 'yellow'}, {id:'1-4', isConnected: true, conn_color: 'yellow'}]},
        // {id: '6', deviceType: 'BACKBONE', level: '1', child: [{id: '1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-2', isConnected: true, conn_color: 'yellow'}, {id:'1-3', isConnected: true, conn_color: 'yellow'}, {id:'1-4', isConnected: true, conn_color: 'yellow'}]},

        // level-2
        {id: '1-1', deviceType: 'SWITCH', level: '2', child: [{id:'1-1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-1-2', isConnected: true, conn_color: 'yellow'}, {id:'1-1-3', isConnected: true, conn_color: 'yellow'}, {id:'1-1-4', isConnected: true, conn_color: 'yellow'},{id:'1-1-5', isConnected: true, conn_color: 'yellow'}, {id:'1-1-6', isConnected: true, conn_color: 'yellow'}, {id:'1-1-7', isConnected: true, conn_color: 'yellow'}, {id:'1-1-8', isConnected: true, conn_color: 'yellow'}]},
        {id: '1-2', deviceType: 'CNM', level: '2', child: [{id:'1-2-1', isConnected: true, conn_color: 'yellow'}, {id:'1-2-2', isConnected: true, conn_color: 'yellow'}, {id:'1-2-3', isConnected: true, conn_color: 'yellow'}, {id:'1-2-4', isConnected: true, conn_color: 'yellow'},{id:'1-2-5', isConnected: true, conn_color: 'yellow'}, {id:'1-2-6', isConnected: true, conn_color: 'yellow'}, {id:'1-2-7', isConnected: true, conn_color: 'yellow'}, {id:'1-2-8', isConnected: true, conn_color: 'yellow'}]},
        {id: '1-3', deviceType: 'FTE', level: '2', child: [{id:'1-3-1', isConnected: true, conn_color: 'yellow'}, {id:'1-3-2', isConnected: true, conn_color: 'yellow'}, {id:'1-3-3', isConnected: true, conn_color: 'yellow'}]},
        {id: '1-4', deviceType: 'NON-FTE', level: '2', child: [{id:'1-4-1', isConnected: true, conn_color: 'yellow'}]},

        // level-3
        {id: '1-1-1', deviceType: 'SWITCH', level: '3', child: [{id:'1-1-1-1', isConnected: true, conn_color: 'yellow'}, {id:'1-1-1-2', isConnected: true, conn_color: 'yellow'}]},
        {id: '1-1-2', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-1-3', deviceType: 'CNM', level: '3', child: []},
        {id: '1-1-4', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-1-5', deviceType: 'CNM', level: '3', child: []},
        {id: '1-1-6', deviceType: 'FTE', level: '3', child: []},
        {id: '1-1-7', deviceType: 'NON-FTE', level: '3', child: []},
        {id: '1-1-8', deviceType: 'SWITCH', level: '3', child: []},

        {id: '1-2-1', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-2-2', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-2-3', deviceType: 'CNM', level: '3', child: []},
        {id: '1-2-4', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-2-5', deviceType: 'CNM', level: '3', child: []},
        {id: '1-2-6', deviceType: 'FTE', level: '3', child: []},
        {id: '1-2-7', deviceType: 'NON-FTE', level: '3', child: []},
        {id: '1-2-8', deviceType: 'SWITCH', level: '3', child: []},

        {id: '1-3-1', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-3-2', deviceType: 'SWITCH', level: '3', child: []},
        {id: '1-3-3', deviceType: 'CNM', level: '3', child: []},

        {id: '1-4-1', deviceType: 'SWITCH', level: '3', child: []},

        // level-4
        {id: '1-1-1-1', deviceType: 'SWITCH', level: '4', child: []},
        {id: '1-1-1-2', deviceType: 'SWITCH', level: '4', child: []}
    ],
}
 
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
    // const {nodes, edges}= parseNodes(data.nodes)
    const {nodes, edges}= parseNodes(parseAggregatedData(aggregatedJSON))
    console.log('...', {nodes, edges})

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow 
      edgeTypes={edgeTypesState}
      nodeTypes={nodeTypesState}
      nodes={nodes} 
      edges={edges}
      defaultViewport={{x:100, y: 100, zoom: 0.8}}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}