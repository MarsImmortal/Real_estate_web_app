import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import axios from 'axios';

const Profile = () => {
  const fileRef = useRef(null) 
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});  
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
// console.log(formData);
  //firebase storage 
  // allow read;
  // allow write: if
  // request.resource.size <2*1024*1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(()=>{
    if (file){
      handleFileUpload(file);
    }
    
  }, [file]);

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime +  file.name; 
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file); 

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
      setFilePerc(Math.round(progress) );
    },
    (error) => {
      setFileUploadError(true); 
    },
    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadUrl) => {
        setFormData({...formData, avatar: downloadUrl});
      })
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    axios
      .post(`/api/user/update/${currentUser._id}`,formData)
      .then( async (res) =>{
        const data = await res.data;
        // console.log(data);
        if (data.sucess === false) {
          dispatch(updateUserFailure(data.message));
          return;
        }
        else{
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true);
        }
      })
      .catch ((error) => {
      dispatch(updateUserFailure(error.message));
      })
  }

const handleDeleteUser = async () =>
{

  dispatch(deleteUserStart());
  axios
  .delete(`/api/user/delete/${currentUser._id}`)
  .then( async (res) =>{
    const data = await res.data;
    // console.log(data);
    if (data.sucess === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    else{
      dispatch(deleteUserSuccess(data))
      // dispatch(signOutUserStart());
    }
  })
  .catch ((error) =>{
    dispatch(deleteUserFailure(error.message));
  })
}

const handleSignOut = async() => {
  dispatch(signOutUserStart());
  axios.get('/api/auth/signout')
  .then(async (res)=>{
    const data = await res.data;
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data))
  }).catch((error)=>{
    dispatch(deleteUserFailure(data.message));
  });

}

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*  "/>
        <img onClick= {()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-3" />
        <p className=' text-center mx-auto self-center'>
          {fileUploadError ?
          filePerc>0 && filePerc<100 ? (
            <span className = 'text-slate-700'>
              {`Uploading ... ${filePerc}%`}
            </span>)
            :
          filePerc ===100 ? (
            <span className = 'text-green-700'> 
            image successfully uploaded
            </span>)
            :
            (<span className='text-red-700'> 
            Error uploading image (image must be less than 2 mb )
            </span>) :
            ("") 
          }
        </p>
        <input type="text" placeholder="username" 
          defaultValue={currentUser.username} 
          id="username" 
          className="border p-3 rounded-3xl" 
          onChange={handleChange} 
          />
        <input type="email" 
          placeholder="email" 
          defaultValue={currentUser.email} 
          id="email" 
          className="border p-3 rounded-3xl" 
          onChange={handleChange} 
          />
        <input type="password" 
          placeholder="password" 
          className="border p-3 rounded-3xl" 
          id="password" 
          onChange={handleChange} 
          />
        <button disabled = {loading}
        className="uppercase 
        text-black 
        bg-green-500 
        hover:opacity-75 
        rounded-3xl 
        disabled:opacity-30  
        p-3">
          {loading ? 'loading...' : 'Update'}
        </button>
      </form>
      <div className="gap-4 flex flex-wrap justify-between ">
        <span onClick = {handleDeleteUser} className=" text-red-700 hover:text-red-400 cursor-pointer p-3">Delete Account</span>
        <span onClick = {handleSignOut} className=" text-red-700 hover:text-red-400 cursor-pointer p-3">SignOut</span>
      </div>
      <p 
      className='text-red-700 mt-5'>
        {error? error : "" }
      </p>
      <p 
      className='text-green-700 mt-5'>
        {updateSuccess ? "User info updated succesfully ! " : ""}
      </p>
    </div>
  )
}

export default Profile