import React, {useEffect, useState} from 'react';
import ReactFlow, {Controls} from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';
import aggregatedJSON from './Amya.json'
import {parseNodes, parseAggregatedData}  from './parsers'
import { sampleNodeData } from './sampleData';
import 'reactflow/dist/style.css';
 
export default function DynamicFlow() {
    const [chartData, setChartData] = useState({})
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

        setChartData(parseNodes(sampleNodeData.nodes))
        // setChartData(parseNodes(parseAggregatedData(aggregatedJSON)))
    },[])

    const onNodeMouseEnter = (event, node) => {
      const { id, data } = node;
      const {nodes, edges} = chartData
      const highlightedEdges = edges.map((edge) => {
        if (edge.source === id || edge.target === id) {
          return { ...edge, style: { ...edge.style, strokeWidth: 4 } };
        } else {
          return edge;
        }
      });
      // console.log('onMouseOverNode...', { event, node, chartData, highlightedEdges }, '...');
      setChartData(prev => ({
        ...prev,
        edges: highlightedEdges,
        // [data.chart]: { ...charts[data.chart], edges: highlightedEdges },
      }) );
    };

    const onNodeMouseLeave = (event, node) => {
      const {nodes, edges} = chartData
      const unhighlightedEdges = edges.map((edge) => ({
        ...edge,
        style: { ...edge.style, strokeWidth: 2 },
      }))
      // console.log('onMouseOut of node...', event, node, '...', unhighlightedEdges);
      // setEdges(edges.map(edge => ({...edge, style: {...edge.style, strokeWidth: 2}})))
      setChartData(prev => ({
        ...prev,
        edges: unhighlightedEdges,
        // [data.chart]: { ...charts[data.chart], edges: highlightedEdges },
      }) );
    };

    // const {nodes, edges}= parseNodes(sampleNodeData.nodes)
    // const {nodes, edges}= parseNodes(parseAggregatedData(aggregatedJSON))
    const {nodes, edges} = chartData
    console.log('...', {nodes, edges})

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow 
      edgeTypes={edgeTypesState}
      nodeTypes={nodeTypesState}
      nodes={nodes} 
      edges={edges}
      defaultViewport={{x:0, y: 0, zoom: 0.1}}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}