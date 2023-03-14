import React from "react";
// import InfluencerHeader from "./InfluencerHeader";
import Navbar from "./Navbar";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoCall } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const MediaProfileEdit = () => {

  const tempPhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QY2ioIRa17CorwDpwkHIujVaLvc6R_FpMA&usqp=CAU"
  const navigate = useNavigate();
  const location = useLocation();
  const sleep = ms => new Promise(r => setTimeout(r, ms));


  const [userdata, setUserdata] = useState({});


  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserdata({ ...userdata, [name]: value });
  }

  const baseUrl = "https://api.cloudinary.com/v1_1/dhq2fxiej/image/upload/";
  const preset = "newsApp";
  const [url, setUrl] = useState();
  const [profile, setProfile] = useState("");
  const imageupload = async (e) => {
    const data = new FormData();
    data.append("file", profile);
    data.append("upload_preset", preset);
    data.append("cloud_name", "dhq2fxiej");
    try {
      // setLoading(true);
      await axios.post(baseUrl, data)
        .then(res => {
          setUrl(res.data.secure_url)
          // setPostInfo({ ...postInfo, image: res.data.secure_url })
        });
    } catch (err) {
      //   toast.error("image not uploaded");
      console.error(err);
      return;
    }
  }

  const imageUpdate = async () => {
    const res = await axios.put("/EditMediaProfilePhoto", { url });
    toast.success("Profile photo updated");
  }

  useEffect(() => {
    if (url) {
      imageUpdate();
    }
  }, [url]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/EditMediaProfile", userdata);
      const data = res.data;
      setUserdata(data.data)
      if (data.success === true) {
        toast.success(data.message);
        await sleep(1500)
        navigate("/MediaProfile")
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    setUserdata(location.state.data)
  }, [])

  return (
    <div>
      <Navbar />

      <div>
        <div class="py-8 px-3 items-center">
          <div class="bg-white w-full max-w-4xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <h4 class="flex font-bold justify-center p-3 text-[26px]">
              Edit Profile
            </h4>
            <div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-200  w-5/6 max-md:w-full mt-10 rounded-lg">
                  <div className="flex items-center justify-center pt-10 flex-col">
                    <img
                      src={userdata.url != null ? userdata.url : tempPhoto}
                      alt="No available"
                      className="rounded-full w-32"
                    ></img>

                    <h1 className="text-gray-900 font-semibold text-xl mt-5 p-3">
                      {userdata.username}

                    </h1>
                    <h3 className="text-gray-400 text-sm">Media Reporter</h3>
                    <h3 className="text-gray-500 text-sm">
                      {(userdata.city != null ? userdata.city : "City") + ", " + (userdata.state != null ? userdata.state : "State") + ", " + (userdata.country != null ? userdata.country : "Country")}
                    </h3>
                    <h3 className="text-gray-500 text-sm pb-10">
                      {userdata.email}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-10">
                <div className="bg-gray-200 w-5/6 max-md:w-full mt-7 ">
                  <div className="flex items-center justify-center pt-7 flex-col">
                    <h1 className="text-gray-900 font-semibold text-xl mt-5 p-3 text-center">
                      Upload image
                    </h1>

                    <form class="flex items-center space-x-6" encType="multipart/form-data">
                      <div class="shrink-0">
                        <img
                          class="h-16 w-16 object-cover rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QY2ioIRa17CorwDpwkHIujVaLvc6R_FpMA&usqp=CAU"
                          alt="Current pictures"
                        />
                      </div>
                      <label class="block">
                        {/* <span class="sr-only">Choose profile photo</span> */}
                        <input
                          type="file"
                          enctype="multipart/form-data"
                          class="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-violet-100
                                  "
                          name="profile"
                          onChange={(e) => { setProfile(e.target.files[0]) }}
                        />
                      </label>
                    </form>
                    <div className="flex-justify-between p-3 px-14">
                      <button
                        onClick={imageupload}
                        class="px-5 py-3 text-md justify-center item-center text-center tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <hr></hr>
              <br></br>
              <div className="px-2 flex">
                <div>
                  <h2 class="absolute text-lg font-semibold px-3">
                    User Details :
                  </h2>
                </div>
              </div>
              <br></br>
              <br></br>
              <div>
                <div class="md:grid grid-cols-12 flex flex-col md:items-center gap-4 p-4">
                  <div class="col-span-6 relative">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Username
                    </span>
                    <input
                      type="text"
                      name="username"
                      defaultValue={userdata.username}
                      // value={userdata.age}
                      onChange={handleInput}

                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>
                  <div class="col-span-6 relative">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Mobile No.
                    </span>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={userdata.phone}
                      // value={userdata.age}
                      onChange={handleInput}

                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>
                  <div class="col-span-6 relative ">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Your FirstName
                    </span>

                    <input
                      type="text"
                      name="firstname"
                      defaultValue={userdata.firstname}
                      // value={userdata.fname}
                      onChange={handleInput}
                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>
                  <div class="col-span-6 relative ">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Your LastName
                    </span>

                    <input
                      type="text"
                      name="lastname"
                      defaultValue={userdata.lastname}
                      // value={userdata.lname}
                      onChange={handleInput}
                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>

                  <div class="col-span-6 relative">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Your City
                    </span>
                    <input
                      type="text"
                      name="city"
                      defaultValue={userdata.city}
                      // value={userdata.city}
                      onChange={handleInput}
                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>

                  <div class="col-span-6 relative">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Your State
                    </span>
                    <input
                      type="text"
                      name="state"

                      defaultValue={userdata.state}
                      // value={userdata.state}
                      onChange={handleInput}
                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>

                  <div class="col-span-6 relative">
                    <span class="absolute bg-white left-3 -top-[12px] px-2">
                      Your Country
                    </span>
                    <input
                      type="text"
                      name="country"

                      defaultValue={userdata.country}
                      // value={userdata.country}
                      onChange={handleInput}

                      class="text-[15px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                    />
                  </div>
                </div>
                <br></br>
                <div class="mx-4">
                  <button
                    onClick={updateProfile}
                    class="px-5 py-3 text-md justify-center item-center text-center tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Update Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default MediaProfileEdit;
