import { Layers2, Pencil } from "lucide-react"


const CategoryList = ({categories,onEditCategory}) => {
  return (

    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 transition-all duration-300">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100/80 dark:border-slate-800">
            <h4 className="font-bold text-gray-800 dark:text-slate-100 text-base">Category Sources</h4>
        </div>

        {/* category list */}
        {categories.length === 0 ? (
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 py-6">
                No categories added yet. Add some to get started!
            </p>
        ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category)=>(
                    <div
                        key={category.id}
                        className="group relative flex items-center gap-4 p-3.5 rounded-2xl border border-transparent hover:border-gray-200/80 dark:hover:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.25)] transition-all duration-300">
                        {/* Icon /Emoji display */}
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-full shadow-inner dark:shadow-none shrink-0">
                            {category.icon ? (
                                <span className="text-2xl">
                                    <img src={category.icon} alt={category.name} className="h-5 w-5 object-contain" />
                                </span>
                            ):(
                                <Layers2 className="text-purple-600 dark:text-purple-400" size={20}/>
                            )}
                        </div>
                        {/* Category Details */}
                        <div className="flex-1 flex items-center justify-between min-w-0">
                            {/* Category name and type */}
                            <div className="truncate">
                                <p className="text-sm text-gray-800 dark:text-slate-100 font-semibold truncate">
                                    {category.name}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-slate-450 mt-1 capitalize font-medium">
                                    {category.type}
                                </p>
                            </div>
                            {/* Action buttons */}
                            <div className="flex items-center gap-2 ml-3">
                                <button 
                                    onClick={()=>onEditCategory(category)}
                                    className="text-gray-300 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                                    <Pencil size={16}/>
                                </button>
                            </div>
                            
                        </div>
                        
                    </div>
                ))}
            </div>
        ) }
    </div>
  )
}

export default CategoryList