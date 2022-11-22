// router
import { NavLink } from 'react-router-dom'

// components
import NavBar from './NavBar'

//hook
import { FaAlignJustify, FaWindowClose } from 'react-icons/fa'
import { useState, useEffect } from 'react'

//css
import styles from './Header.module.css'

const Header = () => {

  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  const mobileMenuShow = () => {
    setOpen(!open)
  }

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWidth(window.innerWidth)
      if (width > 768) return setOpen(false)
    })
  }, [width])

  return (
    <nav className={styles.nav}>

      <div className={styles.header}>
        <NavLink to="/">
          <span className={styles.logo} >uDo<span className={styles.logoStyle}>ckers</span></span>
        </NavLink>

        {!open ? (<FaWindowClose className={styles.mobileMenu} onClick={mobileMenuShow} />)
          : (<FaAlignJustify className={styles.mobileMenu} onClick={mobileMenuShow} />)}
      </div>

      {!open && <NavBar />}

    </nav >
  )
}

export default Header