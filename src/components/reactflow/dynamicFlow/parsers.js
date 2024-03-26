import { v4 as uuidv4 } from 'uuid';
import imageMap from './imageMap';
// import {
//   fetchAllAggregatedFacePlates,
//   generateFacePlatesList,
//   getFacePlateData,
// } from './burgerParsing';

const BACKBONE_CONN_COLOR = 'brown';

export const parseNodes = (nodesData = []) => {
  const nodes = [...nodesData];
  let x_gap = 60;
  let y_gap = 150;
  const levels = {};
  nodes.forEach((node, i) => {
    if (!levels[node.level]) {
      levels[node.level] = [];
    }
    levels[node.level].push(node);
  });
  const levelKeys = Object.keys(levels);
  for (let x = levelKeys.length; x >= 1; x--) {
    if (x === 1 || x === '1') {
      // console.log('x', x)
      let start_x = 0;
      let level2_x = 0;
      if (levels[x + 1]) {
        const temp = [...levels[x + 1]];
        if (temp.length > 0) {
          temp.sort((a, b) => {
            // console.log('..',a,b)
            return b.position.x - b.position.x;
          });
          // capture the last (greatest) x co-ordinate in level 1
          if (temp.length > 2) {
            level2_x =
              (temp[0].position.x + temp[temp.length - 2].position.x) / 2;
          } else if (temp.length === 2) {
            level2_x = (temp[0].position.x + temp[1].position.x) / 2;
          } else {
            // temp.length===1
            level2_x = temp[0].position.x;
          }
          // console.log('temp', temp, level2_x);
          // level2_x =  temp.length > 2 ? ((temp[0].position.x + temp[temp.length - 2].position.x) / 2) :  (temp.length ===1 ? temp[0].position.x : ((temp[0].position.x +temp[1].position.x )/2))
        }
        // console.log('x + 1', x+1, temp, level2_x, '---', (temp[0].position.x  + ((temp[0].position.x + temp[temp.length - 2].position.x) / 2)))
      }
      start_x = level2_x;
      // console.log('start_x', start_x)
      levels[x].forEach((el, i) => {
        if (!levels[x][i].data) {
          levels[x][i].data = {};
        }
        levels[x][i].data.label = levels[x][i].id;
        // start_x += (levels[x][i].child.length === 0 ? 1 : levels[x][i].child.length) * 10;
        levels[x][i].position = {
          // x: ((levels[levelKeys.length].length / 2) * x_gap) + (i*100),
          x: start_x + i * 100,
          y: parseInt(levels[x][i].level) * y_gap,
        };
      });
    }
    if (levels[x - 1]) {
      levels[x - 1].forEach((el, eli) => {
        let start_x = 0;
        let length = levels[x].length;
        // console.log('x-1',x-1,el.id, levels[x].length,  levels[x-1][eli].child.length)
        if (levels[x]) {
          levels[x].forEach((n, ni) => {
            if (!levels[x][ni].data) {
              levels[x][ni].data = {};
            }
            if (!levels[x][ni].position) {
              levels[x][ni].position = {};
            }
            start_x +=
              (levels[x][ni].child.length <= 1
                ? 2
                : levels[x][ni].child.length) * x_gap;
            levels[x][ni].data.label = levels[x][ni].id;
            levels[x][ni].position.x = start_x;
            levels[x][ni].position.y = parseInt(levels[x][ni].level) * y_gap;
          });
        }
      });
    }
  }
  let nodeData = [];
  Object.keys(levels).forEach((key) => {
    nodeData = [...nodeData, ...levels[key]];
  });
  nodeData = nodeData.map((n) => ({ ...n, type: 'customNode' }));
  const result = generateEdges(nodeData);
  // console.log('result', result)
  return result;
};

