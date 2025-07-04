import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/Inputs/input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
// import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
// import uploadImage from "../../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const Navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //SignUp API call
    try {
      // if (profilePic) {
      //   const imageUploadRes = await uploadImage(profilePic);
      //   profileImageUrl = imageUploadRes.imageUrl || "";
      // }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name: fullName,
        email,
        password,
        // profileImageUrl,
      })

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        Navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="w-[90vw] h-[99vh] md:w-[33vw] p-5 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black mt-4">
        Create an Account
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-5">
        Join us today by entering your information below.
      </p>

      <form onSubmit={handleSignUp}>
{/*         <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} /> */}

        <div className="grid grid-cols-1 md:grid-cols-1 gap-0.5">
          <Input
            value={fullName}
            onChange={({ target }) => setfullName(target.value)}
            label="Full Name"
            placeholder="Hare"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Hare@exmaple.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>
        {Error && <p className="text-red-500 text-xs pb-2">{Error}</p>}

        <button className="btn-primary" type="submit">
          SIGN UP
        </button>
        <p className="text-[13px] text-slate-800 mt-1">
          Already have an account?{" "}
          <button
            className="font-medium text-primary hover:underline cursor-pointer mb-4"
            onClick={() => {
              setCurrentPage("login");
            }}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
