import React from 'react';
import { Handle, Position } from 'reactflow';

export function CustomNode({
  data,
  isConnectable,
  onMouseOver = null,
  onMouseOut = null,
  ...rest
}) {
  // console.log('... CustomNode1',data, rest)
  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ ...data.style, height: 'fit-content' }}
    >
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Left} id="left" />

      <Handle type="target" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Right} id="right" />
      <span>{data.label}</span>

      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Top} id="top" />

      <Handle type="target" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      {data.image && (
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img width={data.image_width} src={data.image} />
        </span>
      )}
    </button>
  );
}

export function CustomMultiConnectNode({
  data,
  isConnectable,
  onMouseOver = null,
  onMouseOut = null,
  ...rest
}) {
  // console.log('... CustomMultiConnectNode',data, rest)
  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{
        padding: 5,
        width: '140px',
        border: '1px solid black',
        borderRadius: 3,
        backgroundColor: 'white',
      }}
    >
      {data.label}
      <Handle
        type="target"
        position={Position.Top}
        id="g-target"
        style={{ left: '40%', background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="g-source"
        style={{ left: '40%', background: '#555' }}
      />

      <Handle
        type="target"
        position={Position.Top}
        id="y-target"
        style={{ left: '60%', background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="y-source"
        style={{ left: '60%', background: '#555' }}
      />
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img width={data.image_width} src={data.image} />
      </span>
    </button>
  );
}
