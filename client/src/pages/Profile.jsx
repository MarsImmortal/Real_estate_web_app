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

const Profile = () => {
  const fileRef = useRef(null) 
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});  

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
    setFormData;
    
  }
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
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
        <input type="text" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} className="border p-3 rounded-3xl" id="username" />
        <input type="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} className="border p-3 rounded-3xl" id="email" />
        <input type="text" placeholder="password" className="border p-3 rounded-3xl" onChange={handleChange} id="password" />
        <button className="uppercase text-white bg-green-500 hover:opacity-75 rounded-3xl disabled:opacity-30  p-3">Update</button>
      </form>
      <div className="gap-4 flex flex-wrap justify-between ">
        <span className=" text-red-700 hover:text-red-400 cursor-pointer p-3">Delete Account</span>
        <span className=" text-red-700 hover:text-red-400 cursor-pointer p-3">SignOut</span>
      </div>
    </div>
  )
}

export default Profile