import { Link } from "@inertiajs/react";
import { FiShoppingCart } from "react-icons/fi";
import { useBook } from "..";
const Cart = ({ className }: { className?: string }) => {
    const { books } = useBook();
    return (
        <Link href={"/cart"} className={` relative hover:scale-105 duration-300 ${className} `}>
            <FiShoppingCart className={` text-3xl cursor-pointer `} />
            <span className={`${books.length == 0 && "hidden"} flex justify-center items-center text-sm absolute -top-4 -right-4 w-5 h-5 bg-red-500 text-white rounded-full `}>{books.length}</span>
        </Link>
    )
}

export default Cart
