import React, { useEffect, useRef, useState } from "react";
import "../../styles/Recommend.css";

const { kakao } = window;

function Recommend({ onClose }) {
  const mapRef = useRef(null);
  const [cafes, setCafes] = useState([]);
  let map = null; // map 변수 정의
  let infowindow = null; // infowindow 변수 정의

  useEffect(() => {
    const container = mapRef.current; // 지도를 담을 영역

    // 사용자의 현재 위치로 지도의 중심을 설정
    const currentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPosition = new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            const options = {
              center: userPosition,
              level: 4,
            };

            map = new kakao.maps.Map(container, options); // map 초기화
            map.setCenter(userPosition);

            // 현재 위치에 빨간색 마커 추가
            const userMarker = new kakao.maps.Marker({
              position: userPosition,
              map: map,
              image: new kakao.maps.MarkerImage(
                "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 빨간색 마커 이미지 URL
                new kakao.maps.Size(30, 42), // 마커 이미지의 크기
                {
                  offset: new kakao.maps.Point(15, 42), // 마커 이미지에서 좌표의 오프셋 설정
                }
              ),
              title: "현재 위치",
            });

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
    };

    // 사용자의 현재 위치로 지도의 중심을 설정
    currentLocation();

    // 카페 검색을 요청하는 함수
    function searchCafesNearby(userPosition) {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch("카페", placesSearchCB, {
        location: userPosition,
        radius: 500, // 반경 설정 (미터 단위)
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
      if (map) map.relayout();
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
