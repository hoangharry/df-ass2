import { CalendarIcon, UserIcon } from "@heroicons/react/outline";

const ArticleCard = ({ article }) => {
  const d = new Date(article.created_at);
    return (
        <div className="max-w-3/4 rounded-lg overflow-hidden bg-white hover:bg-violet-100">
        <img className="w-full max-h-80 p-2" alt="https://demo.proteusthemes.com/readable/wp-content/uploads/sites/12/2017/08/photo18.jpg" src={article.img} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 hover:text-violet-700 font-sans">Mountain</div>
          <p className="text-gray-700 text-base font-serif">
            {article.description}
          </p>
        </div>
        <div className="px-6 items-center">
            <div className="flex inline-block">
            <UserIcon className="w-4 h-4"/>
            <p className="text-gray-900 text-sm font-serif pl-2">hoanghm</p>
            <CalendarIcon className="w-4 h-4 ml-10"/>
            <p className="text-gray-600 pl-2 text-sm font-serif">{d.toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh'})}</p>
            </div>
        
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{article.category}</span>
          
        </div>
      </div>
    );
}

export default ArticleCard;