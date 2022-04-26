import ReactMarkdown from "react-markdown";

const Content = ({ content }) => {
    return (
        <ReactMarkdown source={content}/>
    );
}

export default Content;