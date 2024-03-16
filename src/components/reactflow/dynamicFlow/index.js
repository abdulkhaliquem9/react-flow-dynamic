import { useEffect, useState } from 'react'
import DynamicView from "./dynamicFlow";
import FacePlateView from './facePlateView'
import faceplateData from './facetPlate'
import aggregatedJSON from './aggregated.json'
import { parseNodes, parseAggregatedData, parseFacePlateData } from './parsers'
import { sampleNodeData } from './sampleData';

const AGGREGATED_VIEW = 'aggregatedView';
const FACEPLATE_VIEW = 'faceplateView';
const DETAILED_VIEW = 'detailedView'

async function getAggregatedData () {
    const response = await aggregatedJSON
    const result = await parseAggregatedData(response);
    const parsedData = await parseNodes(result);
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
            const data = await getAggregatedData();
            // console.log('###', data)
            await setChartData({viewType: AGGREGATED_VIEW,  data})

            // const data = await getFacePlateViewData([])
            // await setChartData({viewType: FACEPLATE_VIEW,  data})

            setTimeout(() => {
                setLoader(false)
            }, 100);

            // await setChartData({viewType: AGGREGATED_VIEW, data:parseNodes(sampleNodeData.nodes)})
        } catch (error) {
            console.log('init error',error)
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
            }, 100);
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