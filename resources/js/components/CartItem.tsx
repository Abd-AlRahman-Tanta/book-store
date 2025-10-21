import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Book, useBook } from '..';
const CartItem = ({ image, book_name, description, price, amount, id }: Book) => {
    const { deleteBook, increaseAmount, decreaseAmount } = useBook();
    const deleteFromBooks = () => {
        deleteBook(id);
    }
    const increaseMount = () => {
        increaseAmount(id);
    }
    const decreaseMount = () => {
        decreaseAmount(id);
    }
    return (
        <div className="flex items-center justify-between border-b  pb-4">
            <div className="flex items-center gap-4">
                <img
                    src={"/storage/" + image}
                    alt="Book"
                    className="w-16 h-20 object-cover rounded-md shadow-sm"
                />
                <div>
                    <h2 className="font-semibold text-gray-800">{book_name}</h2>
                    <p className="text-sm text-gray-600">{description}</p>
                    <p className="text-blue-600 font-semibold mt-1">{price}$</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="flex justify-center items-center gap-2 text-2xl">
                    <CiCirclePlus onClick={increaseMount} className=" cursor-pointer hover:scale-105 duration-300 " />
                    <CiCircleMinus onClick={decreaseMount} className=" cursor-pointer hover:scale-105 duration-300 " />
                </div>
                <span className="text-gray-700">x{amount}</span>
                <button onClick={deleteFromBooks} className="text-red-300 text-md duration-300 hover:text-red-600 cursor-pointer">
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem
