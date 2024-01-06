import { Handle, Position } from 'reactflow';
import './customNode.css'

export default function CustomNode(props) {
  const { id, data, ...rest } = props
    // console.log('node', props)
    const {label, imgSrc, sourceHandles = [], targetHandles = []} = data
    if(!imgSrc){
      return (
        <div className='node'>
          {
            sourceHandles.map((sh,i)=> (<Handle type="source" position={Position.Bottom} key={sh} id={sh} className='handle' style={{marginBottom: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          {
            targetHandles.map((th,i)=> (<Handle type="target" position={Position.Top} key={th} id={th} className='handle' style={{marginTop: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          {label}
        </div>
      );
    }else{
      return (
        <div className='node'>
          {
            sourceHandles.map((sh,i)=> (<Handle type="source" position={Position.Bottom} key={sh} id={sh} className='handle' style={{marginBottom: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          {
            targetHandles.map((th,i)=> (<Handle type="target" position={Position.Top} key={th} id={th} className='handle' style={{marginTop: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          <span>{label}</span>
          <img width={'40px'} height={'20px'} src={imgSrc} />
        </div>
      )
    }
  }