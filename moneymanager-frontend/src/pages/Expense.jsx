import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";
import axiosconfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Model from "../components/Model";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview  from "../components/ExpenseOverview";

const Expense = () => {
  useUser();

  const[expenseData,setExpenseData]=useState([]);
  const[categories,setCategories]=useState([]);
  const[isLoading,setIsLoading]=useState(false);

  const[openAddExpenseModel,setOpenAddExpenseModel]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null
  })
  
  // Fetch expense details from the API
  const fetchExpenseDetails=async()=>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try {
      const response=await axiosconfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

      if(response.status === 200){
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense details",error);
      toast.error(error.response?.data?.message || "Failed to fetch expense details")
    }finally{
      setIsLoading(false)
    }
  }

  // Fetch categories for expense
  const fetchExpenseCategories=async()=>{
    try {
      const response=await axiosconfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"))
      if(response.data){
        setCategories(response.data);
        console.log("Expense categories",response.data)
      }
    } catch (error) {
      console.error("Failed to fetch expense categories",error);
      toast.error(error.response?.data?.message || "Failed to fetch expense categories");
    }
  }

  // Save the expense details
  const handleAddExpense= async(expense)=>{
    const{name,amount,date,icon,categoryId}=expense;

    // validation
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

    // API call
    try {
      const response=await axiosconfig.post(API_ENDPOINTS.ADD_EXPENSE,{
        name,
        amount:Number(amount),
        date,
        categoryId,
        icon    
      })

      if(response.status===201){
        setOpenAddExpenseModel(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message||"Failed to add expense");
      console.error("Failed to add expense",error);
    }
  }

  // Delete expense details
  const deleteExpense=async(id)=>{
    try {
      const response=await axiosconfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      if(response.status === 200){
        toast.success('Expense deleted successfully');
        setOpenDeleteAlert({show:false,data:null});
        fetchExpenseDetails();
      }
    } catch (error) {
      console.log("Error deleting the expense",error);
      toast.error(error.response?.data?.message||"Failed to delete expense")
    }
  }

  const handleDownloadExpenseDetails=async()=>{
    try {
      const response=await axiosconfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{responseType:"blob"})
      let filename="expense_details.xlsx";
      const url=window.URL.createObjectURL(new Blob([response.data]));
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download",filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded expense details successfully")
    } catch (error) {
      console.error("Error downloading expense details",error);
      toast.error(error.response?.data?.message || "Failed to download expense details");
    }
  }

  const handleEmailExpenseDetails=async()=>{
    try {
        const response=await axiosconfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
        if(response.status === 200){
          toast.success("Expense details emailed successfully")
        }
    } catch (error) {
      console.error("Error emailing expense details",error);
      toast.error(error.response?.data?.message || "Failed to email expense details")
    }
  }

  useEffect(()=>{
    fetchExpenseDetails();
    fetchExpenseCategories();
  },[])

  return (
    <Dashboard activeMenu="Expense">
        <div className="relative my-5 mx-auto max-w-6xl px-4 z-10">
            {/* Background ambient light effects */}
            <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-purple-250/20 blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-250/20 blur-[150px] pointer-events-none -z-10" />

            <div className="grid grid-cols-1 gap-6 rounded-lg">
                <div>
                    <ExpenseOverview
                      transactions={expenseData}
                      onAddExpense={()=> setOpenAddExpenseModel(true)}
                    />
                </div>
                <ExpenseList 
                  transactions={expenseData}
                  onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
                  onDownload={handleDownloadExpenseDetails}
                  onEmail={handleEmailExpenseDetails}
                />

                {/* Add expense modal */}
                <Model
                    title="Add Expense"
                    isOpen={openAddExpenseModel}
                    onClose={()=> setOpenAddExpenseModel(false)}
                >
                    <AddExpenseForm 
                        categories={categories}
                        onAddExpense={(expense)=> handleAddExpense(expense)}
                    />
                </Model>

                {/* Delete Expense modal */}
                <Model
                  isOpen={openDeleteAlert.show}
                  onClose={()=> setOpenDeleteAlert({show:false,data:null})}
                  title="Delete Expense"
                >
                  <DeleteAlert
                    content="Are you sure you want to delete this expense detail?"
                    onDelete={()=>deleteExpense(openDeleteAlert.data)}
                  />
                </Model>
            </div>
        </div>
    </Dashboard>
  )
}

export default Expense