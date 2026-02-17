import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'
import NxtMart from '../Context'
import Footer from '../Footer'

import './index.css'

const Cart = () => {
  const {cartList, setCartList} = useContext(NxtMart)

  const updatedList = cartList.map(item => ({
    ...item,
    price: parseFloat(item.price.replace('₹', '')),
  }))

  const totalPrice = updatedList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const onEmptyCart = () => {
    setCartList([])
  }

  const onDecrement = itemID => {
    setCartList(prev =>
      prev.map(item =>
        item.id === itemID && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    )
  }

  const onIncrement = itemId => {
    setCartList(prev =>
      prev.map(item =>
        item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }
  return (
    <div className="cartmain">
      <div className="cartHeader">
        <FaArrowLeft size={32} />
        <h1>CheckOut</h1>
        <p>items ({updatedList.length})</p>
      </div>
      <button className="delete" onClick={onEmptyCart}>
        Clear <RiDeleteBin6Line />
      </button>
      {updatedList.length === 0 ? (
        <div className="noCart">
          <img
            src="https://res.cloudinary.com/dgzksmwpz/image/upload/v1770197493/shopping-cart_iwmvn7.jpg"
            alt="empty"
            height="150px"
          />
          <p>Your Cart is empty</p>
          <Link to="/">
            <button className="Shop">Shop Now!</button>
          </Link>
        </div>
      ) : (
        <>
          {updatedList.map(item => (
            <div className="cartList" key={item.id}>
              <div className="cartImage">
                <img src={item.imageUrl} alt="casf" />
              </div>
              <div className="cartTypo">
                <h1>{item.productName}</h1>
                <p>{item.weight}</p>
                <h1 className="priceHeader">₹{item.price * item.quantity}</h1>
              </div>
              <div className="quantity-container">
                <button type="button" onClick={() => onDecrement(item.id)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onIncrement(item.id)}>
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="total-container">
            <div className="total-box">
              <p className="total-text">
                Total Price ({updatedList.length} items) :
                <span className="total-amount">
                  Rs. {totalPrice.toFixed(2)}
                </span>
                <span className="checkoutSpan">
                  <Link to="/payment">
                    <button type="button" className="CheckOutBut">
                      CheckOut!
                    </button>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}
export default Cart
