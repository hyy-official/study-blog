"use client";

import styles from "./PostPreview.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Post } from "@/.contentlayer/generated";
import Link from "next/link";

function PostPreview(props) {
    const router = useRouter();

    return (
        <div
            style={{ textDecoration: "inherit", color: "inherit" }}
            onClick={(event) => {
                event.stopPropagation();
                router.push(props.url);
            }} // go to the article page
            // href={props.url}
            className={styles.PostPreviewContainer}
        >
            <div className={styles.ImageWrapper}>
                <img
                    className={styles.Image}
                    src={props.featured_image}
                    alt="aa"
                    style={{ objectFit: "cover" }} // CSS 스타일 적용
                />
            </div>
            <div className={styles.ArticleTextInfo}>
                <div className={styles.Topics}>
                    {props.topics.map((topic) => (
                        <div
                            onClick={(event) => {
                                event.stopPropagation();
                                router.push(`topic/${topic}`);
                            }}
                            style={{ textDecoration: "inherit" }}
                            className={styles.Topic}
                            key={topic}
                        >
                            {topic}
                        </div>
                    ))}
                </div>
                <div className={styles.Title}>{props.title}</div>
                <time className={styles.Date} dateTime={props.date}>
                    {format(parseISO(props.date), "LLLL d, yyyy")}
                </time>
            </div>
        </div>
    );
}

export default PostPreview;