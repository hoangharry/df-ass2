import axios from 'axios';
import { SERVER_URL } from '../constant';
const ARTICLE_URL = SERVER_URL + '/article';
const headerAuth = {
    headers: {
        Authorization: localStorage.getItem('auth-jwt')
    }
}
export const getArticles = (page) => {
    return axios.get(ARTICLE_URL, {
        page: page,
    }, headerAuth);
}

export const getArticleById = (id) => {
    return axios.get(ARTICLE_URL + '/' + id, headerAuth);
}

export const createArticle = (article) => {
    return axios.post(ARTICLE_URL, {
        article: article,
    },
        headerAuth
    );
}

export const editArticle = (article) => {
    return axios.put(ARTICLE_URL + '/' + article.id, {
        article: article,
    },
        headerAuth
    );
}

export const deleteArticle = (article) => {
    return axios.delete(ARTICLE_URL + '/' + article.id, headerAuth);
}