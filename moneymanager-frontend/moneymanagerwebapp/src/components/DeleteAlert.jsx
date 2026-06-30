import { LoaderCircle } from "lucide-react";
import { use, useState } from "react"


const DeleteAlert = ({content,onDelete}) => {

    const[isLoading,setIsLoading]=useState(false);

    const handleDelete =async()=>{
        setIsLoading(true);
        try {
            await onDelete();
        } finally{
            setIsLoading(false);
        }
    }
  return (
    <div>
        <p className="text-sm">
            {content}
        </p>
        <div className="flex justify-end mt-6">
            <button 
                onClick={handleDelete}
                type="button"
                disabled={isLoading}
                className="flex items-center gap-2 text-white bg-red-700 px-4 py-2 rounded-md cursor-pointer">
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Deleting...
                        </>
                    ):(
                        <>
                            Delete
                        </>
                    )}
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert