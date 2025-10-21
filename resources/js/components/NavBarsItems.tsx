
import { Link } from "@inertiajs/react"
import { Dispatch, SetStateAction } from "react"
import Button from "./Button"
import Cart from "./Cart"
const NavBarsItems = ({ setSearch, logout, className }: { setSearch: Dispatch<SetStateAction<string>>, className?: string, logout: () => void }) => {
    return (
        <>
            <div className={`flex items-center ${className}`}>
                <input onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search books..."
                    className="px-4 py-2 rounded-full border border-gray-300  focus:border-blue-500 w-64 desc:w-80"
                />
            </div>
            <div className={`${className}`} onClick={logout}><Button text="Logout" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" /></div>
            <Link className={`${className} inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition active:scale-95`} href={"/showInvoices"}>show my invoices</Link>
            <Cart className={`${className}`} />
        </>
    )
}

export default NavBarsItems

