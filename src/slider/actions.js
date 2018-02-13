import axios from 'axios'
import { FETCH_IMAGES } from './constants'

export function fetchSliderImages() {
  return async (dispatch) => {
    try {
      let res = await axios.get('img/slider-config.json')
      dispatch(getImagesSuccess(res.data))
      //console.log(res.data)
    }
    catch(e) {
      console.error(e)
    }
  }
}

export function getImagesSuccess(images) {
  return {
    type: FETCH_IMAGES,
    payload: images
  }
}

