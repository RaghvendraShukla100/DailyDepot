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
          "https://i.pinimg.com/736x/db/ec/df/dbecdf3fbf692b47be82c7a6f3b2f908.jpg",
          "https://i.pinimg.com/1200x/3d/9a/bd/3d9abdb6ca274ea604b0c325fdb26ede.jpg",
          "https://i.pinimg.com/736x/0f/b2/56/0fb2568f0d355946d0c7de068cf83717.jpg",
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
