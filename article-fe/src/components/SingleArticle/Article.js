import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SingleArticle = () => {
    const [isEdit, setIsEdit] = useState(false);
    const article = {
        titile: "Hello it's a demo",
        description: "it's ademo and write in markdowm format. it's quite simple",
        content: "## Hello, **world**!",
    }
    const [content, setContent] = useState(article.content);
    return (
        <div className="py-8 px-8 max-w-[80%] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="">
                
            </div>
            <h1 class="text-slate-900 mt-5 text-xl font-bold tracking-tight pb-4">{article.titile}</h1>
            
            <p class="text-slate-500 pb-4 mt-2 text-sm">
                {article.description}
            </p>
            <div className="ltr">
            {
                !isEdit && <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]}/>
            }
            {
                isEdit && <textarea>{content}</textarea>
            }
            </div>
            
            
        </div>
    )
}

export default SingleArticle;