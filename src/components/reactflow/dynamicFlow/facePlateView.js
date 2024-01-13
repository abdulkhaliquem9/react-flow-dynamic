import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, MiniMap } from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';
import './facePlateView.css'

const minimapStyle = {
    height: 120,
  };

function FacePlateView(props) {
    const { data = {}, enableMouseHover = true, onNodeClick } = props
    // const { viewType, data: chartData = [] } = data
    const [charstData, setChartsData] = useState(data)
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
        console.log('DATA CHANGED', props.data)
        setChartsData(props.data)
    }, [props.data])


    console.log('FacePlateView', charstData)
    if (charstData && charstData.data && Array.isArray(charstData.data)) {
        return (
            
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div className={'charts-container'}>
                    {
                        charstData.data.map(({ nodes, edges }, i) => {
                            return <div className={'chart-container'} key={i}>
                                <ReactFlow
                                edgeTypes={edgeTypesState}
                                nodeTypes={nodeTypesState}
                                nodes={nodes}
                                edges={edges}
                                style={{ backgroundColor: 'white' }}
                                fitView
                                attributionPosition="top-right"
                                onInit = {(reactFlowInstance) => console.log('flow loaded:', reactFlowInstance)}
                                defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
                            // onNodeMouseEnter={enableMouseHover ? onNodeMouseEnter : null}
                            // onNodeMouseLeave={enableMouseHover ? onNodeMouseLeave : null}
                            // onNodeClick={onNodeClick}
                            >
                                <MiniMap style={minimapStyle} zoomable pannable />
                            </ReactFlow>
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