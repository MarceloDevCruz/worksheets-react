import styles from './Post.module.css'

import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { DeletePost } from '../hooks/DeletePost'

const Post = ({ post }) => {

  const { delPost } = DeletePost('worksheet')

  return (
    <div>
      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.post}>
        <ul key={`${post.id}${post.valor}`}>
          <li>Valor: R${post.valor}</li>
          <li>Criado Por: {post.displayName}</li>
          <li>Categoria: {post.category}</li>
          <li>
            <div className={styles.events}>
              <button className={styles.edit}><Link to={`/worksheets/edit/${post.id}`}><FaPencilAlt /></Link></button>
              <button onClick={() => delPost(post.id)} className={styles.delete}><FaTrash /></button>
            </div>
          </li>
        </ul>
      </div>
      <p className={styles.description}>{post.description}</p>
    </div >
  )
}

export default Post