import dynamic from 'next/dynamic';
import { allPosts } from "@/.contentlayer/generated";

const SearchClient = dynamic(() => import('./SearchClient'), { ssr: false });

export const generateStaticParams = async () => {
  const slugs = allPosts.map(post => ({ slug: post._raw.flattenedPath }));
  return slugs;
};

export const generateMetadata = ({ params }) => {
  const { slug } = params;
  return { title: `Search results for ${slug}` };
};

export default function SearchPage({ params }) {
  return <SearchClient params={params} />;
}
