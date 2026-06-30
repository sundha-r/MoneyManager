import { Download, LoaderCircle, Mail } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"
import { useEffect, useState } from "react"

const IncomeList = ({transactions,onDelete,onDownload,onEmail}) => {

    const [isDownloading, setIsDownloading] = useState(false);
    const [isEmailing, setIsEmailing] = useState(false);

    const handleOnDownload=async()=>{
        setIsDownloading(true);
        try {
            await onDownload();
        } finally{
            setIsDownloading(false);
        }
    }

     const handleOnEmail=async()=>{
        setIsEmailing(true);
        try {
            await onEmail();
        } finally{
            setIsEmailing(false);
        }
    }

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100/80 dark:border-slate-800">
            <h5 className="font-bold text-gray-800 dark:text-slate-100 text-base">Income Sources</h5>
            <div className="flex items-center justify-end gap-2">
                <button 
                    disabled={isEmailing}
                    onClick={handleOnEmail}
                    className="flex items-center gap-1.5 text-white bg-purple-800 hover:bg-purple-900 dark:bg-purple-700 dark:hover:bg-purple-650 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow">
                        { isEmailing ?(
                            <>
                                <LoaderCircle className="w-3.5 h-3.5 animate-spin"/>Emailing...
                            </>
                        ):(
                            <>
                                <Mail size={14} className="text-base"/>Email
                            </>
                        )

                        }
                </button>
                <button 
                    disabled={isDownloading}
                    onClick={handleOnDownload}
                    className="flex items-center gap-1.5 text-white bg-purple-800 hover:bg-purple-900 dark:bg-purple-700 dark:hover:bg-purple-650  px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow">
                        { isDownloading ?(
                            <>
                                <LoaderCircle className="w-3.5 h-3.5 animate-spin"/>Downloading...
                            </>
                        ):(
                            <>
                                <Download size={14} className="text-base"/>Download
                            </>
                        )

                        }
                        
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* display the income */}
                {transactions?.map((income)=>(
                    <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format('Do MMM YYYY')}
                            amount={income.amount}
                            type="income"
                            onDelete={()=>onDelete(income.id)}
                            
                    />
                ))}
        </div>
    </div>
  )
}

export default IncomeList