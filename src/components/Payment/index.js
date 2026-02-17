import {Link} from 'react-router-dom'
import {useContext} from 'react'
import NxtMart from '../Context'
import './index.css'

const Payment = () => {
  const {setCartList} = useContext(NxtMart)

  return (
    <div className="payment-success">
      <img
        src="https://res.cloudinary.com/dgzksmwpz/image/upload/v1770199718/Group_7417_mkaqkh.png"
        alt="payment"
        className="success-img"
      />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering. Your payment is successfully completed.</p>

      <Link to="/">
        <button
          className="home-btn"
          type="button"
          onClick={() => setCartList([])}
        >
          Return to Homepage
        </button>
      </Link>
    </div>
  )
}

export default Payment
