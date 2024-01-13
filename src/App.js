import AggregatedView from './components/reactflow/AggregatedView';

// import Header from './components/Header';
// import ViewOptions from './components/ViewOptions';
// import ToolBar from './components/ToolBar';
import DynamicFlow from './components/reactflow/dynamicFlow';
import './App.css';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexWrap: 'wrap' }}>
      {/* <AggregatedView /> */}
      <DynamicFlow />
    </div>
  );
}

export default App;
