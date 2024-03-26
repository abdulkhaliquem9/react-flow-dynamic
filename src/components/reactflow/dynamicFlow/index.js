import { useEffect, useState, memo } from 'react'
import DynamicView from "./dynamicFlow";
import FacePlateView from './facePlateView'
import faceplateData from './facetPlate'
import aggregatedJSON from './aggregated.json'
import { parseNodes, parseAggregatedData, parseFacePlateData } from './parsers'
import { sampleNodeData } from './sampleData';
import { v4 } from 'uuid'
import './index.css'
const AGGREGATED_VIEW = 'aggregatedView';
const FACEPLATE_VIEW = 'faceplateView';
const DETAILED_VIEW = 'detailedView'

function parseMenuData(menuRawData) {
    const menuList = []
    function reccursiveFunction(data, parentId) {
        if (Array.isArray(data) && data.length > 0) {
            return data.map(el => {
                const id = v4();
                return { label: el.label, id, parentId, child: el.child.map(chel => ({ label: chel.run_device_name, parentId: id, ...chel })) }
            })
        } else if (typeof data === 'object' && Object.keys(data).length > 0) {
            return reccursiveFunction(Object.keys(data).map(el => ({ label: el, parentId, id: v4(), child: data[el] })), parentId)
        }
    }

    if (typeof menuRawData === 'object' && Object.keys(menuRawData).length > 0) {
        Object.keys(menuRawData).forEach(el => {
            const id = v4();
            const obj = { label: el, id, child: [] }
            const child = reccursiveFunction(menuRawData[el], id)
            obj.child = child
            menuList.push(obj)
        })
    }
    console.log('menuList', menuList)
    return menuList
}

async function getAggregatedData() {
    const response = await aggregatedJSON
    // console.log('response',response.data.deviceCategoryDict)
    const burgerMenuData = parseMenuData(response.data.deviceCategoryDict)
    const result = await parseAggregatedData(response.data);
    const parsedData = await parseNodes(result);
    return { aggregatedData: parsedData, burgerMenuData }
}
function getFacePlateViewData(ids = []) {
    console.log('getFacePlate for ids', ids)
    if (Array.isArray) {
        console.log('getFacePlate ', faceplateData)
        const response = faceplateData
        const parsedData = parseFacePlateData(response)
        // console.log('parsed faceplate data', parsedData)
        return parsedData
    }
}


const SectionList = (props => {
    const { onMenuItemClick, selectedIds=[] } = props
    
    // console.log('section list', props.menuList)
    if (!props.menuList)
        return null

    return (
        <>
            {
                (props.menuList ||[]).map(item => {
                    const foundIndex = item.id && selectedIds ? selectedIds.findIndex(el => el===item.id) : -1
                    const isOpen = foundIndex >= 0 
                    // console.log('mmm', isOpen)
                    return (
                    <ul className={`section-list-ul`} key={item.id} onClick={(e) => onMenuItemClick(e,item)}>
                        <span>
                            {
                               item.id && isOpen ? <svg xmlns="http://www.w3.org/2000/svg"
                                fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
                                    <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394  l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393  C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
                                </svg>
                            : (item.id && <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
                                    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                                </svg>)
                            }
                            {item.label}
                            </span>
                        {item.child && <li  key={item.id} className={`section-list-li ${isOpen ? 'item-open' : 'item-closed'}`}>
                            <SectionList  key={item.id} {...props} menuList={item.child} />
                        </li>}
                    </ul>
                )
            })
            }
        </>
    )
})

