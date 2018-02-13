import React from 'react'
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';


const Messages = (props) => {  
  const { messages } = props

  return (
    <div>
      <ul>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
        {messages.map(message => (
          <h5 className="text-info" key={message.time}>{message.body}</h5>
        ))}
        </Col>
      </ul>
    </div>
  )
}

Messages.propTypes = {  
  messages: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.date,
      })),
}

export default Messages  