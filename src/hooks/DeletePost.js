import { useState, useEffect, useReducer } from 'react'
import { database } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

const state = {
  loading: null,
  error: null,
}

const deleteReducer = (state, action) => {

  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const DeletePost = (postCollection) => {

  const [response, dispatch] = useReducer(deleteReducer, state)
  const [cancelled, setCancelled] = useState(false)

  const checkCancelled = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  }

  const delPost = async (id) => {

    checkCancelled({ type: 'LOADING' })

    try {
      const deletedDocument = await deleteDoc(doc(database, postCollection, id))

      checkCancelled({
        type: 'DELETED_DOC',
        payload: deletedDocument
      })

    } catch (error) {
      checkCancelled({
        type: 'ERROR',
        payload: error.message
      })
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return { delPost, response }
}