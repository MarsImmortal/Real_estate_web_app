import {Link} from 'react-router-dom'; 

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='p-3 bg-green-600 rounded-3xl uppercase hover:opacity-80 disabled:opacity-20 '>Register Now</button>
        <div className='text-center flex gap-2 mt-3'>
          Already have an account ? 
          <Link to='/sign-in' className='text-blue-600 hover:underline'> Sign In</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp