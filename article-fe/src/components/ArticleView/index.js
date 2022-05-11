import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { PencilIcon } from "@heroicons/react/outline";
const ArticleView = ({article, user_id}) => {
    const isUser = article.user_id === user_id
    return (
        <div className="rounded-md drop-shadow-lg bg-white">
                <div className="flex justify-center rounded">
                    <img className="w-full max-h-96 flex justify-center" src="https://demo.proteusthemes.com/readable/wp-content/uploads/sites/12/2017/08/photo18.jpg" />
                </div>
                <div className="flex justify-center mt-10 font-sans bg-white">
                    <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 pb-3">{article.title}</h1>
                </div>
                <div className="px-24 bg-white">
                    <p className="text-gray-500 text-xl font-serif pb-10">
                        {article.description}
                    </p>
                </div>
                <div className="px-24 text-xl font-serif pb-10">
                    <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
                </div>
                <div className="mx-24 flex inline-block grid grid-cols-2">
                    <div>
                        <span className="text-gray-400 font-bold text-2xl">Written by</span>
                        <div className="w-4/5 border-t border-gray-300"></div>
                        <div className="flex inline-block pt-6 pb-10">
                            <img className="rounded-full w-8 h-8" src='https://secure.gravatar.com/avatar/bdbb8318519395bacd2f98b2a8fe4ab3?s=180&d=mm&r=g'/>
                            <span className="text-xl font-semibold pl-2">{article.user}</span>
                        </div>
                        
                    </div>
                    <div>
                        <span className="text-gray-400 font-bold text-2xl">Tags</span>
                        <div className="w-4/5 border-t border-gray-300"></div>
                        <div className="pt-6 pb-10">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{article.category}</span>
                        </div>
                        
                    </div>
                </div>
                { isUser && (
                    <div className="insert-x-0 flex justify-center">
                    <button
                        // onClick={onSave}
                        className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white hover:text-white px-3 py-2 my-10 rounded-md text-sm font-medium flex">
                        <PencilIcon className="h-6 w-6" aria-hidden="true" />
                        <span className='pt-0.5 pl-0.5'>Edit</span>
                    </button>
                    </div>
                )}
                
                
            </div>
    );
}

export default ArticleView;