import axios from "axios";

// 기업마당 API 설정
const bizinfoApi = axios.create({
  baseURL: "https://www.bizinfo.go.kr/uss/rss",
  timeout: 10000,
});

// 공공데이터포털 API 설정
const dataGoKrApi = axios.create({
  baseURL: "https://apis.data.go.kr/1130000/SmallBusiness_PolicyInfo",
  timeout: 10000,
});

export { bizinfoApi, dataGoKrApi };
