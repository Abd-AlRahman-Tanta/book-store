//@ts-nocheck
import { Link } from "@inertiajs/react";
import BookCard from "../components/BookCard";

interface Book {
    id: string;
    book_name: string;
    description: string;
    image: string;
    price: string;
}

interface Props {
    trashedBooks: Book[];
}

export default function TrashedBooksPage({ books }: Props) {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Trashed Books</h1>
                    <Link
                        href="/home"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Books Grid */}

                {books.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No trashed books found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                id={book.id}
                                book_name={book.book_name}
                                description={book.description}
                                image={book.image}
                                price={book.price}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
