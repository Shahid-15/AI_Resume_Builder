import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

const Header = () => {
    const {user,isSignedIn} = useUser()
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>

     <img src={'/logo.svg'} width={100} height={100} alt="notfound" />

     {isSignedIn?
     <div className='flex gap-2 items-center'>

        <Link to={'/dashboard'}>
        <Button className='rounded-xl' variant="outline">Dashboard</Button>
        </Link>

        <UserButton/>
     </div>:

<Link to={'/auth/sign-in'}>
<Button className=' text-white rounded-xl'>Get Started</Button>
  </Link>
     }


      
    </div>
  )
}

export default Header
