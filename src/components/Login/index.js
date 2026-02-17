import {useState, useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import NxtMart from '../Context'
import './index.css'

const Login = props => {
  const {username, setUser} = useContext(NxtMart)
  const [check, setCheck] = useState(false)
  const [password, setPassword] = useState('')
  const [errorMsg, setError] = useState('')
  const {history} = props

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/')
    }
  }, [history])

  const onSubmit = async e => {
    e.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token)
      Cookies.set('name', username)
      history.replace('/')
    } else {
      setError(data.error_msg)
    }
  }

  const onCheck = () => {
    setCheck(prev => !prev)
  }

  const onUser = e => {
    setUser(e.target.value)
  }

  const onPassword = e => {
    setPassword(e.target.value)
  }

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <div className="LoginContainer">
          <div className="LoginImage">
            <img
              src="https://res.cloudinary.com/dgzksmwpz/image/upload/v1769860028/Logo_2_dshauo.jpg"
              alt="login website logo"
              height="80px"
            />
          </div>
          <div className="LoginInput">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              id="username"
              className="username"
              onChange={onUser}
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type={check ? 'text' : 'password'}
              id="password"
              className="password"
              onChange={onPassword}
            />
            <div className="checkBox">
              <input type="checkbox" onChange={onCheck} id="checkBox" />
              <label htmlFor="checkBox">Show Password</label>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: username
                  ? 'rgba(8, 140, 3, 1)'
                  : 'rgba(179, 179, 179, 1)',
              }}
            >
              Login
            </button>
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}
export default withRouter(Login)
