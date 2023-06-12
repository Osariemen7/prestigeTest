import image7 from './images/image7.svg';
import Eclipse from './images/Ellipse 27.svg';
import { Link } from 'react-router-dom';
const  PopPage=() => {

    return(
        <div>
           <div className='dflex2'>
           <h2>Create Project</h2>
           <Link className='x' to='/components/project'>
           <div >
              <p>X</p>
           </div>
           </Link> 
           </div>
            <img src={image7} alt=''/>
            <div className='pflex'>
                <img src={Eclipse} alt='' />
                <div>
                    <h4 className='ph'>Customer Repayment Plan</h4>
                    <p className='dh3'>Customize loan repayment plan to save up to 30% and reach savings goal faster</p>
                </div>
            </div>
            <div className='pflex'>
                <img src={Eclipse} alt='' />
                <div>
                    <h4 className='ph'>Wishlist</h4>
                    <p className='dh3'>Make a list of your financial goals and track your progress towards meeting them</p>
                </div>
            </div>
            <div className='pflex'>
                <img src={Eclipse} alt='' />
                <div>
                    <h4 className='ph'>Progress Tracking</h4>
                    <p className='dh3'>Get real time updates on your savings progress and know exactly where you stand to reach your goal</p>
                </div><br/>
            </div>
           <Link to='/components/createp'><button className='but1'> Get Started </button></Link> 
        </div>
    )
}
export default PopPage