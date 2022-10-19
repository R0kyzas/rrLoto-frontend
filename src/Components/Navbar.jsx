import React from 'react';
import { BsHouseDoor } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { BsChatLeftDots } from "react-icons/bs";
import { BsPersonBoundingBox } from "react-icons/bs";
import { BsFileCheck } from "react-icons/bs";

const Navbar = () => {
    let activeStyle = 'active';
    return(
            <nav className='navbar under' valing="bottom">
                    <NavLink 
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        end
                    >
                        <BsHouseDoor size={26}/>
                    </NavLink>

                    <NavLink 
                        to="profile" 
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        <BsPersonBoundingBox size={26}/>
                    </NavLink>
                    <NavLink to="other"><BsChatLeftDots size={26}/></NavLink>
            </nav>
    )
}

export default Navbar;