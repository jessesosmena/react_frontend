import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
//import axios from 'axios';

import Autoplay from './autoplay'
import SliderLeftArrow from './leftArrow'
import SliderRightArrow from './rightArrow'

import Slide from './slide'
import Dots from './dots'


class Slider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      translateValue: 0,
      autoplay: false
    }
  }

  componentDidMount = () => this.props.fetchSliderImages()

  renderSlides = () => {
    const { images } = this.props
  
    let slides = []

    for(let i = 0; i < images.length; i++)
      slides.push(<Slide key={i} image={images[i].image} />)
      console.log(slides)

    return slides
  }

  handleDotClick = i => {
    const { images } = this.props

    if(i === this.state.index)
      return

    if(i > this.state.index) {
      return this.setState({
        index: i,
        translateValue: -(i * this.slideWidth())
      })
    }
    else {
      return this.setState({
        index: i,
        translateValue: this.translateValue += ((this.index - i) * (this.slideWidth()))
      })
    }
  }

  toggleAutoplay = () => this.setState({ autoplay: !this.state.autoplay })

  componentDidUpdate = (prevProps, prevState) => {
    const { autoplay } = this.state

    if(autoplay && prevState.autoplay !== autoplay) {
      let x = window.setInterval(() =>  {
                this.goToNextSlide()
              }, 2500)

      this.setState({ interval : x })
    }
    else if(!autoplay && prevState.autoplay !== autoplay) {
      let x = window.clearInterval(this.state.interval)
      this.setState({ interval : x })
    }
  }

  render() {

    const { images } = this.props
    const { index, translateValue, autoplay } = this.state

    return (
      <div className="slider">
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          { this.renderSlides() }
        </div>

        <Autoplay toggle={this.toggleAutoplay} autoplay={autoplay} />

        <Dots
          index={index}
          quantity={images.length}
          dotClick={this.handleDotClick} />

        <SliderLeftArrow prevSlide={this.goToPreviousSlide} />
        <SliderRightArrow nextSlide={this.goToNextSlide} />
      </div>
    )

  }

  goToPreviousSlide = () => {
    if(this.state.index === 0)
      return

    this.setState({
      translateValue: this.translateValue += this.slideWidth(),
      index: this.index -= 1
    })
  }

  goToNextSlide = () => {
    const { images } = this.props
   
    if(this.state.index === images.length - 1) {
      return this.setState({
        translateValue: 0,
        index: 0
      })
    }

    this.setState({
      translateValue: this.translateValue -= this.slideWidth(),
      index: this.index += 1
    })
  }

  slideWidth = () => {
    const slide = document.querySelector('.slide')
    if(slide){
      return slide.clientWidth
    }
  }

}

const mapStateToProps = state => ({  
  images: state.slider,
})



export default connect(mapStateToProps, actions)(Slider)
