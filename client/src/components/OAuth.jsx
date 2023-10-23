import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((signInResult) => {
        const result = signInResult;
        const postData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };

        return axios.post('/api/auth/google', postData);
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch(signInSuccess(data));
        navigate('/'); 
      })
      .catch((error) => {
        console.log('could not sign in with Google', error);
      });
  };

  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-700 p-3 text-slate-200 hover:opacity-60 rounded-3xl uppercase">
      Continue With Google
    </button>
  );
};

export default OAuth;
