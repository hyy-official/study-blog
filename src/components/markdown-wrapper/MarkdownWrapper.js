import Markdown from "react-markdown";
import styles from "./MarkdownWrapper.module.css";
import { ReactNode } from "react";


const MarkdownWrapper = ({ children }) => {
    return <Markdown className={styles.MarkdownWrapper}>{children}</Markdown>;
};

export default MarkdownWrapper;