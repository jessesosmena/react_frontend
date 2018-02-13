import React from 'react'
import PropTypes from 'prop-types';


const Errors = (props) => {  
  const { errors } = props
  return (
    <div>
      <ul>
        {errors.map(errors => (
          <h5 className="text-danger"key={errors.time}>{errors.body}</h5>
        ))}
      </ul>
    </div>
  )
}

Errors.propTypes = {  
  errors: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.date,
      })),
}

export default Errors  