import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading">
        <Spinner animation='border' className='spin'/>
    </div>
  )
}

export default Loading