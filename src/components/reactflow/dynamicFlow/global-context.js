import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { aggregatedService, facePlateService } from './../dynamic/api';
import {
  parseNodes,
  parseAggregatedData,
  parseFacePlateData,
} from './../dynamic/parsers';

const AGGREGATED_VIEW = 'aggregatedView';
const FACEPLATE_VIEW = 'faceplateView';
const DETAILED_VIEW = 'detailedView';

export const GlobalStateDataContext = createContext();

const GlobalStateDataProvider = ({ children }) => {
  // dynamic view state
  const [isLoading, setLoader] = useState(false);
  const [chartData, setChartData] = useState({}); // {viewtype: AGGREGATED_VIEW, data: {nodes, edges}}
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isViewMore, setIsViewMore] = useState(false);
  const [deviceData, setDeviceData] = useState({});
  const [backBones, setBackBones] = useState([]);
  const [selectedBackbone, setSelectedBackbone] = useState(null); //stores the id of backbone clicked in faceplate
  const [selectedAgregatedDevice, setSelectedAggregatedDevice] = useState(null);
  const [fteCommunityName, setFteCommunityName] = useState(null);
  const [burgerMenuRawData, setBurgerMenuRawData] = useState({});
  const [burgerMenuData, setBurgerMenuData] = useState([]);
  // const [selected]
  // dynamic view state

  //faceplate view state
  const [showChart, setShowChart] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [charstData, setChartsData] = useState({});
  const [facePlateData, setFacePlateData] = useState([]);
  const [nodeTypesState, setNodeTypes] = useState({});
  const [edgeTypesState, setEdgeTypes] = useState({});
  //faceplate view state

  const parseBurgerViewMenuData = (data = {}) => {
    const burgerMenuNestedList = [];
    console.log('parse burger menu', data);
    const reccursiveParser = (el, value) => {
      console.log('rec', el, value);
      let item = { label: el, list: [] };
      if (Array.isArray(el)) {
      } else if (typeof el === 'object' && Object.keys(el).length) {
        console.log('-----', el);
      }
      burgerMenuNestedList.push(item);
    };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((d) => {
        // console.log('....',d,data[d])
        reccursiveParser(d, data[d]);
      });
    }
  };

  async function getAggregatedData() {
    const response = await aggregatedService(); // aggregatedService()

    const {
      breadcrumb = '',
      aggregateViewData = {},
      deviceCategoryDict = {},
    } = await response;
    await setFteCommunityName(breadcrumb);
    await setBurgerMenuRawData(deviceCategoryDict);
    const parsedBurgerMenuData = parseBurgerViewMenuData(deviceCategoryDict);
    setBurgerMenuData(parsedBurgerMenuData);
    console.log('aggregated response', response);
    const result = await parseAggregatedData({
      aggregateViewData,
      setBurgerMenuRawData,
    });
    const parsedData = await parseNodes(result);
    return parsedData;
  }

  async function getFacePlateViewData(ids = []) {
    console.log('getFacePlate for ids', ids);
    if (Array.isArray) {
      const response = await facePlateService(ids);
      console.log('getFacePlate ', response);
      const parsedData = parseFacePlateData(response);
      console.log('parsed faceplate data', parsedData);
      return parsedData;
    }
  }

  const init = async () => {
    try {
      setLoader(true);
      const data = await getAggregatedData();
      setChartData({ viewType: AGGREGATED_VIEW, data });
      setTimeout(() => {
        setLoader(false);
      }, 100);
      //   await setChartData({viewType: AGGREGATED_VIEW, data: parseNodes(sampleNodeData.nodes)})
      //   setLoader(false)
    } catch (error) {
      console.log('init errror', error);
    }
  };

  return (
    <GlobalStateDataContext.Provider
      value={{
        init,
        getAggregatedData,
        getFacePlateViewData,
        isLoading,
        setLoader,
        chartData,
        setChartData,
        isDrawerOpen,
        setIsDrawerOpen,
        isViewMore,
        setIsViewMore,
        deviceData,
        setDeviceData,
        backBones,
        setBackBones,
        selectedBackbone,
        setSelectedBackbone,
        selectedAgregatedDevice,
        setSelectedAggregatedDevice,
        fteCommunityName,
        setFteCommunityName,
        burgerMenuRawData,
        setBurgerMenuRawData,
        isBurgerMenuOpen,
        setIsBurgerMenuOpen,

        showChart,
        setShowChart,
        isExpanded,
        setExpanded,
        charstData,
        setChartsData,
        facePlateData,
        setFacePlateData,
        nodeTypesState,
        setNodeTypes,
        edgeTypesState,
        setEdgeTypes,
      }}
    >
      {children}
    </GlobalStateDataContext.Provider>
  );
};

export default GlobalStateDataProvider;
