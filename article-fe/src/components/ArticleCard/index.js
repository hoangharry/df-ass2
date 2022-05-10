import { CalendarIcon, UserIcon } from "@heroicons/react/outline";

const ArticleCard = ({ article }) => {
    return (
        <div class="rounded overflow-hidden shadow-lg hover:bg-violet-100">
        <img class="w-full h-80" src="https://www.w3schools.com/images/lamp.jpg" alt="Mountain" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 hover:text-violet-700">Mountain</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 items-center">
            <div className="flex inline-block">
            <UserIcon className="w-4 h-4"/>
            <p class="text-gray-900 leading-none">John Smith</p>
            </div>
          <div class="text-sm flex inline-block mt-2">
            <CalendarIcon className="w-4 h-4"/>
            <p class="text-gray-600">Aug 18</p>
          </div>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>
    );
}

export default ArticleCard;