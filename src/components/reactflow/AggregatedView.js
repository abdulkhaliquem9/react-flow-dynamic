import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  useReactFlow,
} from 'reactflow';
import { initialNodes, initialEdges } from './Data-initialView';
import { detailViewNodes, detailViewEdges } from './Data-detailView';
import CustomEdge from './CustomeEdge';

import { CustomNode, CustomMultiConnectNode } from './customNode';

import facetPlateData from './Data-facePlateView';

// import ImageNode from './imageNode'

import 'reactflow/dist/style.css';
import './aggregatedview.css';

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log('flow loaded:', reactFlowInstance);

const AggregatedView = () => {
  const [showChart, setShowChart] = useState(true);
  const [nodeTypesState, setNodeTypes] = useState({});
  const [edgeTypesState, setEdgeTypes] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [charts, setCharts] = useState({});

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onClickNode = (data) => {
    console.log('Node Clicked', data);
  };

  const onNodeMouseEnter = (event, node) => {
    const { id, data } = node;
    console.log('onMouseOverNode...', { event, node, charts }, '...');
    const highlightedEdges = charts[data.chart].edges.map((edge) => {
      if (edge.source === id || edge.target === id) {
        return { ...edge, style: { ...edge.style, strokeWidth: 10 } };
      } else {
        return edge;
      }
    });
    setCharts({
      ...charts,
      [data.chart]: { ...charts[data.chart], edges: highlightedEdges },
    });
  };
  const onNodeMouseLeave = (event, node) => {
    const result = {
      ...charts,
      [node.data.chart]: {
        ...charts[node.data.chart],
        edges: charts[node.data.chart].edges.map((edge) => ({
          ...edge,
          style: { ...edge.style, strokeWidth: 2 },
        })),
      },
    };
    console.log('onMouseOut of node...', event, node, '...', result);
    // setEdges(edges.map(edge => ({...edge, style: {...edge.style, strokeWidth: 2}})))
    setCharts(result);
  };

  const onExpand = (switchKey) => {
    console.log('expand', switchKey);
    setCharts({
      [switchKey]: facetPlateData[switchKey],
    });
  };
  useEffect(() => {
    const nodeTypes = {
      customNode: (nodeProps) => <CustomNode {...nodeProps} />,
      multiConnectNode: CustomMultiConnectNode,
      // 'imgNode':imageNode
    };
    const edgeTypes = {
      customEdge: CustomEdge,
    };
    setEdgeTypes(edgeTypes);
    setNodeTypes(nodeTypes);
    setCharts({
      aggregated: { edges: initialEdges, nodes: initialNodes },
    });
    // setCharts({
    //   'aggrgated': {edges: initialEdges, nodes: initialNodes},
    //   'aggrgated2': {edges: initialEdges, nodes: initialNodes},
    //   'aggrgated3': {edges: initialEdges, nodes: initialNodes},
    //   'aggrgated4': {edges: initialEdges, nodes: initialNodes},
    // })
  }, []);

  const backHandler = () => {
    console.log('back handler');
    setEdges(initialEdges);
    setNodes(initialNodes);
  };
  const onNodeClick = (event, data) => {
    console.log('onNodeClick 12', event, data);
    setShowChart(false);
    setTimeout(() => {
      if (data.data.label.includes('CF')) {
        setCharts({
          detailed: {
            edges: facetPlateData.detailed.edges,
            nodes: facetPlateData.detailed.nodes,
          },
          detailed2: {
            edges: facetPlateData.detailed2.edges,
            nodes: facetPlateData.detailed2.nodes,
          },
          detailed3: {
            edges: facetPlateData.detailed3.edges,
            nodes: facetPlateData.detailed3.nodes,
          },
        });
      } else {
        // setEdges(detailViewEdges)
        // setNodes(detailViewNodes)

        setCharts({
          detailed: { edges: detailViewEdges, nodes: detailViewNodes },
        });
      }
      setShowChart(true);
    }, 100);
  };
  const isSingleChart = Object.keys(charts).length <= 1;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      {/* <div>
        <button onClick={backHandler}>Back</button>
      </div> */}
      {!isSingleChart && (
        <div className={'charts-container'}>
          {!isSingleChart &&
            showChart &&
            Object.keys(charts).map((switchKey, i) => {
              console.log('...', charts[switchKey]);

              return (
                <div className={'chart-container'} key={i}>
                  <ReactFlow
                    key={i}
                    nodes={charts[switchKey].nodes}
                    edges={charts[switchKey].edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={onInit}
                    fitView
                    attributionPosition="top-right"
                    nodeTypes={nodeTypesState}
                    edgeTypes={edgeTypesState}
                    onNodeClick={onNodeClick}
                    onNodeMouseEnter={onNodeMouseEnter}
                    onNodeMouseLeave={onNodeMouseLeave}
                    style={{ backgroundColor: 'white' }}
                    // defaultViewport={{x:0, y: 0, zoom: 1}}
                  >
                    {/* <MiniMap style={minimapStyle} zoomable pannable /> */}
                    <Controls />
                    <Background color="#aaa" gap={16} />
                  </ReactFlow>

                  <button
                    className="expand-button"
                    onClick={() => {
                      onExpand(switchKey);
                    }}
                  >
                    Expand
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {isSingleChart &&
        showChart &&
        Object.keys(charts).map((switchKey, i) => {
          console.log('...', charts[switchKey]);
          return (
            <ReactFlow
              nodes={charts[switchKey].nodes}
              edges={charts[switchKey].edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              fitView
              attributionPosition="top-right"
              nodeTypes={nodeTypesState}
              edgeTypes={edgeTypesState}
              onNodeClick={onNodeClick}
              onNodeMouseEnter={onNodeMouseEnter}
              onNodeMouseLeave={onNodeMouseLeave}
              // defaultViewport={{x:0, y: 0, zoom: 0.1}}
            >
              <MiniMap style={minimapStyle} zoomable pannable />
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          );
        })}
    </div>
  );
};

export default AggregatedView;
