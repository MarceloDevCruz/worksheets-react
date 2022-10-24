import { useState, useEffect } from 'react'
import { database } from '../firebase/config'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore'

export const FetchWorksheet = (Collection, uid = null) => {

  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)

  // memory leak
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    async function loadPosts() {
      if (cancelled) {
        return
      }

      const collectionRef = await collection(database, Collection)

      try {
        let queryOrder

        queryOrder = await query(
          collectionRef,
          where("uid", "==", uid), orderBy('createdAt', 'desc')
        )

        await onSnapshot(queryOrder, (querySnapshot) => {
          setPosts(
            querySnapshot.docs.map((date) => ({
              id: date.id,
              ...date.data(),
            }))
          )
        })

      } catch (error) {
        setError(error.message)
      }

    }

    loadPosts()
  }, [Collection, uid, cancelled, error])

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return { posts }
}

