import { useEffect, useState } from "react"
import EmojiPickerPopup from "../components/EmojiPickerPopup"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"

const AddExpenseForm = ({ categories, onAddExpense }) => {
    const [expense, setExpense] = useState({
        name: "",
        icon: "",
        amount: "",
        date: "",
        categoryId: ""
    })
    const [isLoading, setIsLoading] = useState(false);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    }

    const handleAddExpense = async () => {
        setIsLoading(true);
        try {
            await onAddExpense(expense);
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }))
        }
    }, [categories, expense.categoryId])
    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Input
                value={expense.name}
                onChange={({ target }) => handleChange('name', target.value)}
                label="Expense Source"
                placeholder="e.g., Rent, Grocery, Bill"
                type="text"
            />
            <Input
                value={expense.categoryId}
                onChange={({ target }) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
                label="Category"
            />
            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 100.00"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
            <div className="flex items-center justify-end mt-6">
                <button
                    className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md cursor-pointer transition-colors flex items-center justify-center gap-2"
                    onClick={() => { handleAddExpense() }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            Add Expense
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm
