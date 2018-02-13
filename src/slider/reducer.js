import { FETCH_IMAGES } from './constants'


export default function(state = [], action) {
    switch(action.type) {
	    case FETCH_IMAGES:
	      return action.payload

	default:
	    return state
    }
}



