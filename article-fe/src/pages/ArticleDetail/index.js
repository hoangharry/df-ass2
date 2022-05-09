import { PencilAltIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getArticleById } from "../../service/article";
import Navbar from "../../Layouts/NavBar";

const SingleArticle = () => {
    // const [article, setArticle] = useState({title: '', description:'', content: '', })
    let {id} = useParams();
    const getArticle = async (id) => {
        const result = await getArticleById(id);
        if (result.status === 200) {
            // setArticle(result.data);
        }
        
    }

    useEffect(() => {
        getArticle(id);
    });

    const article = {
        id: 1,
        title: "Hello it's a demo",
        description: "it's ademo and write in markdowm format. it's quite simple",
        content: "## Hello, **world**!",
    }
    return (
        <>
        <Navbar current={null}/>
        <div className="py-8 px-8 max-w-[80%] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
                </div>
            </header>
            <p className="text-slate-500 pt-4 mt-2 text-sm text-center">
                {article.description}
            </p>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
                        </div>
                    </div>
                </div>
            </main>
            <div className="insert-x-0 flex justify-center">
                <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium flex">
                    <Link to='/edit-article'>
                    <PencilAltIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <span className='pt-0.5 pl-0.5'>Edit</span>
                </button>
            </div>

        </div>
        </>
    )
}

export default SingleArticle;