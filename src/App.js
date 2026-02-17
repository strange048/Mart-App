import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import NxtMart from './components/Context'
import Home from './components/Home'
import Cart from './components/Cart'
import Payment from './components/Payment'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [username, setUser] = useState('')
  const [cartList, setCartList] = useState([])

  return (
    <NxtMart.Provider value={{username, setUser, cartList, setCartList}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/payment" component={Payment} />
      </Switch>
    </NxtMart.Provider>
  )
}

export default App
