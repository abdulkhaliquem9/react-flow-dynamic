import React, { useState } from 'react';
import {
  getSmoothStepPath,
} from 'reactflow';

import './customEdge.css';

const onEdgeClick = (evt) => {
  evt.stopPropagation();
  console.log(`remove `);
};

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    ...restProps
  } = props;
  const [beingHovered, setHoveringState] = useState(false);
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  // console.log('cccustom egde', props)
  const onMouseOver = () => {
    // console.log('edge hovering...')
    setHoveringState(true);
  };
  const onMouseOut = () => {
    // console.log('edge hovered')
    setHoveringState(false);
  };
  const path = (
    <>
      <path
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onEdgeClick}
        style={style}
        className="react-flow__edge-path-selector"
        d={edgePath}
        markerEnd={markerEnd}
        fillRule="evenodd"
      />
      <path
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onEdgeClick}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        fillRule="evenodd"
      />
    </>
  );
  const hoveredPath = (
    <>
      <path
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onEdgeClick}
        style={{ ...style, strokeWidth: 4 }}
        className="react-flow__edge-path-selector"
        d={edgePath}
        markerEnd={markerEnd}
        fillRule="evenodd"
      />
      <path
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onEdgeClick}
        style={{ ...style, strokeWidth: 4 }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        fillRule="evenodd"
      />
    </>
  );
  return beingHovered ? hoveredPath : path;
}
