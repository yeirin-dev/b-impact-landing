"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { type Organization } from "@/data/organizations";

// 카카오맵 타입 선언
declare global {
  interface Window {
    kakao: typeof kakao;
    __bimpactSelectRegion?: (region: string) => void;
  }
}

declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
    setBounds(bounds: LatLngBounds): void;
    relayout(): void;
  }
  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }
  class LatLngBounds {
    constructor();
    extend(latlng: LatLng): void;
  }
  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
  }
  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
  }
  interface MapOptions {
    center: LatLng;
    level: number;
  }
  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    image?: MarkerImage;
  }
  interface CustomOverlayOptions {
    position: LatLng;
    content: string | HTMLElement;
    map?: Map;
    yAnchor?: number;
    xAnchor?: number;
  }
  class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions);
  }
  class Size {
    constructor(width: number, height: number);
  }
  interface MarkerImageOptions {
    offset?: Point;
  }
  class Point {
    constructor(x: number, y: number);
  }
  namespace event {
    function addListener(
      target: Marker | Map,
      type: string,
      handler: () => void
    ): void;
  }
  function load(callback: () => void): void;
}

// 부산 구군별 중심 좌표
const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  사상구: { lat: 35.1526, lng: 128.9910 },
  강서구: { lat: 35.2122, lng: 128.9802 },
  연제구: { lat: 35.1762, lng: 129.0799 },
  부산진구: { lat: 35.1631, lng: 129.0531 },
  동래구: { lat: 35.2057, lng: 129.0835 },
  북구: { lat: 35.1978, lng: 128.9903 },
  기장군: { lat: 35.2446, lng: 129.2224 },
  사하구: { lat: 35.1046, lng: 128.9750 },
  해운대구: { lat: 35.1631, lng: 129.1636 },
  금정구: { lat: 35.2427, lng: 129.0924 },
};

// 구군별 마커 색상
const DISTRICT_MARKER_COLORS: Record<string, string> = {
  사상구: "#7c3aed",
  강서구: "#059669",
  연제구: "#d97706",
  부산진구: "#0284c7",
  동래구: "#e11d48",
  북구: "#0d9488",
  기장군: "#4f46e5",
  사하구: "#ea580c",
  해운대구: "#0891b2",
  금정구: "#db2777",
};

interface BusanDistrictMapProps {
  organizations: Organization[];
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
}

interface DistrictMarkerData {
  district: string;
  marker: kakao.maps.Marker;
  overlay: kakao.maps.CustomOverlay;
  coords: kakao.maps.LatLng;
}

