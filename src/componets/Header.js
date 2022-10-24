// router
import { NavLink } from 'react-router-dom'

//hook
import { Authentication } from '../hooks/Authentication'
import { AuthenticationContextValue } from '../context/AuthenticationContext'

//css
import styles from './Header.module.css'

const Header = () => {

  const { user } = AuthenticationContextValue()
  const { logout } = Authentication()


  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <span className={styles.logo} >uDo<span className={styles.logoStyle}>ckers</span></span>
      </NavLink>

      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink to="/worksheets"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Meus Worksheets
              </NavLink>
            </li>

            <li>
              <NavLink to="/createNew"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo Worksheet
              </NavLink>
            </li>
          </>
        )}


        {!user && (
          <>
            <li>
              <NavLink to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>

            <li>
              <NavLink to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <button className="logout" onClick={logout}>Sair</button>
          </li>
        )}

      </ul>

    </nav >
  )
}

export default Header