export const generateEdges = (nodesData = []) => {
  // console.log('generateEdges', nodesData)
  const nodes = [...nodesData];
  // const imageMap = {
  //     'BACKBONE': require('./../icons/SWITCH.png'),
  //     'SWITCH': require('./../icons/SWITCH.png'),
  //     'SERVER': require('./../icons/SWITCH.png'),
  //     'CNM': require('./../icons/SWITCH.png'),
  //     'FTE': require('./../icons/SWITCH.png'),
  //     'NON-FTE': require('./../icons/SWITCH.png'),
  // }
  const edges = [];
  const nodeMap = {};
  nodes.forEach((node, i) => {
    if (node.id) {
      // console.log('node',node)
      const data = { ...node.data, sourceHandles: [], targetHandles: [] };
      if (imageMap[node.deviceType]) {
        data.imgSrc = imageMap[node.deviceType];
        data.level = node.level;
      }
      nodeMap[node.id] = { ...node, edges: [], data };
    }
  });

  nodes.forEach((node, i) => {
    if (node.id) {
      if (Array.isArray(node.child)) {
        node.child.forEach((ch, ch_i) => {
          const edgeId = `e-${uuidv4()}`;
          const t_handle_Id =
            ch.conn_color === BACKBONE_CONN_COLOR
              ? `t-right-${node.id}`
              : `t-${node.id}`;
          const s_handle_Id =
            ch.conn_color === BACKBONE_CONN_COLOR
              ? `s-left-${ch.id}`
              : `s-${ch.id}`;
          // console.log({edgeId, node: nodeMap[node.id], childNode: nodeMap[ch]})
          nodeMap[node.id].data.sourceHandles.push(s_handle_Id);
          nodeMap[ch.id].data.targetHandles.push(t_handle_Id);
          edges.push({
            id: `e_s-${node.id}_t-${ch.id}`,
            source: node.id,
            target: ch.id,
            sourceHandle: s_handle_Id,
            targetHandle: t_handle_Id,
            type: 'customEdge',
            data: { conn_color: ch.conn_color || 'gray' },
          });
        });
      }
    }
  });
  // console.log('...edges', {nodeMap,edges})
  // return {edges, nodes: Object.values(nodeMap)}
  /**
   * el.label is for Aggregated data & el.id is for detailed data
   */
  return {
    edges,
    nodes: Object.values(nodeMap).map((el) => ({
      ...el,
      data: { ...el.data, label: el.label || `${el.deviceType}-${el.id}` },
    })),
  };
};

export const parseAggregatedData = async ({
  aggregateViewData: d = {},
  l = 1,
  setBurgerMenuRawData,
}) => {
  const nodes = [];

  function reccursiveFunction(data = {}, _level = l, _id) {
    const dataObj = { ...data };
    let level = _level;
    if (
      dataObj &&
      Array.isArray(dataObj.deviceIds) &&
      dataObj.deviceIds.length > 0
    ) {
      const { deviceType, childIds = [], child = [], deviceIds, id } = dataObj;
      const nodeEl = {
        id,
        deviceIds,
        deviceType,
        label: `${deviceType} (${deviceIds.length})`,
        level: `${level}`,
        child: dataObj.child.map((ch) => ({
          id: ch.id,
          level: `${level + 1}`,
        })),
      };
      nodes.push(nodeEl);
      if (Array.isArray(dataObj.child)) {
        dataObj.child.forEach((chObj) => {
          reccursiveFunction(chObj, level + 1);
        });
      }
      // console.log('......', nodeEl)
    }
  }

  reccursiveFunction(d, l);
  // await console.log('Nodes--', { nodes });
  // const nodesData = await fetchAllAggregatedFacePlates(nodes)
  // setBurgerMenuRawData(nodesData || [])
  // console.log('---Burger Ui parsing--', { nodesData});
  // return nodesData;
  return nodes;
};

export const parseFacePlateData = (data) => {
  console.log('parseFacePlateData ---', data);
  const facePlates = [];
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((el, i) => {
      if (Array.isArray(el) && el.length > 0) {
        const facePlateData = [];
        el.forEach((dataObj, dataObjIndex) => {
          // The first object in the array will be the parent and the rest are childs, so the arraay should have atleast 2 objeacts i.e, 1 parent and child
          const [parent, ...child] = dataObj;
          const { device_id, sub_device_type } = parent;

          // first array
          facePlateData.push({
            id: `${device_id}`,
            deviceType: sub_device_type,
            level: '1',
            child: (child || []).map((ch) => ({
              id: `${ch.device_id}`,
              isConnected: true,
              conn_color: dataObjIndex === 0 ? '#ffc300' : '#1EDE38',
            })),
          });
          child.forEach((ch) => {
            const foundIndex = facePlateData.findIndex((el) => {
              // console.log('finding', el, ch)
              return el.id === `${ch.device_id}`;
            });
            // console.log(`found Index of ${ch.device_id} at`, foundIndex)
            //avoid duplicate pushing of node
            if (foundIndex < 0) {
              facePlateData.push({
                id: `${ch.device_id}`,
                deviceType: ch.sub_device_type,
                level: '2',
                child: [],
              });
            }
          });
          // console.log(i, {dataObj, parent, child})

          //second array -> If second backbone data exist then make the first child (backbone) of second array as child of first array backbone
          if (
            dataObjIndex === 0 &&
            data[i] &&
            Array.isArray(data[i][1]) &&
            data[i][1][0]
          ) {
            // console.log('check second backbone exist', data[i][1][0], facePlateData)
            const { device_id } = data[i][1][0];
            if (device_id) {
              facePlateData[0].child.push({
                id: `${device_id}`,
                conn_color: BACKBONE_CONN_COLOR,
                isConnected: true,
              });
            }
          }
        });
        facePlates.push(facePlateData);
        // facePlateData.push(facePlateDataObj)
      }
    });
  }
  // return facePlates
  return facePlates.map((d) => parseNodes(d));
};
