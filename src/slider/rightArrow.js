import React from 'react'

const RightArrow = ({ nextSlide }) => {
  return (
    <div className="right-arrow" onClick={nextSlide}>
      <img src="img/slider-right-arrow.svg" alt="right-arrow"/>
    </div>
  )
}

export default RightArrow
