import { useSelector } from "react-redux"

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-3" />
        <input type="text" placeholder="username" className="border p-3 rounded-3xl" id="username" />
        <input type="email" placeholder="email" className="border p-3 rounded-3xl" id="email" />
        <input type="text" placeholder="password" className="border p-3 rounded-3xl" id="password" />
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