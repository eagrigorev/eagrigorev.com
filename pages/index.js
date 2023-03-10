import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Intro from '@/templates/parts/intro';
import ContentLoop from '@/templates/parts/contentLoop';
import { sortByDate } from '@/scripts/sortByDate';

const Home = ({ posts }) => {
  return (
    <>
      <Intro />
      <ContentLoop posts={posts} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const fetchedDir = fs.readdirSync(path.join('markdown'));
  const posts = fetchedDir.map((file) => {
    const slug = file.replace('.mdx', '');
    const fetchedFile = fs.readFileSync(path.join('markdown', file), 'utf-8');
    const { data: meta } = matter(fetchedFile);
    return { slug, meta };
  });
  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
};
