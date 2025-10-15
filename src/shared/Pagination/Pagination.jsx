
const Pagination = ({ total, page, limit, onPageChange }) => {
    const totalPages = Math.ceil(total / limit);

    if (totalPages === 0) return null;

    // Generate page numbers - show only the number of buttons equal to totalPages
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4">
            <div className="flex items-center gap-2 text-gray-500">
                Item Per Page
                <select
                    className="border bg-[#F0FBEF] border-gray-300 rounded-[8px] px-4 py-2 text-gray-500 focus:outline-none"
                    value={limit}
                    onChange={e => onPageChange(1, Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={total}>All</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1, limit)}
                >
                    &lt;
                </button>
                {getPageNumbers().map((p) => (
                    <button
                        key={p}
                        className={`w-8 h-8 flex items-center justify-center rounded border ${p === page
                                ? "bg-green-600 text-white border-green-600"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => onPageChange(p, limit)}
                    >
                        {p}
                    </button>
                ))}
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1, limit)}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};
export default Pagination;