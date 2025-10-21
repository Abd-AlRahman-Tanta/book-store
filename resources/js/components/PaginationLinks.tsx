import { Link } from "@inertiajs/react"
import { BooksPaginationProps } from ".."

const PaginationLinks = ({ books }: { books: BooksPaginationProps }) => {
    return (
        <div className="flex justify-center items-center  max-desc:flex-wrap gap-2">
            {
                books.links.map((link, index) => (
                    link.url ? (<Link key={index} dangerouslySetInnerHTML={{ __html: link.label }} href={link.url} className={`mx-1 px-3 py-1 text-sm border rounded-lg transition duration-150 ${link.active ? "bg-blue-600 text-white border-blue-600" : "text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"}`} />)
                        :
                        (
                            <span
                                key={index}
                                className="mx-1 px-3 py-1 text-sm text-gray-400 border border-gray-200 rounded-lg cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }} />
                        )
                ))
            }

        </div>
    )
}

export default PaginationLinks
