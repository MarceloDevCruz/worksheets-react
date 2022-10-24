import { useState, useEffect, useReducer } from 'react'
import { database } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const state = {
  loading: null,
  error: null,
}

const reducer = (state, action) => {

  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const InsertCreateWorksheet = (postCollection) => {

  const [response, dispatch] = useReducer(reducer, state)
  const [cancelled, setCancelled] = useState(false)

  const checkCancelled = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  }

  const insertPost = async (post) => {

    checkCancelled({ type: 'LOADING' })

    try {

      const newPost = { ...post, createdAt: Timestamp.now() }

      const insertedPost = await addDoc(collection(database, postCollection), newPost)

      checkCancelled({
        type: 'INSERTED_DOC',
        payload: insertedPost
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

  return { insertPost, response }
}