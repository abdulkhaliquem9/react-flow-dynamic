import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {Controls} from 'reactflow';
import CustomNode from './customNode';
import CustomEdge from './customEdge';
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

const parseNodes = (nodes = []) => {
    let x_gap = 60
    let y_gap  = 100
    const levels = {}
    nodes.forEach((node,i) => {
        if(!levels[node.level]){
            levels[node.level] = []
        }
        levels[node.level].push(node)
    })
    const levelKeys = Object.keys(levels)
    for(let x = levelKeys.length; x >= 1; x--){
        // console.log('x', x)
        if(x === 1 || x ==='1'){
            let start_x = 0
            levels[x].forEach(((el,i) => {
                if(!levels[x][i].data){
                    levels[x][i].data = {}
                }
                levels[x][i].data.label = levels[x][i].id
                start_x += (levels[x][i].child.length === 0 ? 1 : levels[x][i].child.length) * 10;
                levels[x][i].position = {x: ((levels[levelKeys.length].length / 2) * x_gap) + (i*100)   , y: parseInt(levels[x][i].level) * y_gap}
            }))
        }
        if(levels[x-1]){
            levels[x-1].forEach((el,eli) => {
                let start_x = 0;
                let length = levels[x].length
                // console.log('x-1',x-1,el.id, levels[x].length,  levels[x-1][eli].child.length)
                if(levels[x]){
                    levels[x].forEach((n,ni)=>{
                        if(!levels[x][ni].data){
                            levels[x][ni].data = {}
                        }
                        if(!levels[x][ni].position){
                            levels[x][ni].position = {}
                        }
                        start_x +=  ((levels[x][ni].child.length === 0 ? 1 : levels[x][ni].child.length)) * x_gap
                        levels[x][ni].data.label = levels[x][ni].id
                        levels[x][ni].position.x = start_x;
                        levels[x][ni].position.y = parseInt(levels[x][ni].level) * y_gap;
                    })
                }
            })
        }
    }
    let nodeData = []
    Object.keys(levels).forEach(key=> {
        nodeData = [...nodeData, ...levels[key]]
    })
    nodeData = nodeData.map(n => ({...n, type: 'customNode'}))
    const result = generateEdges(nodeData)
    console.log('result', result)
    return result

}

const generateEdges = (nodes = []) => {
    const imageMap = {
        'BACKBONE': require('./../icons/SWITCH.png'),
        'SWITCH': require('./../icons/SWITCH.png'),
        'SERVER': require('./../icons/SWITCH.png'),
        'CNM': require('./../icons/SWITCH.png'),
        'FTE': require('./../icons/SWITCH.png'),
        'NON-FTE': require('./../icons/SWITCH.png'),
    }
    const edges = []
    const nodeMap = {}
    nodes.forEach((node,i) => {
        if(node.id){
            const data = {...node.data, sourceHandles: [], targetHandles: []}
            if(imageMap[node.deviceType]){
                data.imgSrc = imageMap[node.deviceType]
            }
            nodeMap[node.id] = {...node,  edges: [], data}
        }
    })

    nodes.forEach((node,i) => {
        if(node.id){
            if(Array.isArray(node.child)){
                node.child.forEach((ch,ch_i)=>{
                    const edgeId = `e-${uuidv4()}`;
                    const t_handle_Id = `t-${node.id}`
                    const s_handle_Id = `s-${ch.id}`
                    // console.log({edgeId, node: nodeMap[node.id], childNode: nodeMap[ch]})
                    nodeMap[node.id].data.sourceHandles.push(s_handle_Id)
                    nodeMap[ch.id].data.targetHandles.push(t_handle_Id)
                    edges.push({
                        id: `e_s-${node.id}_t-${ch.id}`,
                        source: node.id,
                        target: ch.id,
                        sourceHandle: s_handle_Id,
                        targetHandle: t_handle_Id,
                        type: 'customEdge',
                        data: {conn_color: ch.conn_color},
                    })
                })
            }
        }
    })    
    console.log('...edges', {nodeMap,edges})
    return {edges, nodes: Object.values(nodeMap)}
}
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
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
    const {nodes, edges}= parseNodes(data.nodes)
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