import React from 'react';

import PostContent from './PostContent';
import PostHeader from './postHeader/PostHeader';

const Post = ({ data }) => {
    return (
        <>
            <PostHeader data={data} />
            <PostContent data={data} />
        </>
    )
}

export default Post;