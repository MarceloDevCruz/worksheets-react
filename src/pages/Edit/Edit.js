import styles from "./Edit.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticationContextValue } from '../../context/AuthenticationContext'
import { LoadPost } from "../../hooks/LoadPost";
import { UpdatePost } from '../../hooks/UpdatePost';

const Edit = () => {
  const { id } = useParams();
  const { post } = LoadPost("worksheet", id);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [valor, setValor] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setDescription(post.description)
      setValor(post.valor)
      setCategory(post.category)
    }

  }, [post])

  const { user } = AuthenticationContextValue();

  const { updatePost, response } = UpdatePost('worksheet')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      title,
      description,
      valor,
      category,
      uid: user.uid,
      displayName: user.displayName,
    }

    updatePost(id, data)

    navigate('/worksheets')
  }


  return (
    <div className={styles.edit}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>Edite seu post... </p>
          <form onSubmit={handleSubmit}>

            <label>
              <span>Título: </span>
              <input type="text"
                name="text"
                required
                placeholder='Escolha um título para seu orçamento'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <label>
              <span>Descrição:</span>
              <textarea
                name="body"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </label>

            <label>
              <span>Valor: </span>
              <input type="number"
                name="number"
                required
                placeholder='Valor do orçamento'
                onChange={(e) => setValor(e.target.value)}
                value={valor}
              />
            </label>

            <label>
              <span>Categoria: </span>
              <input type="text"
                name="category"
                required
                placeholder='Categoria do seu worksheet'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </label>

            <button className={styles.editbtn}>Editar</button>
          </form>
          {response.formError && <p className="error">{response.formError}</p>}
        </>
      )}
    </div>
  )
}

export default Edit