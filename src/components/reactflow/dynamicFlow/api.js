import axios from 'axios';
import faceplateData from './facetPlate';
import aggregatedJSON from './aggregatedData.json';
import portMockData from './portMockData.json';

const LocalPath = 'http://localhost:3001';
const prodPath = 'https://10.181.4.221';

export const aggregatedService = async () => {
  try {
    let response = null;
    //  const url = `${LocalPath}/network/aggregate-view`;
    //  response = await axios.get(url)
    response = await aggregatedJSON;
    return response.data;
  } catch (error) {
    console.log('aggegatedService error', error);
  }
};

export const facePlateService = async (ids = [3, 4]) => {
  console.log(ids);
  try {
    let response = null;
    //  const url = `${LocalPath}/network/detailed-view`;
    //  response = await axios.post(url, {
    //     "list": ids
    // } )
    response = await faceplateData;
    // console.log('faceplate response',response.data)
    return response.data;
  } catch (error) {
    console.log('facePlateService error', error);
  }
};

export const detailInformationService = async (deviceId) => {
  console.log('detailInformationservice III ----', deviceId);
  try {
    let response = null;

    //  const url = `${LocalPath}/network/switch-info/${deviceId}`;
    //  response = await axios.get(url)
    response = await portMockData;
    // console.log('faceplate response',response.data)
    return response.data;
  } catch (error) {
    console.log('DetailInformationServiceerror', error);
  }
};
