import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import plus from './images/plus.svg';

let tok= JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
  let refreshval;

  if ( tok === null || typeof tok === "undefined" ) {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)
  
   

const ProjectPage =()=>{
    const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
    const [info, setInfo] = useState('')
    const navigate = useNavigate()
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
      response = await response.json()
      localStorage.setItem('user-info', JSON.stringify(tok))
    //   if (data.code === 'token_not_valid'){
    //     navigate('/components/token')
    //   } else {
     setUsers(response)
      }
    
    useEffect(() => {
      fetchData()
    }, [])
    let wark =users[0]
    
    const toggleHidden =()=>{
               if(hidden==="******")
               {let gal =(wark.main_balances.available_balance).toLocaleString('en-US')
                 
                setHidden(`₦${gal}`)
                return;
               }
               setHidden("******")
             }
    const fetchDa = async () => {
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
      let response = await fetch("https://sandbox.prestigedelta.com/projectlist/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      response = await response.json()
      if (response.status !== 200) {
        navigate(window.location.pathname, { replace: true });
      } else {  
      response = await response.json();}
    
      setInfo(response)
    }
  
    useEffect(() => {
      fetchDa()
    }, [])

    
   // let nam =parseInt( info[0].target_equity)/parseInt(info[0].target) * 100
    
   // console.log(nam) 
   console.log(tok)
   console.log()
  const show=()=>{
    
     navigate('/components/Addlist')
  } 
   
 if(info.length < 1){
    return(
        <div>
        <h2 className='head'>Project</h2>
        <div className="dash1">
           <p className='dp'>Total Balance</p>
           <h1 className='tp'>₦000</h1>
        </div>
        <p className='l'>PROJECT PLANS</p>
        <div className='opend'>
            <p>You have no active project plan yet.<br /> Tap + icon to create an active project plan</p>
        </div>
         <Link to='/components/pop'>
         <img className='plus' src={plus} alt='' /></Link>
        <footer className='dflex2'>
      <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>  
        <i class="fa-solid fa-layer-group home1"></i>
        <i class="fa-solid fa-people-group home"></i>
        <Link to='/components/accounts'><i class="fa-solid fa-wallet home"></i></Link>
          
        </footer>
        
    </div>    
    
    )} else{
        return(
            <div>
            <div className="dash">
                    <h3 className="h1">Project</h3>
                    <p className='dp'>Total Balance</p>
                    { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                    <h1 className="h1">{hidden}</h1>
            </div>
            <p className='l'>PROJECT PLANS</p>
            {info.map((obj, index) =>
            <div onClick={show} className='pd'>
                <div className='pp'>
                <p className='pn' key={index}>{obj.name}</p>
                    <p className='prog'>In Progress</p>
                </div>
                <div className='pp'>
                    <p key={index}>₦{(obj.target).toLocaleString('en-US')}</p>
                    <p key={index}>{parseInt( obj.equity)/parseInt(obj.target) * 100}% </p>
                </div>
                <div className="progress-bar" style={{ width: `${parseInt( obj.equity)/parseInt(obj.target) * 100}%` }}>
                   </div>
            </div>)}
            <Link to='/components/pop'>
         <img className='plus1' src={plus} alt='' /></Link>
         <footer className='dflex2'>
                <div>
                <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>
                  
                  <p className='dfp'>Home</p>
                </div>
                <div>
                <i class="fa-solid fa-layer-group home1"></i>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                  <i class="fa-solid fa-people-group home"></i>
                  <p className='dfp'>Club</p>
                </div>
                <div>
                <Link to='/components/accounts'><i class="fa-solid fa-wallet home"></i></Link>
                  
                  <p className='dfp'>Account</p>
                </div> 
            </footer>
            </div>
        )
    }
}
export default ProjectPage
