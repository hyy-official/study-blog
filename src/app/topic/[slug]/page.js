"use client";

import { allPosts, Post } from "contentlayer/generated";
import { usePathname } from "next/navigation";
import styles from "./Topic.module.css";

import React from "react";
import { compareDesc } from "date-fns";
import PostPreview from "@/components/PostPreview/PostPreview";

function Topic() {
    const pathname = usePathname();
    const topicName = pathname.replace("/topic/", "").toLowerCase().replace('/', '');

    // get posts specific to topic in question
    const posts = allPosts
        .filter((post) => {
            // convert topics array to lowercase to search for matches
            const topicsInLowerCase = post.topics.toString().toLowerCase();
            return topicsInLowerCase.includes(topicName);
        })
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    // generate previews of posts
    const postPreviews = posts.map((post, idx) => (
        <PostPreview key={idx} {...post} />
    ));
    return (
        <div className={styles.TopicPageContainer}>
            <h1 className="TopicTitle">{topicName.toUpperCase()}</h1>
            <div className="ListPosts">{postPreviews}</div>
        </div>
    );
}

export default Topic;

// This function gets called at build time
export async function getStaticPaths() {
    // 여기서 `topics`는 모든 가능한 slug를 나타냅니다.
    const topics = await getTopics();

    // 각 slug에 대해 페이지 경로를 반환합니다.
    const paths = topics.map((topic) => ({
        params: { slug: topic.slug },
    }));

    // `fallback: false`는 존재하지 않는 경로에 대해 404 페이지를 반환하도록 합니다.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // params.slug를 사용하여 해당 topic의 데이터를 가져옵니다.
    const topicData = await getTopicData(params.slug);

    // Not found
    if (!topicData) {
        return {
            notFound: true,
        };
    }

    // Success
    return {
        props: {
            topicData,
        },
    };
}
