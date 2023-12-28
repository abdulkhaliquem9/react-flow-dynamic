import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
export const initialNodes = [
  {
    id: 'AA01',
    data: {
      chart: 'aggregated',
      label: 'BackBone Switches(2) AA01',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SWITCH.png'),
      image_width: '30px',
    },
    type: 'customNode',
    position: { x: 0, y: 0 },
    // style: { background:'#DAF7A6', },
    level: '1',
  },
  {
    id: 'AA02',
    data: {
      chart: 'aggregated',
      label: 'Switches(6) AA02',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SWITCH.png'),
      image_width: '30px',
    },
    position: { x: -200, y: 100 },
    type: 'customNode',
    level: '2',
  },
  {
    id: 'AA03',
    data: {
      chart: 'aggregated',
      label: 'FTE (10) AA03',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    position: { x: 0, y: 100 },
    type: 'customNode',
    level: '2',
  },
  {
    id: 'AA04',
    data: {
      chart: 'aggregated',
      label: 'CNMs(2) AA04',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/CNM.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: 200, y: 100 },
    level: '2',
  },
  {
    id: 'AA05',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE (2) AA05',
    },
    position: { x: 400, y: 100 },
    level: '2',
  },

  {
    id: 'AA06',
    data: {
      chart: 'aggregated',
      label: 'Switches(4) AA06',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SWITCH.png'),
      image_width: '30px',
    },
    position: { x: -1000, y: 200 },
    type: 'customNode',
    level: '3',
  },
  {
    id: 'AA07',
    data: {
      chart: 'aggregated',
      label: 'FTE (10) AA07',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    position: { x: -800, y: 200 },
    type: 'customNode',
    level: '3',
  },
  {
    id: 'AA08',
    data: {
      chart: 'aggregated',
      label: 'CF9s(6) AA08',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/CF9(Non-Redundant).png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -600, y: 200 },
    level: '3',
  },
  {
    id: 'AA09',
    data: {
      chart: 'aggregated',
      label: 'CNMs(2) AA09',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/CNM.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -400, y: 200 },
    level: '3',
  },
  {
    id: 'AA10',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE(2) AA10',
    },
    position: { x: -200, y: 200 },
    level: '3',
  },
  {
    id: 'AA11',
    data: {
      chart: 'aggregated',
      label: 'FTE (10) AA11',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -1400, y: 300 },
    level: '4',
  },
  {
    id: 'AA12',
    data: {
      chart: 'aggregated',
      label: 'CNMs(2) AA12',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/CNM.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -1200, y: 300 },
    level: '4',
  },
  {
    id: 'AA13',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE(2) AA13',
    },
    position: { x: -1000, y: 300 },
    style: { background: '#34EB80' },
    level: '4',
  },
  {
    id: 'AA14',
    data: {
      chart: 'aggregated',
      label: 'FTE (2) AA14',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -800, y: 300 },
    level: '4',
  },
  {
    id: 'AA15',
    data: {
      chart: 'aggregated',
      label: 'FTE (10) AA15',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -600, y: 300 },
    level: '4',
  },
  {
    id: 'AA16',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE (2) AA16',
    },
    position: { x: -400, y: 300 },
    level: '4',
  },
  {
    id: 'AA17',
    data: {
      chart: 'aggregated',
      label: 'FTE (10) AA17',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -200, y: 300 },
    level: '4',
  },
  {
    id: 'AA18',
    data: {
      chart: 'aggregated',
      label: 'CNMs(2) AA18',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/CNM.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -0, y: 300 },
    level: '4',
  },
  {
    id: 'AA19',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE (2) AA19',
    },
    position: { x: 250, y: 300 },
    level: '4',
  },
  {
    id: 'AA20',
    data: {
      chart: 'aggregated',
      label: 'FTE (2) AA20',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -1200, y: 400 },
    level: '5',
  },
  {
    id: 'AA21',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE (2) AA21',
    },
    position: { x: -1000, y: 400 },
    level: '5',
  },
  {
    id: 'AA22',
    data: {
      chart: 'aggregated',
      label: 'FTE (2) AA22',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -700, y: 400 },
    level: '5',
  },
  {
    id: 'AA23',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE (2) AA23',
    },
    position: { x: -500, y: 400 },
    level: '5',
  },
  {
    id: 'AA24',
    data: {
      chart: 'aggregated',
      label: 'FTE (2) AA24',
      style: {
        width: 'fit-content',
        height: '40px',
        borderRadius: '3px',
        backgroundColor: 'white',
      },
      image: require('./icons/SERVER.png'),
      image_width: '15px',
    },
    type: 'customNode',
    position: { x: -100, y: 400 },
    level: '5',
  },
  {
    id: 'AA25',
    data: {
      chart: 'aggregated',
      label: 'Non-FTE (2) AA25',
    },
    position: { x: 100, y: 400 },
    level: '5',
  },
];

