import axios from 'axios';
import { SERVER_URL } from '../constant';
const ARTICLE_URL = SERVER_URL + 'article';
export const getArticles = (page) => {
    return axios.get(ARTICLE_URL, {
        page: page,
    });
}

export const getArticleById = (id) => {
    return axios.get(ARTICLE_URL + '/' + id);
}

export const createArticle = (article) => {
    return axios.post(ARTICLE_URL, {
        article: article,
    });
}

export const editArticle = (article) => {
    return axios.put(ARTICLE_URL + '/' + article.id, {
        article: article,
    })
}