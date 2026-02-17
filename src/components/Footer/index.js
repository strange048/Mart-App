import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CiShoppingCart, CiLogout, CiHome} from 'react-icons/ci'
import './index.css'

const Footer = props => {
  const {history, location} = props
  const {pathname} = location

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="Footer">
      <Link to="/">
        <CiHome className={pathname === '/' ? 'activeFooterBg' : 'icons'} />
      </Link>

      <Link to="/cart">
        <CiShoppingCart
          className={pathname === '/cart' ? 'activeFooterBg' : 'icons'}
        />
      </Link>

      <CiLogout className="icons" onClick={onLogout} />
    </div>
  )
}

export default withRouter(Footer)
