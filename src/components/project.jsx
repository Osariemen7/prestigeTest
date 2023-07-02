import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';


  
   

const ProjectPage =()=>{
     const [hidden, setHidden] = useState("******");
    const [info, setInfo] = useState('')
    const navigate = useNavigate()
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

      if (response.status === 401) {
        navigate('/components/login');
      } else {  
      response = await response.json();
    
      setInfo(response)
        }}
  
    useEffect(() => {
      fetchDa()
    }, [])

    
   // let nam =parseInt( info[0].target_equity)/parseInt(info[0].target) * 100
    
   // console.log(nam) 
   console.log(tok)
   console.log(info)
   
  const show=(index)=>{
    const data = info[index]
     navigate('/components/Addlist', {state:{data}})
  } 
  const toggleHidden =()=>{
    if(hidden==="******")
    {let gal =(info[0].balance).toLocaleString('en-US')
      
     setHidden(`₦${gal}`)
     return;
    }
    setHidden("******")
  }
  console.log(info)
 if(info.length < 1){
    return(
        <div>
        <h2 className='head'>Project</h2>
        <div className="dash">
           <p className='dp'>Total Balance</p>
           <h1 className='tp'>₦0</h1>
        </div>
        <p className='l'>PROJECT PLANS</p>
        <div className='opend'>
            <p>You have no active project plan yet.<br /> Tap + icon to create an active project plan</p>
        </div>
         <Link to='/components/pop'>
         <button className='logb'>Create First Project</button></Link>
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
            <div onClick={() => show(index)} className='pd'>
                 <p className='asav1'>Next Payment Date: {(new Date(obj.next_payment_day)).toDateString('en-GB')}</p>
                <p className='asav1'>Amount To pay: ₦{(obj.payment_amount).toLocaleString('en-US')}</p>
                <div className='pp'>
                <p className='pn' key={index}>{obj.name}</p>
                    <p className='prog'>In Progress</p>
                </div>
                <div className='pp'>
                    <p key={index}>₦{(obj.target).toLocaleString('en-US')}</p>
                    <p key={index}>{ Math.round(((parseInt( obj.equity)/parseInt(obj.target) * 100) + Number.EPSILON) * 100) / 100}% </p>
                </div>
                <div className="progress-b" style={{ width: `${100}%` }}>
                <div className="progress-bar" style={{ width: `${parseInt( obj.equity)/parseInt(obj.target) * 100}%` }}>
                   </div> </div>
                    
                
            </div>)}
            <Link to='/components/pop'>
         <button className='logb'>New Project</button></Link>
         <footer className='dflex2'>
                <div>
                <Link to='/components/dash'><i class="fa-solid fa-house home"></i>
                  
                  <p className='dfp'>Home</p></Link>
                </div>
                <div>
                <i class="fa-solid fa-layer-group home1"></i>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                <Link to='/components/club'><i class="fa-solid fa-people-group home"></i></Link>
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
