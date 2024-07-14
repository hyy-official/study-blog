import { allPosts } from "contentlayer/generated";
import TopicClient from "./TopicClient";

export const generateStaticParams = async () => {
  // 여기서 `topics`는 모든 가능한 slug를 나타냅니다.
  const topics = allPosts.flatMap(post => post.topics);
  const uniqueTopics = [...new Set(topics.map(topic => topic.toLowerCase()))];

  // 각 topic에 대해 페이지 경로를 반환합니다.
  return uniqueTopics.map((topic) => ({ slug: topic }));
};

export const generateMetadata = ({ params }) => {
  const topicName = params.slug;
  return { title: topicName.charAt(0).toUpperCase() + topicName.slice(1) };
};

export default function TopicPage({ params }) {
  return <TopicClient />;
}
