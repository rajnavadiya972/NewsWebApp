import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export default function ResetPassForm() {
  const [invalidUser, setInvalidUser] = useState("");
  //while refreshing form showing so we use busy
  const [Busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [NewPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [userdata,setUserdata]=useState({
    token,
    id,
  })
  

  const verifyToken = async () => {
    setUserdata({token:token,id:id})
    console.log(userdata);
    try {
      const { data } = await axios.post('/verify-token-Media',{
        userdata
      });
      if (data.success === "false") {
        setInvalidUser(data.message);
      }
      console.log(data);
      console.log("Setting false");
      setBusy(false);
    } catch (e) {
      if (e?.response?.data) {
        const { data } = e.response;
        if (!data.success) return setInvalidUser(data.error);
      }
      console.log(e);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    setNewPassword({ ...NewPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = NewPassword;
    if (password.trim().length < 8 || password.trim().length > 20) {
      return setError("Password Must be 8 to 20 character long");
    }

    if (password !== confirmPassword) {
      return setError("Password and Confirm Password must match");
    }

    try {
      setBusy(true);
      const { data } = await axios.post(
        '/reset-password-media',
        { userdata,password }
      );
      console.log(data);
      setBusy(false);
      if (data.success === "true") {
        setSuccess(true);
        setError("");
      }
      if (data.success === "false") {
        return setError(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (invalidUser)
    return (
      <div className="max-w-screen-sm m-auto pt-40">
        <h1 className="text-center text-3xl text-gray-500 mb-3">
          {invalidUser}
        </h1>
      </div>
    );

  if (Busy)
    return (
      <div className="max-w-screen-sm m-auto pt-40">
        <h1 className="text-center text-3xl text-gray-500 mb-3">
          Wait for moment while we verify
        </h1>
      </div>
    );

  if (success)
    return (
      <div className="max-w-screen-sm m-auto pt-40">
        <h1 className="text-center text-3xl text-gray-500 mb-3">
          Password Reset Successfully
        </h1>
      </div>
    );

  return (
    <div className="max-w-screen-sm m-auto pt-10 h-full flex flex-row">
      <div className="basis-2/3">
        <div className="space-y-8">
          <h1 className="text-center text-3xl text-gray-500 mb-300">
            Reset Password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="shadow w-full rounded-lg p-10"
          >
            {error && (
              <p className="text-center p-2 mb-3 bg-red-500 text-white">
                {error}
              </p>
            )}

            <div className="space-y-8">
              <input
                placeholder="Password"
                name="password"
                onChange={handleOnChange}
                type="password"
                className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
              />
              <input
                type="password"
                name="confirmPassword"
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className=" px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
              />
              <input
                type="submit"
                value="reset-password "
                className="bg-gray-500 w-full py-3 text-white rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
}
