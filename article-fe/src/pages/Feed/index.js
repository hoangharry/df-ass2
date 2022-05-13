import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Layouts/NavBar";
import ArticleCard from "../../components/ArticleCard";
import { useGetArticles } from "../../service/article";
import ReactPaginate from 'react-paginate'
import ErrorView from "../../components/ErrorView";

const MultiArticles = () => {
    const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);

    const { data, isError } = useGetArticles(curPage);
    if (isError) {
        return ErrorView;
    }

    if (data) {
        console.log(data)
        setTotal(Math.ceil(data.total / 10));
        setArticles(data.data)
    }

    const handlePageClick = (e) => {
        setCurPage(e.selected + 1);
    }



    return (
        <div className="bg-gray-100">
            <div className="flex pt-16">
            <h3 className="m-24 font-medium leading-tight text-3xl mt-0 mb-2">Recent Posts</h3>

            <button className="absolute right-24 pt-4">
                <span className="pt-0.5 pl-0.5 text-violet-500 font-bold hover:text-violet-700">Read more</span>
            </button>
            </div>
            <div className="mx-24 my-4 border-t border-gray-300"></div>
            <div className="grid grid-cols-3 gap-4 mx-24 pb-10">
            {
                articles.map((value, idx) => {
                    return (
                        <Link to={'/articles/' + value.title.replaceAll(" ", "-") + "-" + value.id}>
                            <ArticleCard id={value.id} article={value}/>
                        </Link>
                        
                    )
                })
            }
            </div>
            <ReactPaginate 
                breakLabel="..."
                nextLabel="next >"
                previousLabel="< previous"
                pageRangeDisplayed={3}
                pageCount={total}
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
                containerClassName="flex inline-block justify-center pb-8"
                pageClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                pageLinkClassName="text-center text-base hover:text-grey-500"
                previousClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                previousLinkClassName="text-base font-serif"
                nextClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                nextLinkClassName="text-base font-serif"
                activeClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                breakClassName="relative inline-flex rounded-md items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            />
        </div>
    );
}

export default MultiArticles;