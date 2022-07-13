import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Adminnavbar.css';

export default function Adminnavbar() {

    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

  return (
    <>
        <nav className='adminnavbar'>
            <div className='adminnavbar-container'>
                <Link to="/adminhome" className='adminnavbar-logo-word'>
                <img src={process.env.PUBLIC_URL + "Main-Logo.gif"} className='adminnavbar-logo' alt='' />
                   &nbsp; Market
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'adminnav-menu active' : 'adminnav-menu'}>
                    <li className='adminnav-item'>
                        <Link to='/adminhome' className='adminnav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='adminnav-item'>
                        <Link to='/adminsignup' className='adminnav-links' onClick={closeMobileMenu}>
                            Sign-up new admins
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
      </>
  )
}
