import React from 'react'

const SliderLeftArrow = ({ prevSlide }) => {
  return (
    <div className="slider-left-arrow" onClick={prevSlide}>
      <img src="img/slider-left-arrow.svg" alt="left-arrow"/>
    </div>
  )
}

export default SliderLeftArrow
