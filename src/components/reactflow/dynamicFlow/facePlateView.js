import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, MiniMap } from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';
import './facePlateView.css'

function FacePlateView(props) {
    const { data = {}, enableMouseHover = true, onNodeClick } = props
    // const { viewType, data: chartData = [] } = data
    const [showChart, setShowChart] = useState(true)
    const [isExpanded, setExpanded] = useState(false)
    const [charstData, setChartsData] = useState(data)
    const [facePlateData, setFacePlateData] = useState([])
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
    }, [])

    useEffect(() => {
        setChartsData(props.data)
        setFacePlateData(props.data.data || [])
    }, [props.data])

    const onNodeMouseEnter = (event, node) => {
        const { id, data } = node;
        const { nodes, edges } = facePlateData[0] || {}
        const highlightedEdges = edges.map((edge) => {
          if (edge.source === id || edge.target === id) {
            return { ...edge, style: { ...edge.style, strokeWidth: 4 } };
          } else {
            return edge;
          }
        });
        setFacePlateData(prev => ([{nodes, edges: highlightedEdges}]));
      };
    
      const onNodeMouseLeave = (event, node) => {
        const { nodes, edges } = facePlateData[0] || {}
        const unhighlightedEdges = edges.map((edge) => ({
          ...edge,
          style: { ...edge.style, strokeWidth: 2 },
        }))
        setFacePlateData(prev => ([{nodes, edges: unhighlightedEdges}]));
      };

    const onExpand = (index) => {
        setFacePlateData([charstData.data[index]])
        setExpanded(true)
        setShowChart(false)
        setTimeout(() => {
            setShowChart(true)
        }, 100);
    }
    const onCollapse = () => {
        setFacePlateData(charstData.data)
        setExpanded(false)
        setShowChart(false)
        setTimeout(() => {
            setShowChart(true)
        }, 100);
    }


    // console.log('FacePlateView', charstData)
    if (showChart && charstData && charstData.data && Array.isArray(charstData.data)) {
        return (
            
                <div className='face-plate-container'>
                    <div className='charts-container'>
                    {
                        facePlateData.map(({ nodes, edges }, i) => {
                            return <div className={!isExpanded ? 'chart-container' : 'chart-container expanded'} key={i}>
                                <ReactFlow
                                edgeTypes={edgeTypesState}
                                nodeTypes={nodeTypesState}
                                nodes={nodes}
                                edges={edges}
                                style={{ backgroundColor: 'white' }}
                                fitView
                                attributionPosition="top-right"
                                defaultViewport={{ x: 0, y: 0, zoom: 0.1 }}
                                panOnDrag={isExpanded}
                                onNodeMouseEnter={isExpanded ? onNodeMouseEnter : undefined}
                                onNodeMouseLeave={isExpanded ? onNodeMouseLeave : undefined}
                                // onInit = {(reactFlowInstance) => console.log('flow loaded:', reactFlowInstance)}
                            // onNodeClick={onNodeClick}
                            >
                                {/* <MiniMap style={minimapStyle} zoomable pannable /> */}
                            </ReactFlow>

                            {
                                !isExpanded && <button className={"expand-button"} onClick={()=>onExpand(i)}> Expand </button>
                            }
                            {
                                isExpanded && <button className={"collapse-button"} onClick={onCollapse}> Collapse </button>
                            }
                            </div>
                        })
                    }
                    </div>
                </div>
        )
    } else {
        return null
    }
}

export default FacePlateView