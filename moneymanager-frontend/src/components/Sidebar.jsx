import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Sidebar = ({activeMenu}) => {
    const {user}=useContext(AppContext);
    const navigate=useNavigate();
    
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white dark:bg-slate-900 border-r border-gray-200/50 dark:border-slate-800/80 p-5 sticky top-[61px] z-20 transition-all duration-300">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
            {user?.profileImageUrl ?(
                <img src={user?.profileImageUrl || ""} alt="profile image"  className="w-20 h-20 bg-slate-400 rounded-full"/>
            ):(
                <User className="w-20 h-20 text-xl text-purple-600 dark:text-purple-400"/>
            )}
            <h5 className="text-gray-950 dark:text-slate-100 font-medium leading-6">{user?.fullName || ""}</h5>
        </div>
        {SIDE_BAR_DATA.map((item,index)=>(
           
              <button 
              onClick={()=>navigate(item.path)}
              key={`menu_${index}`}
              className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors duration-200 ${
                activeMenu===item.label 
                  ? "text-white bg-purple-800 font-medium shadow-md shadow-purple-900/10" 
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-purple-900 dark:hover:text-purple-400"
              }`}>
              <item.icon className="text-xl"/>
              {item.label}
            </button>
            
        ))}
    </div>
  )
}

export default Sidebar