export const initialEdges = [
  {
    id: 'e001',
    source: 'AA01',
    target: 'AA02',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
    // style: {
    //   strokeWidth: 2,
    //   stroke: '#FF0072',
    // },
    // markerEnd: {
    //   type: MarkerType.ArrowClosed,
    //   width: 10,
    //   height: 10,
    //   color: '#FF0072',
    // },
  },

  {
    id: 'e002',
    source: 'AA01',
    target: 'AA03',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e003',
    source: 'AA01',
    target: 'AA04',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e004',
    source: 'AA01',
    target: 'AA05',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e005',
    source: 'AA02',
    target: 'AA06',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e006',
    source: 'AA02',
    target: 'AA07',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e0062',
    source: 'AA02',
    target: 'AA08',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e007',
    source: 'AA02',
    target: 'AA09',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e008',
    source: 'AA02',
    target: 'AA10',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e009',
    source: 'AA06',
    target: 'AA11',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e0010',
    source: 'AA06',
    target: 'AA12',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e011',
    source: 'AA06',
    target: 'AA13',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e012',
    source: 'AA06',
    target: 'AA16',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e013',
    source: 'AA08',
    target: 'AA14',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e014',
    source: 'AA09',
    target: 'AA15',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e015',
    source: 'AA04',
    target: 'AA17',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e016',
    source: 'AA04',
    target: 'AA18',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e017',
    source: 'AA04',
    target: 'AA19',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e018',
    source: 'AA12',
    target: 'AA20',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e019',
    source: 'AA12',
    target: 'AA21',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e020',
    source: 'AA18',
    target: 'AA24',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e021',
    source: 'AA18',
    target: 'AA25',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e022',
    source: 'AA13',
    target: 'AA22',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
  {
    id: 'e023',
    source: 'AA13',
    target: 'AA23',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customEdge',
  },
];

// export const initialNodesOne = [
//   {
//     id: 'AA01',
//     data: {
//       chart: 'aggregated',
//       label: 'BackBone Switches(2) AA01',
//       style: {width: 'fit-content', height: '40px', borderRadius: '3px', backgroundColor:'white'},
//       image: require('./icons/SWITCH.png'),
//       image_width:'30px'
//     },
//     position: { x: 0, y: 0 },
//     type: 'customNode',
//     // style: { background:'#DAF7A6', },
//     level :'1'
//   },
//   {
//     id: 'AA02',
//     data: {
//       chart: 'aggregated',
//       label: 'Switches(6) AA02',
//     },
//     position: { x: -200, y: 100 },
//     style: { background:'#34EB80' },
//     level :'2'
//   },
//   {
//     id: 'AA03',
//     data: {
//       chart: 'aggregated',
//       label: 'FTE (10) AA03',
//     },
//     position: { x: 0, y: 100 },
//     level :'2'
//   },
//   {
//       id: 'AA04',
//       data: {
//         chart: 'aggregated',
//         label: 'CNMs(2) AA04',
//       },
//       position: { x: 200, y: 100 },
//       level :'2'
//     },
//     {
//       id: 'AA05',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE (2) AA05',
//       },
//       position: { x: 400, y: 100 },
//       level :'2'
//     },

//     {
//       id: 'AA06',
//       data: {
//         chart: 'aggregated',
//         label: 'Switches(4) AA06',
//       },
//       position: { x: -1000, y: 200 },
//       style: { background:'#34EB80' },
//       level :'3'
//     },
//     {
//       id: 'AA07',
//       data: {
//         chart: 'aggregated',
//           label: 'FTE (10) AA07',
//       },
//       position: { x: -800, y: 200 },
//       level :'3'
//     },
//     {
//       id: 'AA08',
//       data: {
//         chart: 'aggregated',
//           label: 'CF9s(6) AA08',
//       },
//       position: { x: -600, y: 200 },
//       level :'3'
//     },
//     {
//       id: 'AA09',
//       data: {
//         chart: 'aggregated',
//           label: 'CNMs(2) AA09',
//       },
//       position: { x: -400, y: 200 },
//       level :'3'
//     },
//     {
//       id: 'AA10',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE(2) AA10',
//       },
//       position: { x: -200, y: 200 },
//       level :'3'
//     },
//     {
//       id: 'AA11',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (10) AA11',
//       },
//       position: { x: -1400, y: 300},
//       level :'4'
//     },
//     {
//       id: 'AA12',
//       data: {
//         chart: 'aggregated',
//         label: 'CNMs(2) AA12',
//       },
//       position: { x: -1200, y: 300},
//       level :'4'
//     },
//     {
//       id: 'AA13',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE(2) AA13',
//       },
//       position: { x: -1000, y: 300},
//       style: { background:'#34EB80' },
//       level :'4'

//     },
//     {
//       id: 'AA14',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (2) AA14',
//       },
//       position: { x: -800, y: 300},
//       level :'4'

//     },
//     {
//       id: 'AA15',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (10) AA15',
//       },
//       position: { x: -600, y: 300},
//       level :'4'

//     },
//     {
//       id: 'AA16',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE (2) AA16',
//       },
//       position: { x: -400, y: 300},
//       level :'4'

//     },
//     {
//       id: 'AA17',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (10) AA17',
//       },
//       position: { x: -200, y: 300},
//       level :'4'

//     },
//     {
//       id: 'AA18',
//       data: {
//         chart: 'aggregated',
//         label: 'CNs(2) AA18',
//       },
//       position: { x: -0, y: 300},
//       level :'4'

//     },
//     {
//       id: 'AA19',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE (2) AA19',
//       },
//       position: { x: 250, y: 300},
//       level :'4'

//     },
//     {
//       id: 'AA20',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (2) AA20',
//       },
//       position: { x: -1200, y: 400},
//       level :'5'

//     },
//     {
//       id: 'AA21',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE (2) AA21',
//       },
//       position: { x: -1000, y: 400},
//       level :'5'

//     },
//     {
//       id: 'AA22',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (2) AA22',
//       },
//       position: { x: -700, y: 400},
//       level :'5'

//     },
//     {
//       id: 'AA23',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE (2) AA23',
//       },
//       position: { x: -500, y: 400},
//       level :'5'

//     },
//     {
//       id: 'AA24',
//       data: {
//         chart: 'aggregated',
//         label: 'FTE (2) AA24',
//       },
//       position: { x: -100, y: 400},
//       level :'5'

//     },
//     {
//       id: 'AA25',
//       data: {
//         chart: 'aggregated',
//         label: 'Non-FTE (2) AA25',
//       },
//       position: { x: 100, y: 400},
//       level :'5'

//     },

// ]

// export const  initialEdgesOne = [
//   {
//       id: 'e001',
//       source: 'AA01',
//       target: 'AA02',
//       sourceHandle: 'bottom',
//       targetHandle: 'top',
//       type: 'customEdge'
//       // style: {
//       //   strokeWidth: 2,
//       //   stroke: '#FF0072',
//       // },
//       // markerEnd: {
//       //   type: MarkerType.ArrowClosed,
//       //   width: 10,
//       //   height: 10,
//       //   color: '#FF0072',
//       // },
//   },

//   {
//       id:'e002',
//       source:'AA01',
//       target: 'AA03',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e003',
//       source:'AA01',
//       target: 'AA04',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e004',
//       source:'AA01',
//       target: 'AA05',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e005',
//       source:'AA02',
//       target: 'AA06',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e006',
//       source:'AA02',
//       target: 'AA07',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e0062',
//       source:'AA02',
//       target: 'AA08',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e007',
//       source:'AA02',
//       target: 'AA09',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e008',
//       source:'AA02',
//       target: 'AA10',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e009',
//       source:'AA06',
//       target: 'AA11',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e0010',
//       source:'AA06',
//       target: 'AA12',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//       id:'e011',
//       source:'AA06',
//       target: 'AA13',
//       sourceHandle:'bottom',
//       targetHandle:'top',
//       type:'customEdge'

//   },
//   {
//     id:'e012',
//     source:'AA06',
//     target: 'AA16',
//     sourceHandle:'bottom',
//     targetHandle:'top',
//     type:'customEdge'

// },
// {
//   id:'e013',
//   source:'AA08',
//   target: 'AA14',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e014',
//   source:'AA09',
//   target: 'AA15',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e015',
//   source:'AA04',
//   target: 'AA17',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e016',
//   source:'AA04',
//   target: 'AA18',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e017',
//   source:'AA04',
//   target: 'AA19',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e018',
//   source:'AA12',
//   target: 'AA20',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e019',
//   source:'AA12',
//   target: 'AA21',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e020',
//   source:'AA18',
//   target: 'AA24',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e021',
//   source:'AA18',
//   target: 'AA25',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e022',
//   source:'AA13',
//   target: 'AA22',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },
// {
//   id:'e023',
//   source:'AA13',
//   target: 'AA23',
//   sourceHandle:'bottom',
//   targetHandle:'top',
//   type:'customEdge'

// },

// ]
