import React from 'react'
import logo from '../tk_logo.jpg'

export default function Home() {
    return (
        <>
            <div className="d-flex flex-column justify-content-center bg-dark bg-gradient" style={{ height: '60rem', alignItems:'center'}}>
                <div className="container-xxl bd-gutter">
                    <div className="col-md-8 mx-auto text-center">
                        <img src={logo} alt="Taza Khabar" className="d-none d-sm-block mx-auto rounded-5" style={{ width: "200", height: "165", marginBottom: '4rem' }} />
                        <h1 className="mb-5 fw-semibold lh-1 text-white">All the news. All in one place.</h1>
                    </div>
                </div>
                <form className="d-flex " role="search" style={{width:'25rem', height:'3rem'}}>
                    <input className="form-control me-2" type="search" placeholder="Search News" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit" style={{height:'3rem', backgroundColor:'#cc0000', color:'whiteSmoke'}}>Search</button>
                </form>
            </div>
        </>
    )
}
