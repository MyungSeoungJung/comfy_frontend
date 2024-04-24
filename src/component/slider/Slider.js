import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import http from "../../utils/http";
import React, { useEffect, useState } from "react";
import "../../styles/Slider.css"

export default function SimpleSlider() {
    const [similarStudy, setSimilarStudyResponse] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = window.location.search;
                const similarStudyResponse = await http.get(`study/getSimilarStudy${id}`)
                setSimilarStudyResponse(similarStudyResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // 에러 처리
            }

        };

        fetchData();
    }, []);

    return (
        <div>
            {similarStudy.length === 0 ? (
                <div className="no-similar-study"></div>
            ) : (
                <Slider {...settings}>
                    {similarStudy.slice(0, 3).map((similarStudyItem) => (
                        <div key={similarStudyItem.id} className="similar-study-contain">
                            <div>{similarStudyItem.title}</div>
                            <div>좋아요<span>{similarStudyItem.totalHeart}</span>댓글 수<span>{similarStudyItem.totalComment}</span></div>
                        </div>
                    ))}
                </Slider>
            )
            }
        </div >
    );
}
