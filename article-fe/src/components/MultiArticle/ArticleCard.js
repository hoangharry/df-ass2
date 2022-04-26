const ArticleCard = ({ article }) => {
    return (
        <div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">{article.title}</h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {article.description}
        </p>
        </div>
    );
}

export default ArticleCard;