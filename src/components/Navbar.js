// import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Navbar=(props)=> {
    return (
      <>
        <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor:' #cc0000'}}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><strong><b><h3>TAZAKHABAR</h3></b></strong></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item" >
                <Link className="nav-link" aria-current="page" to="/" style={{color : 'whitesmoke'}}>Home</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/business" style={{color : 'whitesmoke'}}>Business</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/entertainment" style={{color : 'whitesmoke'}}>Entertainment</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/general" style={{color : 'whitesmoke'}}>General</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/health"style={{color : 'whitesmoke'}}>Health</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/science" style={{color : 'whitesmoke'}}>Science</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/sports" style={{color : 'whitesmoke'}}>Sports</Link>
                </li>
                <li className="nav-item" >
                <Link className="nav-link" to="/technology" style={{color : 'whitesmoke'}}>Technology</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
      </>
    )
}

export default Navbar;
