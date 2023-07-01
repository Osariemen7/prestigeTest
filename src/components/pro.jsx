import tick from './images/tick.svg';
import { useNavigate, useLocation } from 'react-router-dom';


const Pro = ()=> {
    const navigate = useNavigate()
    const location = useLocation()
  let pine =  location.state.name
  const teem = (pine) => {
    let nam;  
    if (pine.length === 0) {
      nam = 'null';
    } else {
      nam = pine.name;
    }
 
    return nam;
  };
  let name = teem(pine)
    const done =(e)=>{
        e.preventDefault()
            navigate('/components/project')
    }
    return(
        <div className='tha'>
           <img src={tick} alt=''/>
           <h3 className='tp'>Project Created</h3>
           <p className='tp'>your {name} project has been created successfully</p>
           <button onClick={done} className='tbut'>Done</button>
        </div>
    )
}
export default Pro