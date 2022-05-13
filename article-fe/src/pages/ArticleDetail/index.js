
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useArticleById } from "../../service/article";
import ArticleView from "../../components/ArticleView";
import ErrorView from "../../components/ErrorView";
import Spinner from "../../components/Spinner";

const SingleArticle = () => {
    const [article, setArticle] = useState({title: '', description:'', content: '', })
    // let article
    let { slug } = useParams();
    const id = slug.split("-").pop()


    const { data,  isError} = useArticleById(id)
    if (isError) {
        return ErrorView;
    }
    if (data) {
        setArticle(data)
        
    }
    return (
        <div>
            <div className="px-40 py-10 bg-gray-100">
                    <ArticleView article={article} />
                
            </div>
        </div>
    )
}

export default SingleArticle;