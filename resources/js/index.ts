import { create } from "zustand"
import { persist } from "zustand/middleware"
export interface Message {
    "success"?: string,
    "error"?: string[]
}

export interface Book {
    book_name: string,
    id: string,
    price: string,
    image: string,
    description: string,
    amount: number
}
type BookCart = {
    books: Book[],
    addBook: (book: Book) => void,
    deleteBook: (id: string) => void,
    increaseAmount: (id: string) => void,
    decreaseAmount: (id: string) => void,
    clearAll: () => void
}

export const useBook = create<BookCart>()(
    persist(
        (set) => ({
            books: [],
            addBook: (book) => set((state) => ({ books: [...state.books, book] })),
            deleteBook: (id) => set((state) => ({ books: state.books.filter((book) => book.id != id) })),
            increaseAmount: (id) => set((state) => ({ books: [...state.books].map((book) => book.id == id ? { ...book, amount: book.amount + 1 } : book) })),
            decreaseAmount: (id) => set((state) => ({ books: [...state.books].map((book) => book.id == id && book.amount != 1 ? { ...book, amount: book.amount - 1 } : book) })),
            clearAll: () => set(() => ({ books: [] })),
        }),
        {
            name: "cart"
        }
    )
)







export interface RegisterProps {
    "user_name": string,
    "email": string,
    "password": string,
    "password_confirmation": string
}
export interface userProps {
    "role": string,
    "user_name": string,
    "id": string,
    "email": string
}
export interface LoginProps {
    "email": string,
    "password": string
}
export interface AuthInputs {
    type: string, placeHolder: string, name: string
}
export interface AuthFormProps<T> {
    inputs: AuthInputs[],
    data: T
}
export interface BooksPaginationProps {
    links: { page: number, active: boolean, url: string, label: string }[],
    data: { id: string, book_name: string, image: string, description: string, price: string }[]
}
