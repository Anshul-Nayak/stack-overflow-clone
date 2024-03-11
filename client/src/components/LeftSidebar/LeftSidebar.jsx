import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from "../../assets/Globe.svg";


const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <nav className='side-nav'>
            <button  className="nav-btn">

                <NavLink to='/' className='side-nav-links' activeClassName='active'>
                    <p>Home</p>

                </NavLink>
                </button>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <button  className="nav-btn">

                    <NavLink to='/questions' className='side-nav-links' activeClassName='active' style={{ paddingLeft: "40px" }} >
                        <img src={Globe} alt="globe" />
                        <p style={{ paddingLeft: "10px" }}>Questions</p>
                    </NavLink>
                    </button>
                    <button className="nav-btn">

                    <NavLink to='/tags' className='side-nav-links' activeClassName='active' style={{ paddingLeft: "40px" }}>
                        <p>Tags</p>
                    </NavLink>
                   </button>
                   <button  className="nav-btn">

                    <NavLink to='/users' className='side-nav-links' activeClassName='active' style={{ paddingLeft: "40px" }}>
                        <p>Users</p>
                    </NavLink>
                    </button>

                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar
