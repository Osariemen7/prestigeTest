import {  useLocation, Link } from "react-router-dom";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
const Receipt=()=> {
    const location = useLocation()
    let meal = location.state.ite
    
    const handleCaptureClick = async () => {
        const mainElement = document.getElementById('main-element');
        const canvas = await html2canvas(mainElement);
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
      }
    console.log(meal)
    return(
        <div>
        <Link to='/components/accounts'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <main id="main-element">
                <h1 className="receipt">Prestige Receipt</h1>
                <h2>Sucessful!</h2>
                <h3>Tranfer of ₦{(parseInt(meal.amount)).toLocaleString('en-US')} to<br/> {meal.account_name}</h3>
                <div className="vasa1">
                    <p>Date</p>
                    <p>{(new Date()).toDateString('en-GB')}</p>
                </div>
                <div className="vasa">
                <p>Account Number</p>
              <p>{meal.nuban}</p>
                </div>
                <div className="vasa2">
               <p>Bank</p>
               <p>{meal.bank}</p>
           </div>
              <div className="vasa1">
                <p>Narration</p>
                <p>{meal.narration}</p>
              </div>
           <div className="space"></div>
            </main>
            <button className="logb" onClick={handleCaptureClick}>Save</button>
        </div>
    )
}
export default Receipt