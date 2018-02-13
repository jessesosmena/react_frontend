import React from 'react'

const Slide = ({ image }) => {

  const styles = {
    backgroundImage: `url(img/${image}.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'

  }

  return <div className="slide" style={styles}></div>
}

export default Slide
