import { Link } from "@inertiajs/react";
import { ReactNode } from "react";
import App from "../Layouts/App";
import InvoicesTable from "../components/InvoicesTable";

const Invoices = ({ invoices }: { invoices: any }) => {
    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
            </div>
            <InvoicesTable invoices={invoices} />
            <div>
                <Link className=" block w-fit mx-auto cursor-pointer my-4  px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 hover:shadow-md transition duration-200 active:scale-95" href={"/home"} > Back to Home </Link>
            </div>
        </div>
    );
};

Invoices.layout = (page: ReactNode) => <App>{page}</App>;

export default Invoices;
