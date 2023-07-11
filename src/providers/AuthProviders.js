import React, { useState } from 'react'

const AuthContext = React.createContext()

const AuthProvider = (props) => {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userCache, setUserCache] = useState([])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn,
                userCache,
                setUserCache
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }