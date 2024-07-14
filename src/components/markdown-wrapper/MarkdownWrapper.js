import Markdown from "react-markdown";
import Image from "next/image";
import styles from "./MarkdownWrapper.module.css";

const MarkdownWrapper = ({ children }) => {
    const customComponents = {
        img: ({ node, ...props }) => {
            const isProd = process.env.NODE_ENV === 'production';
            const src = isProd ? `/study-blog${props.src}` : props.src;

            return (
                <Image
                    {...props}
                    src={src}
                    alt={props.alt || ""}
                    layout="responsive"
                    width={800}
                    height={480}
                    objectFit="contain"
                />
            );
        },
    };

    return (
        <Markdown className={styles.MarkdownWrapper} components={customComponents}>
            {children}
        </Markdown>
    );
};

export default MarkdownWrapper;
