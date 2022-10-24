//css
import styles from './Login.module.css'

//hooks
import { useState, useEffect } from 'react'
import { Authentication } from '../../hooks/Authentication'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { login, error } = Authentication()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrorMessage('')

    const user = {
      email,
      password
    }

    const response = await login(user)
    console.log(response)

  }

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
    }
  }, [error])

  return (
    <div className={styles.login}>
      <h1>
        Entrar
      </h1>
      <p>
        Faça login para usar a aplicação
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>

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

        <button className="btn">Entrar</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default Login