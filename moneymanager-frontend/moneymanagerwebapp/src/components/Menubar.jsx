import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X, Sun, Moon } from "lucide-react";
import { assets } from "../assets/assets";
import Sidebar from "./Sidebar";


const Menubar = ({activeMenu}) => {
    const [openSideMenu,setOpenSideMenu]=useState(false);
    const [showDropdown,setShowDropdown]=useState(false);
    const dropdownRef=useRef(null);
    const {user,clearUser,theme,toggleTheme}=useContext(AppContext);
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    }

    useEffect(()=>{
        const handleclickOutside=(event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setShowDropdown(false);
            }
        }
        if(showDropdown){
                document.addEventListener("mousedown",handleclickOutside)
            }
            return ()=>{
                document.removeEventListener("mousedown",handleclickOutside)
            }
    },[showDropdown])


  return (
        
    <div className="flex items-center justify-between gap-5 bg-white dark:bg-slate-900 border-b border-gray-200/50 dark:border-slate-800/80 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 transition-colors duration-300">
        {/* left side - menu button and title */}
            <div className="flex items-center gap-5">
                <button 
                    onClick={()=> setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 p-1 rounded transition-colors">
                    {openSideMenu ? (
                        <X className="text-2xl"/>
                    ):(
                        <Menu className="text-2xl"/>
                    )}
                </button>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-10 w-10 rounded-full" />
                    <span className="text-lg font-medium text-black dark:text-white truncate">Money Manager</span>
                </div>
            </div>
        {/* right side - theme toggle & profile picture */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-all duration-300 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer hover:shadow-sm"
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-amber-500 hover:rotate-90 transition-transform duration-300" />
                    ) : (
                        <Moon className="w-5 h-5 text-purple-700 hover:-rotate-12 transition-transform duration-300" />
                    )}
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={()=>setShowDropdown(!showDropdown)}
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full overflow-hidden transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 dark:focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer">
                        {user?.profileImageUrl ? (
                            <img src={user.profileImageUrl} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="text-purple-600 dark:text-purple-400"/>
                        )}
                    </button>
                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800 py-1 z-50">
                            {/* User info */}
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                                        {user?.profileImageUrl ? (
                                            <img src={user.profileImageUrl} alt="profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-purple-900 dark:text-purple-400"/>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-slate-100 truncate">
                                            {user?.fullName}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* dropdown options //logout ,firstname */}
                            <div className="py-1">
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
                                    <LogOut className="w-4 h-4 text-gray-500 dark:text-slate-400"/>
                                    <span>Logout</span>

                                </button>
                            </div>
                        </div>


                    )}
                </div>
            </div>
            

        {/* Mobile view */}
        {openSideMenu && (
            <div className="fixed left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 lg:hidden z-20 top-[73px]">
                <Sidebar activeMenu={activeMenu}/>
            </div>
        )}
    </div>
  ) 
}

export default Menubar