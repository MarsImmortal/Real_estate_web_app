import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'; 
import axios from 'axios';

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value, 
    });
  }; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      setLoading(true);
      const res = await axios.post('/api/auth/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.data;
      if (data.success === false)
      {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled = {loading} className='p-3 bg-green-600 rounded-3xl uppercase hover:opacity-80 disabled:opacity-20 '>{loading ? 'loading...' : 'Register Now !'}</button>
      </form>
        <div className='text-center flex gap-2 mt-3'>
          Already have an account ? 
          <Link to='/sign-in' className='text-blue-600 hover:underline'> Sign In</Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp