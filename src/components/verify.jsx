import {useState} from 'react'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    
   async function vet(e){
        e.preventDefault()
        let res= JSON.parse(localStorage.getItem("user-info"));
        let reference = res.reference
        const item = {otp, reference}
        console.log(JSON.stringify(item))
        // Post the payload using Fetch:
        let sult= await fetch('https://sandbox.prestigedelta.com/verifyconfirm/', {
          method: 'POST',
          headers:{
          'Content-Type': 'application/json'
        //   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzNzk2NDY5LCJpYXQiOjE2NjM3OTYxNjksImp0aSI6IjMxM2M3YjgzY2QzYjQyMWJiMzcyNDc0MzA3MjYyNmJkIiwidXNlcl9pZCI6M30.UqMeJLcnNYUXYpxximYbbuw6KJ3Udj5crgp3R3NrjTM'
        },
        
        body:JSON.stringify(item),
      })
      if (sult.status !== 200) {
        setMessage("Incorrect Otp");
      } else {
        sult = await sult.json();
      localStorage.setItem('user-info', JSON.stringify(sult)) 
      navigate('/components/register')
      }
    }
    return(
        <div>
            <i class="fa-solid fa-chevron-left bac"></i>
            <h2>Verify your phone number</h2>
            <p>Please enter the 4-digit verification code<br/> sent to your phone number in the boxes below</p>
           <div className='dtp'>
              <OtpInput  
                 value={otp}
                 onChange={setOtp}
                  numInputs={4}
                 renderSeparator={<span> </span>}
                 renderInput={(props) => <input {...props }  className='otp' />}
                />    
           </div>
           <button className="but" onClick={vet} type="submit">Next</button>
           <div className="message">{message ? <p>{message}</p> : null}</div>
           <p>Didn't get the code yet? <span className='lsf' >Resend OTP</span></p>
           </div>
    )
}
export default Verify