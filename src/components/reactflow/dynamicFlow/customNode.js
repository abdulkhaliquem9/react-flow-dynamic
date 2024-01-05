import { Handle, Position } from 'reactflow';

export default function CustomNode(props) {
  const { id, data, ...rest } = props
    // console.log('node', props)
    const {label, imgSrc, sourceHandles = [], targetHandles = []} = data
    if(!imgSrc){
      return (
        <div style={{backgroundColor:'white', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', border: '1px solid black', borderRadius: '3px', width: 'fit-content', minWidth: '50px', height: '50px', textAlign:'center'}}>
          {
            sourceHandles.map((sh,i)=> (<Handle type="source" position={Position.Bottom} key={sh} id={sh} style={{visibility: 'hidden', left: '25%', marginBottom: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          {
            targetHandles.map((th,i)=> (<Handle type="target" position={Position.Top} key={th} id={th} style={{visibility: 'hidden', left: '25%', marginTop: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          {label}
        </div>
      );
    }else{
      return (
        <div style={{backgroundColor:'white', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', border: '1px solid black', borderRadius: '3px', width: 'fit-content', minWidth: '50px', height: '50px', textAlign:'center'}}>
          {
            sourceHandles.map((sh,i)=> (<Handle type="source" position={Position.Bottom} key={sh} id={sh} style={{visibility: 'hidden', left: '25%', marginBottom: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          {
            targetHandles.map((th,i)=> (<Handle type="target" position={Position.Top} key={th} id={th} style={{visibility: 'hidden', left: '25%', marginTop: `${(i+1) * 3}px`, marginLeft: `${(i+1) * 3}px`}}/>))
          }
          <span>{label}</span>
          <img width={'40px'} height={'20px'} src={imgSrc} />
        </div>
      )
    }
  }