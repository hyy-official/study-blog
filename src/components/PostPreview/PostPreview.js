"use client";

import styles from "./PostPreview.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Post } from "@/.contentlayer/generated";
import Link from "next/link";
import ImageLoader from "@/components/image-loader/ImageLoader";

function PostPreview(props) {
    const router = useRouter();
    const isProd = process.env.NODE_ENV === 'production';
    const imagePath = `${isProd ? '/study-blog' : ''}/images/${props.featured_image}`;

    return (
        <div
            style={{ textDecoration: "inherit", color: "inherit" }}
            onClick={(event) => {
                event.stopPropagation();
                router.push(props.url);
            }}
            className={styles.PostPreviewContainer}
        >
            <div className={styles.ImageWrapper}>
                <Image
                    className={styles.Image}
                    src={imagePath}
                    alt={props.title}
                    layout="responsive"
                    width={800}
                    height={480}
                    style={{ objectFit: "cover" }}
                    loader={ImageLoader}
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
