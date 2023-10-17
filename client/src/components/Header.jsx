import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-green-800 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className=' font-bold text-sm  sm:text-xl flex flex-wrap'>
                    <span className='text-gray-400'>
                        Saksham
                    </span>
                    <span className='text-gray-900'>
                        Estate
                    </span>
                </h1>
            </Link>
            <form className='bg-lime-400 p-3 rounded-lg flex items-center '>
                <input
                type="text"
                placeholder='Search' 
                className='bg-transparent text-black focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-black'/>
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-white hover:text-black'> Home </li>
                </Link>
                <Link to='/About'>
                <li className=' hidden sm:inline text-white hover:text-black'> About </li>
                </Link>
                <Link to='/sign-in'>
                <li className=' text-white hover:text-black'> Sign in </li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header