const BurgerMenu = (props => {
    // const { menuList } = props
    // const [menuListRawData, setMenuListRawData] = useState([])
    const [menuData, setMenuData] = useState([])
    const [selectedListItems, setSelectedListItems] = useState([])
    const [searchKey, setSearchKey] = useState("")
    useEffect(() => {
        // setMenuListRawData(props.menuList || [])
        setMenuData(props.menuList || [])
    }, [props.menuList])
    const onMenuItemClick = (e,item) => {
       e.stopPropagation()
       if(item.id){
           const selectedIds = [...selectedListItems]
           const foundIndex = item.id && selectedIds ? selectedIds.findIndex(el => el === item.id) : -1;
           console.log('menu clicked',item, foundIndex)
            if(foundIndex < 0){
                selectedIds.push(item.id)
            }else {
                selectedIds.splice(foundIndex, 1)
            }
            setSelectedListItems(selectedIds)
       }else{
        console.log('call the faceplate api', item)
       }
    }
    useEffect(()=>{
        if(searchKey.length === 0){

        }
    }, [searchKey])
    const clearSearchKey = async () => {
        await setSearchKey("")
        // console.log('clear search key', searchKey, props.menuList, menuData)
        // await setMenuData(props.menuList)
    }
    const handleSearch = e => {
        const key = e.target.value || ""
        setSearchKey(key)
       
        // console.log('filtered', menuDataTemp)
        // setMenuData(menuDataTemp)
    }

    const filterMenuList = (key, menuItems)=>{
        const menuDataTemp =  [...menuItems]
         menuDataTemp.forEach((d, di) => {
            // console.log('d',d)
            if(Array.isArray(d.child)){
                d.child.forEach((sd,sdi)=>{
                    if(Array.isArray(sd.child)){
                        const filteredList = sd.child.filter(el => {
                            // console.log('...', el.label, key, el.label.toLowerCase().indexOf(key) >= 0)
                            return el.label.toLowerCase().indexOf(key.toLowerCase()) >= 0
                        })
                        menuDataTemp[di].child[sdi].child = filteredList
                    }
                })
            }
        })
        return menuDataTemp
    }

    const data = filterMenuList(searchKey, menuData)
    console.log('###', searchKey, data)
    return (
        <div className='menu-burger'>
            <div className='menu-search-bar'>
                <input type="text" value={searchKey} onChange={handleSearch}></input>
                <button onClick={clearSearchKey}>X</button>
            </div>
            <SectionList menuList={data} onMenuItemClick={onMenuItemClick} selectedIds={selectedListItems}/>
        </div>
    )
})


export default (props) => {
    const [isLoading, setLoader] = useState(false)
    const [chartData, setChartData] = useState({})
    const [menuList, setMenuList] = useState([])
    const init = async () => {
        try {
            setLoader(true)

            const data = await getAggregatedData();
            console.log('###', data)
            await setChartData({ viewType: AGGREGATED_VIEW, data: data.aggregatedData })
            setMenuList(data.burgerMenuData)

            // const data = await getFacePlateViewData([])
            // await setChartData({viewType: FACEPLATE_VIEW,  data})

            setTimeout(() => {
                setLoader(false)
            }, 100);

            // await setChartData({viewType: AGGREGATED_VIEW, data:parseNodes(sampleNodeData.nodes)})
        } catch (error) {
            console.log('init error', error)
        }
    }
    useEffect(() => {
        init()
    }, [])
    const handleNodeClick = async (event, node) => {
        const { deviceIds = [] } = node
        console.log('click node', { event, node, deviceIds })
        if (chartData.viewType === AGGREGATED_VIEW) {
            setLoader(true)
            const data = await getFacePlateViewData(deviceIds)
            await setChartData({ viewType: FACEPLATE_VIEW, data })
            setTimeout(() => {
                setLoader(false)
            }, 100);
        }
    };

    console.log('...', menuList)
    if (isLoading) {
        return null
    }
    if (chartData && chartData.viewType === AGGREGATED_VIEW) {
        return (
            <>

                <BurgerMenu menuList={menuList} />
                <DynamicView viewType={chartData.viewType} data={chartData} onNodeClick={handleNodeClick} />
            </>
        )
    } else if (chartData && chartData.viewType === FACEPLATE_VIEW) {
        return (
            <>

                <BurgerMenu menuList={menuList} />
                <FacePlateView viewType={chartData.viewType} data={chartData} onNodeClick={handleNodeClick} />
            </>
        )
    }
    else {
        return <div>Loading...</div>
    }
}