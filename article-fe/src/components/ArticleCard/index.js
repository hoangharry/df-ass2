import { CalendarIcon, UserIcon } from "@heroicons/react/outline";

const ArticleCard = ({ article }) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-xl bg-white hover:bg-violet-100">
        <img className="w-full h-80 p-2" src="https://demo.proteusthemes.com/readable/wp-content/uploads/sites/12/2017/08/photo18.jpg" alt="Mountain" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 hover:text-violet-700 font-sans">Mountain</div>
          <p className="text-gray-700 text-base font-serif">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 items-center">
            <div className="flex inline-block">
            <UserIcon className="w-6 h-6"/>
            <p className="text-gray-900 text-xl font-serif pl-2">John Smith</p>
            </div>
          <div className="text-sm flex inline-block mt-2">
            <CalendarIcon className="w-6 h-6"/>
            <p className="text-gray-600 pl-2 text-xl font-serif">Aug 18</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>
    );
}

export default ArticleCard;