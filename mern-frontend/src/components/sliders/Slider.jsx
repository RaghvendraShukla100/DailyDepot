import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000, // 1 second
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false, // Optional: keep sliding on hover
  };

  return (
    <div className="w-[220px] h-[310px] overflow-hidden relative mx-auto">
      <Slider {...settings}>
        {[
          "https://i.pinimg.com/736x/42/ee/6d/42ee6d1e6a1ab5a4d5b1ea408be7a814.jpg",
          "https://i.pinimg.com/736x/66/53/38/665338fe45de074950d4eb15a7319785.jpg",
          "https://i.pinimg.com/736x/4a/0d/55/4a0d5508ef2c21d50a3cdf6e9fecc7d6.jpg",
        ].map((url, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
