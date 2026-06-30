import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";
import { Categories } from "emoji-picker-react";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosconfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";


const Category = () => {
  useUser();
  const[isLoading,setIsLoading]=useState(false);
  const[categoryData,setCategoryData]=useState([]);
  const[openAddCategoryModel,setOpenAddCategoryModel]=useState(false);
  const[openEditCategoryModel,setOpenEditCategoryModel]=useState(false);
  const[selectedCategory,setSelectedCategory]=useState(null);

  const handleAddcategory=async(category)=>{
    const{name,type,icon}=category;

    if(!name.trim()){
      toast.error("Category Name is required");
      return;
    }

    //ceck if the category already exists

    const isDuplicate = categoryData.some(category =>{
      return category.name.toLowerCase()===name.trim().toLowerCase();

      
    })
    if(isDuplicate){
      toast.error("Category name already exits")
      return;
    }

    try {
        const response=await axiosconfig.post(API_ENDPOINTS.ADD_CATEGORY,{
          name,
          type,
          icon
        }
        )

        if(response.status === 201){
          toast.success("Category added successfully");
          setOpenAddCategoryModel(false);
          fetchCategoryDetails();
        }
    } catch (error) {
      console.error("Error adding category",error);
      toast.error(error.response?.data?.message || "Failed to add category");
      
    }

  }

  const handleEditCateogory=(categoryToEdit)=>{
    console.log("Editing the category",categoryToEdit);
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true)
  }

  const handleUpdateCategory=async(updatedCategory)=>{
    //console.log("updating category",updatedCategory);

    const{id,name,type,icon}=updatedCategory;

    if(!name.trim()){
      toast.error("Category Name is required");
      return;
    }
    if(!id){
      toast.error("Category ID is missing for update");
    }

    //ceck if the category already exists

    const isDuplicate = categoryData.some(category =>{
      return category.name.toLowerCase()===name.trim().toLowerCase();

      
    })
    if(isDuplicate){
      toast.error("Category name already exits")
      return;
    }

    try {
        const response=await axiosconfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{
          name,
          type,
          icon
        }
        )

        if(response.status === 200){
          toast.success("Category updated successfully");
          setOpenEditCategoryModel(false);
          setSelectedCategory(null);
          fetchCategoryDetails();
        }
    } catch (error) {
      console.error("Error updating category",error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update category");
      
    }

  }
  const fetchCategoryDetails=async()=>{
        if(isLoading) return;

        setIsLoading(true);
        try {
          const response=await axiosconfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
          if(response.status=== 200){
            console.log("categories ",response.data);
            setCategoryData(response.data)
            
          }
        } catch (error) {
            console.error("Something went wrong. Please try again",error);
            toast.error(error.message);

        } finally{
          setIsLoading(false);
        }
  }

  useEffect(()=>{
    fetchCategoryDetails();
  },[]);

  return (
    <Dashboard activeMenu="Category">
       <div className="relative my-5 mx-auto max-w-6xl px-4 z-10">
          {/* Background ambient light effects */}
          <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-purple-250/20 blur-[130px] pointer-events-none -z-10" />
          <div className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-250/20 blur-[150px] pointer-events-none -z-10" />

          {/* Add button to add category */}
          <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">All Categories</h2>
              <button 
                onClick={()=>{setOpenAddCategoryModel(true)}}
                className="text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200/40 dark:border-emerald-500/20 px-4 py-2.5 rounded-xl flex items-center gap-1.5 font-bold text-sm transition-all hover:bg-emerald-200 dark:hover:bg-emerald-500/25 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]">
                <Plus size={16} strokeWidth={2.5}/>
                Add Category
              </button>
          </div>

          {/* Category list */}
          <CategoryList categories={categoryData} onEditCategory={handleEditCateogory}/>

          {/* Adding category model  */}
          <Model 
            title="Add Category"
            isOpen={openAddCategoryModel} 
            onClose={()=> setOpenAddCategoryModel(false)}>
                <AddCategoryForm onAddCategory={handleAddcategory}/>
          </Model>

          {/* upading category model */}

          <Model
              title="Update Category"
              isOpen={openEditCategoryModel}
              onClose={()=> {
                        setOpenEditCategoryModel(false)
                        setSelectedCategory(null);
              }
              } >
                  <AddCategoryForm 
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                  />
          </Model>


       </div>
    </Dashboard>
  )
}

export default Category