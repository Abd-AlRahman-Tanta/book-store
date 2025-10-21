import { Link } from "@inertiajs/react";
import Notification from "../components/Notification";
import ProductForm from "../components/ProductForm";

const Product = ({ book }: { book?: { book_name?: string, id?: string, description?: string, image?: string, price?: string } }) => {
    return (
        <div>
            <Notification />
            <ProductForm book_name={book?.book_name} id={book?.id} price={book?.price} description={book?.description} image={book?.image} />
            <div>
                <Link className=" block w-fit mx-auto cursor-pointer my-4  px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 hover:shadow-md transition duration-200 active:scale-95" href={"/home"} > Back to Home </Link>
            </div>
        </div>
    )
}

export default Product
