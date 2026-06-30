import { useEffect, useState } from "react"
import EmojiPickerPopup from "../components/EmojiPickerPopup"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"


const AddIncomeForm = ({categories,onAddIncome}) => {
    const[income,setIncome]=useState({
        name:"",
        icon:"",
        amount:"",
        date:"",
        categoryId:""
    })
    const[isLoading,setIsLoading]=useState(false);

   const categoryOptions= categories.map((category)=>({
         value:category.id,
        label:category.name
    }))

    const handleChange=(key,value)=>{
        setIncome({...income,[key]:value});
    }

    const handleAddIncome=async()=>{
         setIsLoading(true);
        try{
           
            await onAddIncome(income);
        }
        finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        if(categories.length >0 && !income.categoryId){
            setIncome((prev)=> ({...prev,categoryId:categories[0].id}))
        }
    },[categories,income.categoryId])
  return (
    <div>
        <EmojiPickerPopup
            icon={income.icon}
            onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}
        />
        <Input
            value={income.name}
            onChange={({target})=> handleChange('name',target.value)}
            label="Income Source"
            placeholder="e.g.. Salary, Bonus, Freelance"
            type="text"
        />
        <Input
            value={income.categoryId}
            onChange={({target})=> handleChange('categoryId',target.value)}
            isSelect={true}
            options={categoryOptions}
            label="Category"
        />
        <Input
            value={income.amount}
            onChange={({target})=> handleChange('amount',target.value)}
            label="Amount"
            placeholder="e.g., 500.00"
            type="number"
        />
        <Input
            value={income.date}
            onChange={({target})=> handleChange('date',target.value)}
            label="Date"
            placeholder=""
            type="date"
        />
        <div className="flex items-center justify-end mt-6">
            <button
                className="text-white bg-purple-700 px-4 py-2 rounded-md cursor-pointer flex items-center justify-center gap-2"
                onClick={()=> {handleAddIncome()}}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <LoaderCircle className="w-4 h-4 animate-spin"/>
                        Adding...
                    </>
                ):(
                    <>
                        Add Income
                    </>
                )}
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm