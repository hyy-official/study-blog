"use client";

import { useState, useEffect } from 'react';
import { allPosts } from "@/.contentlayer/generated";
import styles from "./Search.module.css";
import { useRouter } from 'next/router';
import { compareDesc } from "date-fns";
import PostPreview from "@/components/PostPreview/PostPreview";

function Search() {
    const [keyword, setKeyword] = useState('');
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (router.query.keyword) {
            const decodedKeyword = decodeURIComponent(router.query.keyword);
            setKeyword(decodedKeyword);

            const filteredPosts = allPosts
                .filter((post) => {
                    const titleInLowerCase = post.title.toString().toLowerCase();
                    return titleInLowerCase.includes(decodedKeyword);
                })
                .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

            setPosts(filteredPosts);
        }
    }, [router.query.keyword]);

    const postPreviews = posts.map((post, idx) => (
        <PostPreview key={idx} {...post} />
    ));

    return (
        <div className={styles.SearchPageContainer}>
            <h1>Search Results for &quot;{keyword}&quot;</h1>
            <div className="ListPosts">{postPreviews}</div>
        </div>
    );
}

export default Search;