import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useBook } from "..";

const BookCard = ({ book_name, id, price, description, image }: { book_name: string, id: string, description: string, image: string, price: string }) => {

    const { user } = usePage().props;
    const { url } = usePage();
    const { addBook, books } = useBook();
    const [render, setRender] = useState<boolean>(false);
    const addToCart = (id: string) => {
        addBook({ book_name: book_name, description: description, image: image, price: price, id: id, amount: 1 });
    }
    const deleteBook = () => {
        setRender(true);
        url == "/home" &&
            router.visit("/deleteBook", {
                method: "delete",
                data: { id: id },
                onFinish: () => setRender(false)
            });
        url == "/trash" &&
            router.delete("/force-delete/" + id, {
                onFinish: () => setRender(false)
            });
    }
    const restoreBook = () => {
        setRender(true);
        router.visit("/restore/" + id, {
            method: "get",
            onFinish: () => setRender(false)
        });
    }
    return (
        <div key={id} className="w-full bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2.5 duration-300  flex flex-col">
            <img
                src={`/storage/${image}`}
                alt="Book Title"
                className="w-full h-48  rounded-md mb-3 object-cover"
            />
            <h2 className="text-lg font-semibold mb-2 line-clamp-1">{book_name}</h2>
            <p className="text-green-700 mb-3">{price}$</p>
            <p className="text-gray-700 mb-3 line-clamp-2">{description}</p>
            <button onClick={() => addToCart(id)}
                className={`cursor-pointer mt-auto  text-white px-4 py-2 rounded-lg transition-colors ${books.find((book) => book.id == id) ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600 "}`}
            >
                {books.find((book) => book.id == id) ? "Book in Cart!" : "Add To Cart"}
            </button>
            {
                //@ts-ignore
                user["role"] == "admin" &&
                <button onClick={deleteBook} className="cursor-pointer my-4  px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 hover:shadow-md transition duration-200 active:scale-95">Delete <span className={` ${render ? "block" : "hidden"}  border-2 border-y-transparent border-x-white rounded-full w-7 h-7 bg-transparent animate-spin duration-500 `}></span></button>
            }
            {
                //@ts-ignore
                user["role"] == "admin" && url == "/trash" &&
                <button onClick={restoreBook} className="cursor-pointer my-4  px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 hover:shadow-md transition duration-200 active:scale-95">Restore <span className={` ${render ? "block" : "hidden"}  border-2 border-y-transparent border-x-white rounded-full w-7 h-7 bg-transparent animate-spin duration-500 `}></span></button>
            }
            {
                //@ts-ignore
                user["role"] == "admin" && <Link href={`/editBook/${id}`} className="text-center cursor-pointer my-4  px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow-sm hover:bg-yellow-600 hover:shadow-md transition duration-200 active:scale-95">Edit </Link>
            }
        </div>
    )
}

export default BookCard
