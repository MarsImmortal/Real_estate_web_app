import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure , signInSuccess } from '../redux/user/userSlice';


const SignIn = () => {
  const [userData, setUserData] = useState({});
  // const [error, setError] = useState(null);
  const { loading, error} = useSelector((state) => state.user); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      // setError('Please fill in all required fields.');
      return;
    }
     dispatch(signInStart());
    axios
      .post('/api/auth/signin', userData)
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data.success === false) {
          // Display the error message and status code
          dispatch(signInFailure(error));
        } else {
          dispatch(signInSuccess(data));
          navigate('/'); 
        }
      })
      .catch((error) => {
        dispatch(signInFailure(error.response.data.message));
      })
  };
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'> 
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled = {loading} className='p-3 bg-green-600 rounded-3xl uppercase hover:opacity-80 disabled:opacity-20 '>{loading ? 'loading...' : 'Sign in'}</button>
      </form>
        <div className='text-center flex gap-2 mt-3'>
          Dont have an account ? 
          <Link to='/sign-up ' className='text-blue-600 hover:underline'> Sign Up</Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn