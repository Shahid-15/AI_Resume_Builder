import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div >
        <div className='flex justify-center items-center my-10 bg-zinc-800'>

        <SignIn/>

        </div>
      
    </div>
  )
}

export default SignInPage
