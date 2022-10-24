import { database } from '../firebase/config'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const Authentication = () => {

  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  // memoria vazamento
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  // Cancela as ações do state, essa função vai fazer o cleanup 
  function checkCancelled() {
    if (cancelled) {
      return
    }
  }

  // Registrar usuário
  const createUser = async (data) => {
    checkCancelled()

    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, { displayName: data.displayName })

      setLoading(false)

      return user

    } catch (error) {

      let errorMessage = ''

      if (error.message.includes('Password')) {
        errorMessage = 'A senha deve conter pelo menos 6 caracteres'
      } else if (error.message.includes('email-already')) {
        errorMessage = 'Email já cadastrado'
      } else {
        errorMessage = 'Ocorreu um erro, tente mais tarde'
      }

      setLoading(false)
      setError(errorMessage)
    }

  }

  // Fazer logout
  const logout = () => {
    checkCancelled()

    signOut(auth);
  }

  // Fazer login

  const login = async (data) => {
    checkCancelled()

    setLoading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)

    } catch (error) {

      let errorMessage = ''

      if (error.message.includes('user-not-found')) {
        errorMessage = 'Usuário não encontrado'
      } else if (error.message.includes('wrong-password')) {
        errorMessage = 'Senha incorreta'
      } else {
        errorMessage = 'Ocorreu um erro, tente mais tarde'
      }

      setError(errorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }
}