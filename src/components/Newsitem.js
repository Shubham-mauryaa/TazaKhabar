// import React, { Component } from 'react'
import { Link } from 'react-router-dom';


const Newsitem = (props)=> {

    let { title, description, imgurl, newsurl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div className='d-flex'style={{position:'absolute', right:'0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={imgurl ? imgurl : "https://clipground.com/images/news-png-image-7.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">Author -  {author ? author : "Unknown"} <br /> Date- {new Date(date).toGMTString()}</small></p>
            <Link to={newsurl} target="_blank" className="btn btn-sm btn-info">Read More</Link>
          </div>
        </div>
      </div>
    )
  }


export default Newsitem
