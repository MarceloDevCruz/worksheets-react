// imports de css
import styles from './Home.module.css'

// user
import { AuthenticationContextValue } from '../../context/AuthenticationContext'

// page
import Login from '../Login/Login'
import Register from '../Register/Register'

// img
import astronaut from '../../img/astronaut.png'

const Home = () => {

  const { user } = AuthenticationContextValue()
  return (

    <div>
      {!user && (
        <>
          <h1>Faça login e crie novas Worksheets, ou se cadastre agora mesmo!</h1>
          <div className={styles.home}>
            <div className={styles.login}>
              <Login />
            </div>
            <div className={styles.register}>
              <Register />
            </div>
          </div>
        </>)}
      {user && (
        <>
          <h2>Crie novas Worksheets, e organize suas tarefas diárias</h2>
          <div className={styles.flexHome}>
            <div className={styles.text}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                nobis alias officiis corporis beatae ab hic vel sit eligendi architecto
                repudiandae doloribus nam dolor tempore laborum libero quae, quis optio enim?
                Consequatur error commodi doloremque quam atque! Doloremque odio eius possimus mollitia rem.
                Id vitae repellendus beatae fugit ipsum, molestias sunt est non totam iusto vero unde provident
                assumenda nam repellat ab animi, dolores sint natus officia corporis aliquid.
                Repellendus quae molestiae necessitatibus doloremque totam error reiciendis, similique temporibus esse?</p>
            </div>
            <div>
              <img src={astronaut} alt='Astronauta com computador' className={styles.img}></img>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home