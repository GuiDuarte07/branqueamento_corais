import type { GetStaticProps, NextPage } from 'next';
import ArticleCard from '../components/ArticleCard';
import Container from '../components/container';
import Header from '../components/Header';
import prisma from '../lib/prismadb';
import { useState } from 'react';

type Props = {
  articles: {
    title: string;
    Authors: { fullname: string }[];
    id: string;
    pdfpath: string | null;
  }[];
};

const Home: NextPage<Props> = ({ articles }) => {
  const [submitedArticles, setSubmitedArticles] = useState(articles);
  console.log(submitedArticles);
  return (
    <>
      <Header />
      <Container home>
        <h1 className="my-4 font-bold text-xl font-mono text-center">
          Primeiro evento científico de branqueamento de corais
        </h1>
        <h2 className="my-4 font-bold text-lg font-mono">
          Artigos já submetidos
        </h2>
        <section className="flex gap-4 md:flex-row flex-col">
          {submitedArticles.map(({ id, title, Authors }) => (
            <ArticleCard
              className="max-w-sm my-4"
              key={id}
              id={id}
              title={title}
              authors={Authors.map((author) => author.fullname)}
            />
          ))}
        </section>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await prisma.article.findMany({
    where: { approved: true, published: true },
    take: 10,
    select: {
      title: true,
      Authors: { select: { fullname: true } },
      id: true,
      pdfpath: true,
    },
  });

  return {
    props: {
      articles,
    },
  };
};
