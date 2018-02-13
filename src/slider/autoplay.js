import React from 'react'

const Autoplay = ({ toggle, autoplay }) => {
  return (
    <div className="autoplay" onClick={toggle}>
      {
        autoplay ?
        <p className="btn btn-info">Disable Autoplay</p>
        :<p className="btn btn-info">Enable Autoplay</p>
      }
    </div>
  )
}

export default Autoplay
