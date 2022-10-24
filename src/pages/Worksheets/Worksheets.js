import styles from './Worksheets.module.css'

import { Link } from 'react-router-dom'

//hooks
import { FetchWorksheet } from '../../hooks/FetchWorksheet'
import { AuthenticationContextValue } from '../../context/AuthenticationContext'

//components
import Post from '../../componets/Post'


const Worksheets = () => {

  const { user } = AuthenticationContextValue()
  const uid = user.uid

  const { posts } = FetchWorksheet("worksheet", uid)

  return (
    <div className={styles.Worksheet}>
      <h1> Seus Worksheets</h1>
      {posts && posts.map((post) => (
        <Post key={post.id} post={post} />
      ))
      }
      {
        posts && posts.length === 0 && (
          <div>
            <p>Você ainda não possui worksheets, crie agora mesmo...</p>
            <button className={styles.btnNew}><Link to="/createNew">Crie Worksheet</Link></button>
          </div>
        )
      }
    </div >
  )
}

export default Worksheets