import { useEffect } from 'react';
import { useRemark } from 'react-remark';

const Content = ({ content }) => {
    const [srcContent, setSrcContent] = useRemark();

    useEffect(() => {
        setSrcContent(content);
    });

    return srcContent;
}

export default Content;