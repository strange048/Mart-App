import {useContext} from 'react'
import NxtMart from '../Context'
import './index.css'

const GroceryItem = props => {
  const {groceryItemList} = props
  const {cartList, setCartList} = useContext(NxtMart)

  const getItemQuantity = id => {
    const item = cartList.find(cartItem => cartItem.id === id)
    return item ? item.quantity : 0
  }

  const onAdd = product => {
    const existingItem = cartList.find(item => item.id === product.id)
    if (existingItem) {
      setCartList(prev =>
        prev.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    } else {
      setCartList(prev => [...prev, {...product, quantity: 1}])
    }
  }

  const onDecrement = id => {
    setCartList(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    )
  }

  const onIncrement = id => {
    setCartList(prev =>
      prev.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  return (
    <div className="itemsContainer">
      {groceryItemList.map(item => {
        const currentQuantity = getItemQuantity(item.id)
        return (
          <div className="itemHead" key={item.id}>
            <div className="itemImage">
              <img src={item.imageUrl} alt={item.productName} />
            </div>
            <div className="itemTypo">
              <h1>{item.productName}</h1>
              <p>{item.weight}</p>
              <div className="buttonDiv">
                <p>{item.price}</p>
                {currentQuantity < 1 ? (
                  <button type="button" onClick={() => onAdd(item)}>
                    Add
                  </button>
                ) : (
                  <div className="quantity-container">
                    <button type="button" onClick={() => onDecrement(item.id)}>
                      −
                    </button>
                    <span>{currentQuantity}</span>
                    <button type="button" onClick={() => onIncrement(item.id)}>
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GroceryItem
