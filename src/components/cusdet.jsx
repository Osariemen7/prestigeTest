import { Link, useLocation } from 'react-router-dom';
const Cusdet=()=> {
    const location = useLocation()
 const item= location.state.data 
   
    return(
        <div>
        <Link to='/components/customer'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <h3 className='saed'>Customer Details</h3>
            <h4>{item.customer_name}</h4>
            <div className='clup'>
          <div className='clu'>
            <p className='clund'>Number of Transactions</p>
            <h4 className='clun'>{item.total_volume}</h4>
          </div>
          <div className='clu'>
            <p className='clund'>Total Amount Spent</p>
            <h4 className='clun'>{item.total_value}</h4>
          </div>
        </div>
        <div className='clup'>
          <div className='dlu'>
            <p className='clund'>No of purchase in the last 30 days</p>
            <h4 className='clun'>{item.last_30_volume}</h4>
          </div>
          <div className='dlu'>
            <p className='clund'>Amount Spent in the last 30 days</p>
            <h4 className='clun'>{item.last_30_value}</h4>
          </div>
         </div>
         <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Customer's Ranking</p>
            <h4 className='clun'>{item.ranking}</h4>
          </div>
          <div className='dlu'>
            <p className='clund'>Customer's Category</p>
            <h4 className='clun'>{item.category}</h4>
          </div>
         </div>
                  
          <div className='clup'>
              <p className='svin'>First Transaction: {(new Date(item.first_transaction)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              <p className='svin'>Last Transaction: {(new Date(item.last_transaction)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          </div>

        </div>
    )
}
export default Cusdet