export default function BusanDistrictMap({
  organizations,
  selectedRegion,
  onRegionSelect,
}: BusanDistrictMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const markersRef = useRef<DistrictMarkerData[]>([]);
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);

  const getDistrictCounts = useCallback(() => {
    const counts: Record<string, number> = {};
    organizations.forEach((org) => {
      const district = org.region.replace("부산광역시 ", "");
      counts[district] = (counts[district] || 0) + 1;
    });
    return counts;
  }, [organizations]);

  // SDK 동적 로드 — yeirin-landing과 동일한 패턴
  useEffect(() => {
    let cancelled = false;

    // 이미 로드된 경우 (yeirin-landing과 동일: load() 항상 호출)
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        if (!cancelled) setIsLoaded(true);
      });
      return () => { cancelled = true; };
    }

    // 이미 스크립트 태그가 있는 경우
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkInterval);
          window.kakao.maps.load(() => {
            if (!cancelled) setIsLoaded(true);
          });
        }
      }, 100);
      return () => { cancelled = true; clearInterval(checkInterval); };
    }

    // 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=dea4dba14e9d393656d3cee92af2ccd4&libraries=services&autoload=false";
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (!cancelled) setIsLoaded(true);
        });
      } else {
        if (!cancelled) setLoadError("카카오맵 SDK 초기화 실패");
      }
    };

    script.onerror = () => {
      if (!cancelled) setLoadError("카카오맵 스크립트 로드 실패");
    };

    document.head.appendChild(script);

    return () => { cancelled = true; };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    try {
      const newMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(35.1796, 129.0756),
        level: 9,
      });
      setMap(newMap);
    } catch {
      setLoadError("지도를 생성하는데 실패했습니다.");
    }
  }, [isLoaded, map]);

  // 마커 생성
  useEffect(() => {
    if (!map || !isLoaded) return;

    const districtCounts = getDistrictCounts();

    markersRef.current.forEach(({ marker, overlay }) => {
      marker.setMap(null);
      overlay.setMap(null);
    });
    overlaysRef.current.forEach((o) => o.setMap(null));
    markersRef.current = [];
    overlaysRef.current = [];

    const newMarkers: DistrictMarkerData[] = [];

    Object.entries(DISTRICT_COORDS).forEach(([district, coord]) => {
      const count = districtCounts[district] || 0;
      if (count === 0) return;

      const color = DISTRICT_MARKER_COLORS[district] || "#7317cf";
      const coords = new window.kakao.maps.LatLng(coord.lat, coord.lng);

      const markerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="52" viewBox="0 0 44 52">
          <defs>
            <filter id="shadow-${district}" x="-20%" y="-10%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
            </filter>
          </defs>
          <path fill="${color}" filter="url(#shadow-${district})" d="M22 2C12.059 2 4 10.059 4 20c0 11 15 27 18 30 3-3 18-19 18-30 0-9.941-8.059-18-18-18z"/>
          <circle cx="22" cy="20" r="12" fill="white"/>
          <text x="22" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="${color}" font-family="sans-serif">${count}</text>
        </svg>
      `;

      const markerImage = new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markerSvg)}`,
        new window.kakao.maps.Size(44, 52),
        { offset: new window.kakao.maps.Point(22, 52) }
      );

      const marker = new window.kakao.maps.Marker({
        position: coords,
        map: map,
        image: markerImage,
      });

      const orgsInDistrict = organizations.filter((o) =>
        o.region.includes(district)
      );
      const orgNames = orgsInDistrict
        .map(
          (o) =>
            `<div style="padding:3px 0;font-size:12px;color:#475569;display:flex;align-items:center;gap:6px;">
              <span style="width:5px;height:5px;border-radius:50%;background:${color};flex-shrink:0;"></span>
              ${o.name}
            </div>`
        )
        .join("");

      const overlayContent = `
        <div style="
          background:white;
          border-radius:14px;
          padding:16px 18px;
          box-shadow:0 4px 20px rgba(0,0,0,0.12);
          min-width:200px;
          max-width:280px;
          font-family:'Manrope','Noto Sans KR',sans-serif;
          border:1px solid #e2e8f0;
        ">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <div style="
              width:28px;height:28px;border-radius:8px;
              background:${color}15;
              display:flex;align-items:center;justify-content:center;
              font-size:14px;font-weight:700;color:${color};
            ">${count}</div>
            <div style="font-weight:700;color:#0f172a;font-size:15px;">${district}</div>
          </div>
          <div style="border-top:1px solid #f1f5f9;padding-top:8px;">
            ${orgNames}
          </div>
          <button
            onclick="window.__bimpactSelectRegion && window.__bimpactSelectRegion('${district}')"
            style="
              margin-top:10px;width:100%;padding:8px 0;
              background:${color};color:white;border:none;border-radius:8px;
              font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;
            "
          >이 지역 기관 보기</button>
        </div>
        <div style="
          width:0;height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-top:10px solid white;
          margin:0 auto;
          filter:drop-shadow(0 2px 2px rgba(0,0,0,0.08));
        "></div>
      `;

      const overlay = new window.kakao.maps.CustomOverlay({
        position: coords,
        content: overlayContent,
        yAnchor: 1.15,
        xAnchor: 0.5,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        overlaysRef.current.forEach((o) => o.setMap(null));
        overlaysRef.current = [];
        overlay.setMap(map);
        overlaysRef.current.push(overlay);
        map.setCenter(coords);
        map.setLevel(7);
      });

      newMarkers.push({ district, marker, overlay, coords });
    });

    markersRef.current = newMarkers;
  }, [map, isLoaded, organizations, getDistrictCounts, selectedRegion]);

  // 선택된 지역 변경 시 지도 이동
  useEffect(() => {
    if (!map) return;

    if (selectedRegion === "전체") {
      map.setCenter(new window.kakao.maps.LatLng(35.1796, 129.0756));
      map.setLevel(9);
      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];
      return;
    }

    const coord = DISTRICT_COORDS[selectedRegion];
    if (coord) {
      const latlng = new window.kakao.maps.LatLng(coord.lat, coord.lng);
      map.setCenter(latlng);
      map.setLevel(6);

      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];

      const markerData = markersRef.current.find(
        (m) => m.district === selectedRegion
      );
      if (markerData) {
        markerData.overlay.setMap(map);
        overlaysRef.current.push(markerData.overlay);
      }
    }
  }, [selectedRegion, map]);

  // window 글로벌 콜백 (오버레이 버튼용)
  useEffect(() => {
    window.__bimpactSelectRegion = (region: string) => {
      onRegionSelect(region);
      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];
    };
    return () => {
      delete window.__bimpactSelectRegion;
    };
  }, [onRegionSelect]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full rounded-2xl bg-slate-100"
      >
        {loadError && (
          <div className="w-full h-full flex flex-col items-center justify-center text-red-500 p-4 text-center">
            <span className="material-symbols-outlined text-4xl mb-2">
              error
            </span>
            <p className="font-medium mb-1">지도 로드 실패</p>
            <p className="text-sm text-slate-500">{loadError}</p>
          </div>
        )}
        {!isLoaded && !loadError && (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm font-medium">지도를 불러오는 중...</p>
          </div>
        )}
      </div>

      {/* 범례 */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3.5 shadow-lg border border-slate-200/60 text-xs">
          <p className="font-bold text-slate-700 mb-2 text-[11px] tracking-wide uppercase">
            지역별 참여기관
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {Object.entries(DISTRICT_MARKER_COLORS).map(
              ([district, color]) => {
                const count = organizations.filter((o) =>
                  o.region.includes(district)
                ).length;
                if (count === 0) return null;
                return (
                  <button
                    key={district}
                    onClick={() => onRegionSelect(district)}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-slate-600">
                      {district}{" "}
                      <span className="font-bold" style={{ color }}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}
