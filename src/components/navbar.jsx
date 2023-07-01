import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [sidebar, setSidebar] = useState('')

    const showSidebar = () => setSidebar(!sidebar)

    return(
        <div>
            <i onClick={showSidebar} class="fa-solid fa-bars bac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-house"></i>
                    <p className='dfp'>Home</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                  <p className='dfp'>Project</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/club' className='nav-text'><i class="fa-solid fa-people-group home"></i>
                     <p className='dfp'>Club</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>
                
                    
                </ul>
            </nav>
        </div>

    )
}
export default Navbar