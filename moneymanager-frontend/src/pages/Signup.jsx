import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../util/validation";
import axiosconfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { uploadProfileImage } from "../util/uploadProfileImage";


const Signup = () => {
  
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[error,setError]=useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[profilePhoto,setProfilePhoto]=useState(null);

  const navigate =useNavigate();

  const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        let profileImageUrl="";

        //basic validation

        if(!fullName.trim()){
          setError("Please enter your fullname");
          setIsLoading(false);
          return;
        }

        if(!validateEmail(email)){
          setError("Please enter valid email address");
          setIsLoading(false);
          return;
        }

        if(!password.trim()){
          setError("Please enter your password");
          setIsLoading(false);
          return;
        }

        setError("");
        //signup api call
        try{

          //upload image if present
          if(profilePhoto){
            const imageUrl=await uploadProfileImage(profilePhoto);
            profileImageUrl=imageUrl || "";
          }


          const response=await axiosconfig.post(API_ENDPOINTS.REGISTER,{
            fullName,
            email,
            password,
            profileImageUrl
          })
          if(response.status===201){
            toast.success("Profile created successfully.",{
              duration:4000
            });
            navigate("/login");
          }
        } catch(err){
          if(err.response && err.response.data.message){
            setError(err.response.data.message);
          } else {
            console.error("Something went wrong",err)
            setError(err.message);
          }
        } finally{
          setIsLoading(false);
        }
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* background image with blur */}
        <img src={assets.login} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

        <div className="raltive z-10 w-full max-w-lg px-6">

          <div className="bg-white dark:bg-slate-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
              <h3 className="text-2xl font-semibold text-black dark:text-white text-center mb-2">
                Create An Account
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 text-center mb-8">
                Start tracking your spendings by joining with us.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="justify-center mb-6">
                  <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {/* for name */}
                  <Input
                      label="Full Name"
                      value={fullName}
                      onChange={(e)=>setFullName(e.target.value)}
                      placeholder="John Doe"
                      type="text"
                  />
                  {/* for email */}
                  <Input
                      label="Email address"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="name@example.com"
                      type="text"
                  />
                  
                  {/* for password */}
                  <div className="col-span-2">

                     <Input
                      label="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="********"
                      type="password"
                  />
                  </div>
                  
                </div>
                {error && (
                  <p className="text-red-800 text-sm text-center bg-red-100 p-2 rounded  mb-4">
                      {error}
                  </p>
                )}
                
                <button disabled={isLoading} className={`w-full py-3 text-lg font-medium text-white 
                                  bg-purple-900 hover:bg-purple-800 
                                  rounded-lg transition-all duration-300 
                                  cursor-pointer
                                  flex items-center
                                  justify-center gap-2
                                  ${isLoading ? 'opacity-60 cursor-not-allowed':''}`}
                                  type="submit">
                    {isLoading ? (
                        <>
                            <LoaderCircle className="animate-spin w-5 h-5"/>
                            Signing Up....
                        </>
                    ):(
                      "SIGN UP"
                    )}
                </button>

                <p className="text-sm text-slate-800 dark:text-slate-300 text-center mt-6">
                  Already have an account?
                  <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>

                </p>
              </form>
          </div>

        </div>
    </div>
  )
}

export default Signup