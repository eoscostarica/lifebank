import React from 'react'
import * as jwtDecode from 'jwt-decode'

const UserContext = React.createContext()

const getUserFromToken = (token) => {
  const claims = jwtDecode(token)

  return {
    account: claims.sub,
    role: claims?.['https://hasura.io/jwt/claims']['x-hasura-default-role']
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      localStorage.setItem('token', action.payload.token)

      return {
        ...(state || {}),
        ...getUserFromToken(action.payload.token)
      }
    }
    case 'logout': {
      localStorage.removeItem('token')

      return null
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

export const useUser = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error(`useUser must be used within a UserContextProvider`)
  }

  const [user, dispatch] = context
  const login = (token) => dispatch({ type: 'login', payload: { token } })
  const logout = () => dispatch({ type: 'logout' })

  return [
    user,
    {
      login,
      logout
    }
  ]
}

export const UserProvider = (props) => {
  let initialValue

  if (localStorage.getItem('token')) {
    initialValue = getUserFromToken(localStorage.getItem('token'))
  }

  const [state, dispatch] = React.useReducer(userReducer, initialValue)
  const value = React.useMemo(() => [state, dispatch], [state])

  return <UserContext.Provider value={value} {...props} />
}
