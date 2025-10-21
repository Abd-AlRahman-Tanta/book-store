//@ts-nocheck
const InvoicesTable = ({ invoices }: { invoices: any }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="py-3 px-5 text-left">#</th>
                        <th className="py-3 px-5 text-left">Date</th>
                        <th className="py-3 px-5 text-left">Book Name</th>
                        <th className="py-3 px-5 text-left">Amount</th>
                        <th className="py-3 px-5 text-left">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(invoices).map(([created_at, items], index) => (
                            [...items as Array<any>].map((item, i) => (
                                i >= 1 ?
                                    <tr key={`${index}-${i}`}>
                                        <td className="py-3 px-5 text-gray-600">{item.book_name}</td>
                                        <td className="py-3 px-5 text-gray-600">{item.amount}</td>
                                        <td className="py-3 px-5 text-gray-800 font-semibold">{item.price}</td>
                                    </tr>
                                    :
                                    <tr key={`${index}-${i}`} className="border-t hover:bg-gray-50 transition">
                                        <td rowSpan={items.length} className="text-center py-3 px-5 font-medium text-gray-700">{index + 1}</td>
                                        <td rowSpan={items.length} className="text-center py-3 px-5 font-medium text-gray-700">{created_at}</td>
                                        <td className="py-3 px-5 text-gray-600">{item.book_name}</td>
                                        <td className="py-3 px-5 text-gray-600">{item.amount}</td>
                                        <td className="py-3 px-5 text-gray-800 font-semibold">{item.price}</td>
                                    </tr>
                            ))
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default InvoicesTable

