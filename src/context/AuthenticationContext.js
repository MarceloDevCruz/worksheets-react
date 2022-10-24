import { useContext, createContext } from 'react'

const AuthenticationContext = createContext()

export function AuthenticationContextProvider({ children, value }) {
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export function AuthenticationContextValue() {
  return useContext(AuthenticationContext)
}