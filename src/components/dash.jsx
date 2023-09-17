import React, { useState, useEffect } from 'react';
import bank from './images/bank.svg';
import Line from './images/Line 1.svg';
import stack from './images/stack.svg';
import sidearrow from './images/sidearrow.svg';
import money from './images/money.svg';
import club from './images/club.svg';
import { Link, useNavigate} from 'react-router-dom';


const Dashboard =()=>{
  const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState('')
  const [info, setInfo] = useState('')

  const showSidebar = () => setSidebar(!sidebar)

  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
  let name = tok.user
  
  useEffect(() => {
    const handleBackButton = (event) => {
      // Prevent the default behavior to stop the browser from going back
      event.preventDefault();
      
      // Redirect the user to the login page
      navigate('/components/login');
    };

    // Add a listener for the popstate event (back button press)
    window.addEventListener('popstate', handleBackButton);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
    const fetchData = async () => {
        let item ={refresh}
        let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(item)
        });
        rep = await rep.json();
        let bab = rep.access_token
      let response = await fetch("https://sandbox.prestigedelta.com/accounts/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      let respet = await fetch("https://sandbox.prestigedelta.com/tasks/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
      respet = await respet.json();
      response = await response.json()
      localStorage.setItem('user-info', JSON.stringify(tok))
      if (response.status === 401){
        navigate('/components/login')
      } else {
     setUsers(response)
     setInfo(respet)
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [])
    
    console.log(tok)
    
    
//   useEffect(() => {
//     fetch('https://sandbox.prestigedelta.com/accounts/')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error));
//     }, []);
//     let wark = JSON.stringify(data)
let wark =users[0]

console.log(users) 
console.log(info)

const toggleHidden =()=>{
  
 // let gat = wark.available_balance
  
        if(hidden==="******")
        {let gal =(wark.main_balances.available_balance).toLocaleString('en-US')
          
         setHidden(`₦${gal}`)
         return;
        }
        setHidden("******")
      }
      
        
    return(
        <div>
            <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
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
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/savings' className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/customer' className='nav-text'><i class="fa-solid fa-people-roof"></i>
                      <p className='dfp'>Customers</p></Link>
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
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>
                
                    
                </ul>
            </nav>
            <h3 className='h4'>Hi, {name.first_name} </h3>
            <div className='dash'>
                <p className='dp'>Total Balance</p>
                
                { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                <h1 className='h1'>{hidden}</h1>
                <img src={Line} alt=''/><br/>
                <Link to='/components/fund'>
                   <button className='dbut'>Add Money</button>
                </Link>
            </div>
            <div className="dflex">
                <img src={bank} alt=''/>
                <div>
                  <h3 className='dh3'>Access to Finance</h3>
                  <p className='dfp'>Get access to loan when you save 30% of your estimated project amount</p>
                </div>   
            </div>
       {info.label === '' ? (
            <div>
            <p className='l'>QUICK ACTION</p>
            <Link to='/components/project' className='link'> <div className='dflex1'>
                <img src={stack} alt='' />
                <div >
                    <h4 className='dh3'>Create project plan</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div></Link>
            <div className='dflex1'>
                <img src={money} alt='' />
                <div >
                    <h4 className='dh3'>Get quick credit</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>
            <div className='dflex1'>
                <img src={club} alt='' />
                <div >
                    <h4 className='dh3'>Create lending club</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>
            </div> ) :
            <div>
            <p className='l'>Quick Action</p>
            <Link to='/components/project' className='link'> <div className='dflex1'>
                <img src={stack} alt='' />
                
                <div>
                    <h4 className='dh3'>Create Your Project Plan</h4>
                    <p className='dfp'>Start your project plan</p>
                </div>
                <img src={sidearrow} alt='' />
            </div></Link>
            <div className='dflex1'>
                <img src={money} alt='' />
                <div >
                    <h4 className='dh3'>Get quick credit</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>
            <div className='dflex1'>
                <img src={club} alt='' />
                <div >
                    <h4 className='dh3'>Create lending club</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>
            </div> }
            
        </div>
    )
}
export default Dashboard