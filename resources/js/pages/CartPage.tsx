import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useBook } from "..";
import CartItem from "../components/CartItem";
import Notification from "../components/Notification";

const CartPage = () => {
    const { books, clearAll } = useBook();
    const calculateTotalPrice = (): number => {
        let totalPrice: number = 0;
        books.map((book) => {
            totalPrice = totalPrice + (parseInt(book.price) * book.amount)
        });
        return totalPrice;
    }
    useEffect(() => {
        calculateTotalPrice();
    }, [books])
    const clearCart = () => {
        clearAll();
    }
    const sendInvoice = () => {
        const myInvoices = [...books].map((book) => ({ book_name: book.book_name, book_id: book.id, price: "" + parseInt(book.price) * book.amount, amount: book.amount.toString() }));
        router.visit("/invoice", {
            method: "post",
            data: { "invoices": myInvoices }
        });
        clearAll();
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Notification />
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    🛒 My Cart
                </h1>
                {/* Cart Items */}
                <div className="space-y-4">
                    {
                        books.map((book, index) => {
                            return (
                                <CartItem key={index} book_name={book.book_name} image={book.image} description={book.description} price={book.price} amount={book.amount} id={book.id} />
                            )
                        })
                    }
                </div>
                {/* Total + Actions */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-t pt-4">
                    <p className="text-lg font-semibold text-gray-800">
                        Total: <span className="text-blue-600">${calculateTotalPrice()}</span>
                    </p>
                    <div className="flex gap-3">
                        <button onClick={clearCart} className={`cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition ${books.length > 0 ? "block" : "hidden"}`}>
                            Clear All
                        </button>
                        <button onClick={sendInvoice} className={`cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition ${books.length > 0 ? "block" : "hidden"}`}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Link className=" block w-fit mx-auto cursor-pointer my-4  px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 hover:shadow-md transition duration-200 active:scale-95" href={"/home"} > Back to Home </Link>
            </div>
        </div>
    )
}

export default CartPage
