import React, { useEffect, useRef, useState } from "react";
import "../../styles/Recommend.css";

const { kakao } = window;

function Recommend({ onClose }) {
  const mapRef = useRef(null);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const container = mapRef.current; // 지도를 담을 영역
    const options = {
      center: new kakao.maps.LatLng(37.483812, 126.938711), // 보라매공원
      level: 4,
    };

    let infowindow = null; // infowindow 변수를 함수 외부에서 정의
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 사용자의 현재 위치를 가져와서 지도의 중심으로 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          map.setCenter(userPosition);

          // 카페 검색 요청
          searchCafesNearby(userPosition);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // 카페 검색을 요청하는 함수
    function searchCafesNearby(userPosition) {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch("카페", placesSearchCB, {
        location: userPosition,
        radius: 1000, // 반경 설정 (미터 단위)
      });
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data); // 검색된 장소 데이터 콘솔에 출력
        setCafes(data);

        // 카페의 좌표값을 기반으로 지도에 포인트 표시
        data.forEach((cafe, index) => {
          const position = new kakao.maps.LatLng(cafe.y, cafe.x);
          const marker = new kakao.maps.Marker({
            position,
            map,
            title: cafe.place_name,
          });

          // 포인트에 마우스 오버 이벤트 추가
          kakao.maps.event.addListener(marker, "mouseover", function() {
            infowindow = new kakao.maps.InfoWindow({
              content: `<div>${cafe.place_name}</div>
                    <div>거리: ${cafe.distance} M</div>
                    <div>주소: ${cafe.road_address_name}</div>`,
            });
            infowindow.open(map, marker);
          });

          // 포인트에 마우스 아웃 이벤트 추가
          kakao.maps.event.addListener(marker, "mouseout", function() {
            // 마우스 아웃 시 인포윈도우를 닫습니다.
            if (infowindow) {
              infowindow.close();
            }
          });
        });
      } else {
        console.error("Failed to search places:", status);
      }
    }

    return () => {
      // 컴포넌트가 언마운트될 때 지도 정리
      map && map.relayout();
    };
  }, []);

  return (
    <div className="map-container">
      <div className="map" ref={mapRef}>
        <button className="closeButton" onClick={onClose}>
          {" "}
          X{" "}
        </button>
      </div>
      <div className="text-container">
        <div className="list-container">
          <div className="cafe-list">
            <span> 카페 </span>
            <ul>
              {cafes.map((cafe, index) => (
                <li className="cafe-items" key={index}>
                  <div
                    className="info"
                    onClick={() => window.open(cafe.place_url, "_blank")}
                  >
                    <p className="name"> {cafe.place_name} </p>
                    <p className="area"> 거리 {cafe.distance} M </p>
                    <p className="address"> {cafe.road_address_name} </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
