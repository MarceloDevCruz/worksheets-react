import { useState, useEffect, useReducer } from 'react'
import { database } from '../firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

const state = {
  loading: null,
  error: null,
}

const updateReducer = (state, action) => {

  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const UpdatePost = (postCollection) => {

  const [response, dispatch] = useReducer(updateReducer, state)
  const [cancelled, setCancelled] = useState(false)

  const checkCancelled = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  }

  const updatePost = async (uid, data) => {

    checkCancelled({ type: 'LOADING' })

    try {

      const postRef = await doc(database, postCollection, uid)

      const updatedPost = await updateDoc(postRef, data)


      checkCancelled({
        type: 'UPDATED_DOC',
        payload: updatedPost
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

  return { updatePost, response }
}