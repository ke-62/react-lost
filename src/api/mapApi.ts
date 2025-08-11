// /src/api/mapApi.ts
// 지도(Map) 관련 API 함수 모음

import apiClient from '.';
import { CampusBuilding, MapSummary } from '../types'; // types 폴더에 타입 정의 필요

// 캠퍼스 건물 목록 및 좌표 정보 조회
export const getLocations = () => {
  return apiClient.get<CampusBuilding[]>('/map/locations');
};

// 건물별 습득물 개수 요약 정보 조회
export const getMapSummary = () => {
  return apiClient.get<MapSummary[]>('/map/summary');
};