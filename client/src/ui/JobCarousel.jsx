// src/components/CategoryCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './JobCarousel.css'; 

const CategoryCarousel = () => {
  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 3,  
    slidesToScroll: 1,
    arrows: true, 
    centerMode: true, 
    centerPadding: '0px', 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="category-carousel">
      <Slider {...settings}>
        <div className="carousel-item">
          <button className="category-button">Frontend Developer</button>
        </div>
        <div className="carousel-item">
          <button className="category-button">Backend Developer</button>
        </div>
        <div className="carousel-item">
          <button className="category-button">Data Engineer</button>
        </div>
        <div className="carousel-item">
          <button className="category-button">Fullstack Developer</button>
        </div>
        <div className="carousel-item">
          <button className="category-button">Data Scientist</button>
        </div>
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
