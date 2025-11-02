import { Link, router, usePage } from "@inertiajs/react";
import { ReactNode, useState } from "react";
import { BooksPaginationProps, useBook, userProps } from "..";
import BookCard from "../components/BookCard";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import PaginationLinks from "../components/PaginationLinks";
import App from "../Layouts/App";

const Store = () => {
    const { user } = usePage<{ user: userProps }>().props;
    const { books } = usePage<{ books: BooksPaginationProps }>().props;
    const { allBooks } = usePage<{ allBooks: Array<{ book_name: string, price: string, description: string, image: string, id: string }> }>().props;
    const [search, setSearch] = useState<string>("");
    const { clearAll } = useBook();
    const logout = () => {
        clearAll();
        router.visit("/logout", {
            method: "delete"
        });
    }
    return (
        <div className="p-5">
            <Notification />
            <Nav logout={logout} setSearch={setSearch} />
            {
                user["role"] == "admin" &&
                <Link href="/addBook" className="block mx-auto w-fit px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200  mt-12 ">
                    Add Book
                </Link>
            }
            <div className="w-full grid grid-cols-3 max-desc:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 my-8 px-descSaveSpace max-desc:px-mobSaveSpace ">
                {
                    search == "" && books.data.map((book) => (
                        <BookCard key={book["id"]} book_name={book["book_name"]} price={book["price"]} image={book["image"]} id={book["id"]} description={book["description"]} />
                    ))
                }
                {
                    search != "" && [...allBooks].filter((book) => book.book_name.toLowerCase().includes(search.toLocaleLowerCase())).map((book) => {
                        return (
                            <BookCard key={book["id"]} book_name={book["book_name"]} price={book["price"]} image={book["image"]} id={book["id"]} description={book["description"]} />
                        )
                    })
                }
            </div>
            {search == "" && <PaginationLinks books={books} />}
            {
                user["role"] == "admin" &&
                <Link
                    href="/trash"
                    className="block mx-auto w-fit my-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                    Go to Trash
                </Link>
            }
        </div>
    );
}

// Layout wrapper
Store.layout = (page: ReactNode) => <App>{page}</App>;

export default Store;
