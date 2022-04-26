import { BadgeCheckIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SingleArticle = () => {
    const article = {
        titile: "Hello it's a demo",
        description: "it's ademo and write in markdowm format. it's quite simple",
        content: "## Hello, **world**!",
    }
    return (
        <div className="py-8 px-8 max-w-[80%] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">{article.titile}</h1>
                </div>
            </header>
            <p class="text-slate-500 pt-4 mt-2 text-sm">
                {article.description}
            </p>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
                        </div>
                    </div>

                    {/* /End replace */}
                </div>
            </main>
            <div className="insert-x-0 flex justify-center">
                <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex">
                    <PencilAltIcon className="h-6 w-6" aria-hidden="true" />
                    <span className='pt-0.5 pl-0.5'>Edit</span>
                </button>
                {/* <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex">
                <BadgeCheckIcon className="h-6 w-6" aria-hidden="true" />
                <span className='pt-0.5 pl-0.5'>Save</span>
            </button> */}
            </div>

        </div>
    )
}

export default SingleArticle;