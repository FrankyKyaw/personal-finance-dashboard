"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
const SignIn = () => {
    const {data: session} = useSession()
  return (
    <>
        {session ? (
            <>
                <h1></h1>
            </>
        ): (
            <h1>You are not logged in. </h1>
        )}
    </>
  )
}

export default SignIn