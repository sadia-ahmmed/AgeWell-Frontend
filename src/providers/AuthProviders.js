import React, { useState } from 'react'

const AuthContext = React.createContext()

const AuthProvider = (props) => {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userCache, setUserCache] = useState({})
    const [appointmentCache, setAppointmentCache] = useState({})

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn,
                userCache,
                setUserCache,
                appointmentCache,
                setAppointmentCache
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }