import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

let tok= JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
  let refreshval;

  if (tok === null || typeof tok === 'undefined')  {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)
const Club = () => {
    return (
        <div>
          <h3 className='head'>Community</h3>  
          <p>Join or Create a lending group</p>
          <p>You have no active plan yet. Click on button to create plan</p>
          <div>
            <button className='but1'>Create Club</button>
            <button className='but2'>Join an existing Club</button>
          </div>
          <footer className='dflex2'>
                <div>
                  <i class="fa-solid fa-house home"></i>
                  <p className='dfp'>Home</p>
                </div>
                <div>
                <Link to='/components/project'><i class="fa-solid fa-layer-group home"></i></Link>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                  <i class="fa-solid fa-people-group home1"></i>
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
export default Club