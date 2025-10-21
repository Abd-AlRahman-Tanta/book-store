import { router, usePage } from "@inertiajs/react";
import { FormEvent, useState } from "react";
const ProductForm = ({ book_name, id, price, description, image }: { book_name?: string, id?: string, description?: string, image?: string, price?: string }) => {
    const [selectedImage, setSelectedImage] = useState<string>(`${image ? "/storage/" + image : "/storage/book.jpg"}`);
    const { url } = usePage();
    const [render, setRender] = useState<boolean>(false);
    const sendData = (e: FormEvent) => {
        setRender(true);
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        let inputs = form.elements;
        let finalInputs = Array.from(inputs) as HTMLInputElement[];
        let data = new FormData();
        finalInputs.forEach((input) => {
            if (input.type != "submit" && input.type != "file") {
                data.append(`${input.name}`, `${input.value}`)
            }
            else if (input.type != "submit" && input.type == "file") {
                if (input.files && input.files[0]) {
                    data.append(`${input.name}`, input.files[0])
                }
            }
        });
        if (url == "/addBook") {
            router.post("/addBook", data)
        }
        else {
            data.append("_method", "PUT");
            router.post("/editBook/" + id, data)
        }
    }
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-700 text-center">{id ? "Edit Book" : "Add Book"}</h2>
            <form onSubmit={sendData} className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow space-y-3">
                <input
                    name="book_name"
                    defaultValue={book_name}
                    type="text"
                    placeholder="Book name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                    name="price"
                    defaultValue={price}
                    type="number"
                    placeholder="Price"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    defaultValue={description}
                    placeholder="Description"
                    className="resize-none w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
                <div>
                    <label className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" htmlFor="img"><img src={`${selectedImage}`} alt="" /></label>
                    <input name="image" id="img" onChange={(e) => { e.target.files && setSelectedImage(URL.createObjectURL(e.target.files[0])) }} type="file" className="hidden" />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition">
                    {id ? "Edit Book" : "Add Book"}
                    <span className={` ${render ? "block" : "hidden"}  border-2 border-y-transparent border-x-white rounded-full w-7 h-7 bg-transparent animate-spin duration-500 `}></span>
                </button>
            </form>
        </div>
    )
}

export default ProductForm
