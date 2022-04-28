import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Shared/Pagination";
import Navbar from "../Shared/Navbar";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../../service/article";

const MultiArticles = () => {
    const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const getArticlesView = async (page) => {
        const result = await getArticles(page);
        if (result.status === 200) {
            setTotal(result.data.total);
            setArticles(result.data.data);
        }
    }

    useEffect(() => {
        getArticlesView(curPage);
    }, [curPage, articles])
    // const articles = [
    //     { title: "hi it's me", description: 'none', content: 'opppppssss'},
    //     { title: "hi it's me", description: 'none', content: 'opppppssss'},
    //     { title: "hi it's me", description: 'none', content: 'opppppssss'},
    //     { title: "hi it's me", description: 'none', content: 'opppppssss'},
    //     { title: "hi it's me", description: 'none', content: 'opppppssss'},
    // ];

    return (
        <>
            <Navbar current={'Feed'} />
            <div className="grid grid-cols-3 gap-4 pb-4 pt-4">
            {
                articles.map((value, idx) => {
                    return (
                        <Link to={'/article/' + idx}>
                            <ArticleCard id={idx} article={value}/>
                        </Link>
                        
                    )
                })
            }
            </div>
            <Pagination />
        </>
    );
}

export default MultiArticles;