//css
import styles from './CreateWorksheets.module.css'

//hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContextValue } from '../../context/AuthenticationContext'
import { InsertCreateWorksheet } from '../../hooks/InsertCreateWorksheet'

const CreateWorksheets = () => {

  const navigate = useNavigate('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [valor, setValor] = useState('')
  const [category, setCategory] = useState('')
  const [formError, setError] = useState('')

  const { user } = AuthenticationContextValue()
  const { insertPost, response } = InsertCreateWorksheet('worksheet')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    insertPost({
      title,
      description,
      valor,
      category,
      uid: user.uid,
      displayName: user.displayName,
    })

    navigate('/')
  }

  return (
    <div className={styles.createWorksheet}>
      <h1>Crie um novo orçamento</h1>
      <p>Novos orçamentos para serem gerênciados</p>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Título: </span>
          <input type="text"
            name="text"
            required
            placeholder='Escolha um título para seu Worksheet'
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

        <button className={styles.btnNew}>Novo Worksheet</button>
      </form>
      {response.Error && <p className="error">{response.Error}</p>}
      {formError && <p className="error">{formError}</p>}
    </div>
  )
}

export default CreateWorksheets