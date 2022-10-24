//css
import styles from './Register.module.css'

//hooks
import { useState, useEffect } from 'react'
import { Authentication } from '../../hooks/Authentication'

const Register = () => {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { createUser, error } = Authentication()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrorMessage('')

    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmPassword) {
      setErrorMessage('A senha e a confirmação precisam ser iguais')
      return
    }

    const response = await createUser(user)
    console.log(response);

  }

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
    }
  }, [error])

  return (
    <div className={styles.register}>
      <h1>
        Cadastre-se para criar novas tarefas
      </h1>
      <p>
        Crie sua conta e organize sua rotina com tarefas personalizadas
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label>
          <span>Nome:</span>
          <input
            value={displayName}
            type="text"
            name="name"
            required
            placeholder="Nome do usuário"
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>


        <label>
          <span>Email:</span>
          <input
            value={email}
            type="email"
            name="email"
            required
            placeholder="Email do usuário"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          <span>Senha:</span>
          <input
            value={password}
            type="password"
            name="password"
            required
            placeholder="Digite sua senha"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <label>
          <span>Confirme a senha:</span>
          <input
            value={confirmPassword}
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <button className="btn">Cadastrar</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div >
  )
}

export default Register