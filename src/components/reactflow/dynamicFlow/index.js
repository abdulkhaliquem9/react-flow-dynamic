import { useEffect, useState } from 'react'
import DynamicView from "./dynamicFlow";
import FacePlateView from './facePlateView'
import faceplateData from './facetPlate'
import aggregatedJSON from './Amya.json'
import { parseNodes, parseAggregatedData, parseFacePlateData } from './parsers'
import { sampleNodeData } from './sampleData';

const AGGREGATED_VIEW = 'aggregatedView';
const FACEPLATE_VIEW = 'faceplateView';
const DETAILED_VIEW = 'detailedView'

function getAggregatedData () {
    const response = aggregatedJSON
    const parsedData = parseNodes(parseAggregatedData(response));
    return parsedData
}
function getFacePlateViewData (ids=[]) {
    console.log('getFacePlate for ids', ids)
    if(Array.isArray){
        console.log('getFacePlate ', faceplateData)
        const response = faceplateData
        const parsedData = parseFacePlateData(response)
        console.log('parsed faceplate data', parsedData)
        return parsedData
    }
}

export default (props) => {
    const [isLoading, setLoader] = useState(false)
    const [chartData, setChartData] = useState({})
    const init = async () => {
        try {
            setLoader(true)
            const data = getAggregatedData();
            
            await setChartData({viewType: AGGREGATED_VIEW,  data})
            setTimeout(() => {
                setLoader(false)
            }, 2000);

            // await setChartData(parseNodes(sampleNodeData.nodes))
        } catch (error) {

        }
    }
    useEffect(() => {
        init()
    }, [])
    const handleNodeClick = async (event, node) => {
        const {deviceIds = []} = node
        console.log('click node', {event, node, deviceIds})
        if(chartData.viewType === AGGREGATED_VIEW){
            setLoader(true)
            const data = await getFacePlateViewData(deviceIds)
            await setChartData({viewType: FACEPLATE_VIEW,  data})
            setTimeout(() => {
                setLoader(false)
            }, 2000);
        }
    };
    if(isLoading){
        return null
    }
    if (chartData && chartData.viewType === AGGREGATED_VIEW) {
        return (
            <DynamicView viewType={chartData.viewType} data={chartData} onNodeClick={handleNodeClick}/>
        )
    } else if (chartData && chartData.viewType === FACEPLATE_VIEW) {
        return (
            <FacePlateView viewType={chartData.viewType} data={chartData} onNodeClick={handleNodeClick}/>
        )
    }
    else {
        return <div>Loading...</div>
    }
}