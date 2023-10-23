import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {
    const {currentUser} = useSelector(state => state.user )
  return (
    <header className='bg-gradient-to-t from-white to-lime-400 '>
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
            <ul className='flex gap-4'>
                <Link 
                to='/'>
                    <li className='hidden sm:inline text-black hover:text-green-500'> Home </li>
                </Link>
                <Link 
                to='/About'>
                    <li className=' hidden sm:inline text-black hover:text-green-500'> About </li>
                </Link>
                <Link 
                to='/profile'>
                    {currentUser ? (
                        <img className='rounded-full h-7 w-7 object-cover' src= {currentUser.avatar} alt='profile' />
                    ): < li className=' text-black hover:text-green-500'> Sign in </li>
                    } 
                </Link>
            </ul>
            <form className='bg-gradient-to-t from-white to-lime-400 p-3 rounded-lg flex items-center '>
                <input
                type="text"
                className='bg-transparent text-black focus:outline-none w-24 sm:w-64'
                placeholder='Search' />
                <FaSearch className='text-black'/>
            </form>
        </div>
    </header>
  )
}

export default Header