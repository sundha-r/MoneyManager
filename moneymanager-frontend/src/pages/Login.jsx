

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { validateEmail } from "../util/validation";
import axiosconfig from "../util/axiosConfig";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";

const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[error,setError]=useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const {setUser}=useContext(AppContext);

  const navigate =useNavigate();

  const handleSubmit=async(e)=>{

    e.preventDefault();
    setIsLoading(true);
    //basic validation
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

            //login api cal
            try{
                  const response=await axiosconfig.post(API_ENDPOINTS.LOGIN,{
                    email,
                    password
                  })
                  const {token, user}=response.data;
                  if(token){
                    localStorage.setItem("token",token);
                    setUser(user);
                    navigate("/dashboard")
                  }

            }catch(err){
              if(err.response && err.response.data.message){
                setError(err.response.data.message);
              }
              else{
                console.error("Something went wrong",err);
                setError(err.message);
              }


            }finally{
              setIsLoading(false);
            }
  }


  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* background image with blur */}
        <img src={assets.login} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

        <div className="raltive z-10 w-full max-w-lg px-6">

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-semibold text-black text-center mb-2">
                Welcome Back
              </h3>

              <p className="text-sm text-slate-700 text-center mb-8">
                Please enter your details to login
              </p>

              <form  onSubmit={handleSubmit} className="spac-y-4">
                
                  {/* for email */}
                  <Input
                      label="Email address"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="name@example.com"
                      type="text"
                  />
                  
                  {/* for password */}

                    <Input
                      label="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="********"
                      type="password"
                  />
                
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
                      Logging in...
                    </>
                   )
                   :
                   ("LOGIN")
                    }

                </button>
                <p className="text-sm text-slate-800 text-center mt-6">
                  Don't have an account?
                  <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">signup</Link>

                </p>
              </form>
          </div>

        </div>
    </div>
  )
}

export default Login