import React, {useEffect, useState} from 'react';
import ReactFlow, {Controls, MiniMap} from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';

import 'reactflow/dist/style.css';
 

const minimapStyle = {
  height: 120,
};
export default function DynamicFlow(props) {
    const {data = {}, enableMouseHover = true, onNodeClick} = props
    const [chartData, setChartData] = useState(data)
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

    useEffect(()=>{
      setChartData(props.data)
    }, [props.data])

    const onNodeMouseEnter = (event, node) => {
      const { id, data } = node;
      const {nodes, edges} = chartData.data || {}
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
      const {nodes, edges} = chartData.data || {}
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
    const {nodes, edges} = chartData.data || {}
    // console.log('...', props, {chartData, nodes, edges})

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
  }}>
      <ReactFlow 
      edgeTypes={edgeTypesState}
      nodeTypes={nodeTypesState}
      nodes={nodes} 
      edges={edges}
      defaultViewport={{x:0, y: 0, zoom: 0.1}}
      onNodeMouseEnter={enableMouseHover ? onNodeMouseEnter : null}
      onNodeMouseLeave={enableMouseHover ? onNodeMouseLeave : null}
      onNodeClick={onNodeClick}
      onInit = {(reactFlowInstance) => console.log('flow loaded:', reactFlowInstance)}

      >
        <Controls />
        <MiniMap style={minimapStyle} zoomable pannable />
      </ReactFlow>
    </div>
  );
}