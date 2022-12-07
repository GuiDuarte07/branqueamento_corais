import type { NextPage } from 'next';
import ArticleCard from '../components/ArticleCard';
import Container from '../components/container';
import Header from '../components/Header';

const submitedArticles = [
  {
    id: 'dsaojfsdojifsoi',
    authors: ['Guilherme Duarte', 'Raquel Leite'],
    title: 'O branqueamento dos corais é a prova cabal do fim do mundo',
    createdAt: new Date(2022, 11, 11),
  },
  {
    id: 'dsaojfsdojifdsoi',
    authors: [
      'Guilherme Duarte',
      'Raquel Leite',
      'Guilherme Duarte',
      'Raquel Leite',
      'Guilherme Duarte',
      'Raquel Leite',
    ],
    title: 'O branqueamento dos corais é a prova cabal do fim do mundo',
    createdAt: new Date(2022, 11, 11),
  },
  {
    id: 'dsaojfsdojiafsoi',
    authors: ['Guilherme Duarte', 'Raquel Leite'],
    title: 'O branqueamento dos corais é a prova cabal do fim do mundo',
    createdAt: new Date(2022, 11, 11),
  },
];

const Home: NextPage = () => {
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
          {submitedArticles.map(({ id, title, authors, createdAt }) => (
            <ArticleCard
              className="max-w-sm my-4"
              key={id}
              id={id}
              title={title}
              authors={authors}
              createdAt={createdAt}
            />
          ))}
        </section>
      </Container>
    </>
  );
};

export default Home;
