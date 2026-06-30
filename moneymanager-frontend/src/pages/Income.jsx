import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";
import axiosconfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview  from "../components/IncomeOverview";

const Income = () => {
  useUser();

  const[incomeData,setIncomeData]=useState([]);
  const[categories,setCategories]=useState([]);
  const[isLoading,setIsLoading]=useState(false);

  const[openAddIncomeModel,setOpenAddIncomeModel]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null
  })
  
  //Fetc income details form the API
  const fetchIncomeDetails=async()=>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try {
      const response=await axiosconfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

      if(response.status === 200){
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch income details",error);
      toast.error(error.response?.data?.message || "Failed to fetch income details")
    }finally{
      setIsLoading(false)
    }
  }
  //Fetch categories for income
  const fetchIncomeCategories=async()=>{
    try {
      const response=await axiosconfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"))
      if(response.data){
        setCategories(response.data);
        console.log("Income categories",response.data)
      }
    } catch (error) {
      console.error("Failed to fetch income categories",error);
      toast.error(error.response?.data?.message || "Failed to fetch income categories");
    }
  }

  //save the income details

  const handleAddIncome= async(income)=>{
    const{name,amount,date,icon,categoryId}=income;

    //validation
    if(!name.trim()){
      toast.error("Please enter a name");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be a valid number greater than 0")
      return;
    }
    if(!date){
      toast.error("Please select Date");
      return;
    }
    const today=new Date().toISOString().split('T')[0];
    if(date > today){
      toast.error("Date cannot be future")
      return;
    }
    if(!categoryId){
      toast.error("Please select a category");
      return;
    }

    //API call

    try {
      const response=await axiosconfig.post(API_ENDPOINTS.ADD_INCOME,{
        name,
        amount:Number(amount),
        date,
        categoryId,
        icon    
      })

      if(response.status===201){
        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();

      }
    } catch (error) {
      toast.error(error.response?.data?.message||"Failed to  adding income");
      console.error("Failed to add income",error);
      
    }

  }

  //delte income details
  const deleteIncome=async(id)=>{
   
    try {
      const response=await axiosconfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      if(response.status === 200){
        toast.success('Income deleted successfully');
        setOpenDeleteAlert({show:false,data:null});
        fetchIncomeDetails();
        
      }
      
    } catch (error) {
      console.log("Error deleting the income",error);
      toast.error(error.response?.data?.message||"Failed to delete income")
      
    }
  }

  const handleDownloadIncomeDetails=async()=>{
    
    try {
      const response=await axiosconfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"})
      let filename="income_details.xlsx";
      const url=window.URL.createObjectURL(new Blob([response.data]));
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download",filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download income details successfully")

    } catch (error) {
      console.error("Error downloading income details",error);
      toast.error(error.response?.data?.message || "Failed to download income");
    }

  }
  const handleEmailIncomeDetails=async()=>{
    try {
        const response=await axiosconfig.get(API_ENDPOINTS.EMAIL_INCOME);
        if(response.status === 200){
          toast.success("Income details emailed successfully")
        }
    } catch (error) {
      console.error("Error emailing income details",error);
      toast.error(error.response?.data?.message || "Failed to email income")
    }
  }

  useEffect(()=>{
    fetchIncomeDetails();
    fetchIncomeCategories();
  },[])

  
  return (
    <Dashboard activeMenu="Income">
        <div className="relative my-5 mx-auto max-w-6xl px-4 z-10">
            {/* Background ambient light effects */}
            <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-purple-250/20 blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-250/20 blur-[150px] pointer-events-none -z-10" />

            <div className="grid grid-cols-1 gap-6 rounded-lg">
                <div>
                    {/* overview for income  with line char */}

                    

                    <IncomeOverview
                      transactions={incomeData}
                      onAddIncome={()=> setOpenAddIncomeModel(true)}
                    />

                </div>
                <IncomeList 
                  transactions={incomeData}
                  onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
                  onDownload={handleDownloadIncomeDetails}
                  onEmail={handleEmailIncomeDetails}
                />

                {/* Add income model */}
                <Model
                    title="Add Income"
                    isOpen={openAddIncomeModel}
                    onClose={()=> setOpenAddIncomeModel(false)}
                >
                    <AddIncomeForm 
                        categories={categories}
                        onAddIncome={(income)=> handleAddIncome(income)}
                    />
                </Model>

                {/* Delete Income model */}
                <Model
                  isOpen={openDeleteAlert.show}
                  onClose={()=> setOpenDeleteAlert({show:false,data:null})}
                  title="Delete Income"
                >
                  <DeleteAlert
                    content="Are you sure want to delete this income details?"
                    onDelete={()=>deleteIncome(openDeleteAlert.data)}
                  />
                </Model>
            </div>
        </div>
    </Dashboard>
  )
}

export default Income