import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../../components/container';
import Header from '../../components/Header';

const submitedArticles = {
  id: 'dsaojfsdojifsoi',
  authors: ['Guilherme Duarte', 'Raquel Leite'],
  title: 'O branqueamento dos corais é a prova cabal do fim do mundo',
  abstract:
    'jsoidaiodjasoid jasiod jasoid jasoid jasoidj asoid jasiod jasoidj asoidj asiodj asiod jasiodj asiodj asoidj asiod joiwamd oaninfiaf io ao pp a moadpmp mopadmpoa s os p apom amdoa mopsopma  m o o ampsd spmdo opasmd',
  createdAt: new Date(),
  pdf: '1670264029640_7bfaff3161b44274a3a54915a7aa955e.pdf',
};

const Article: NextPage = () => {
  return (
    <>
      <Header />
      <Container>
        <section className="md:max-w-xl flex flex-col mx-auto">
          <div className="h-20 w-full border-b-2 border-b-gray-500 flex">
            <p className="flex-1">RepoAmazing</p>
            <div className="">
              <h3 className="">Evento científico de branqueamento de corais</h3>
              <p className="">Todos os direitos reservados - 2022</p>
            </div>
          </div>
          <h1 className="mt-10 mb-2 font-normal text-2xl ">
            {submitedArticles.title}
          </h1>

          <p className="text-sm max-w-full mb-4 border-b-2 border-b-gray-400">
            {submitedArticles.authors.map((author) => author + ', ')}
          </p>

          <h2 className="text-lg font-bold">Resumo</h2>
          <p className="bg-gray-100 p-2 my-2">{submitedArticles.abstract}</p>

          <div className="">
            <Link
              href={`/upload/${submitedArticles.pdf}`}
              className="flex my-2 bg-sky-700 p-2 w-fit"
              target="_blank"
            >
              <Image
                width={32}
                height={32}
                alt="Baixar PDF"
                src="/images/pdf-svgrepo-com.svg"
              />
              <p className="text-xl pl-4 text-white">Baixar PDF</p>
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Article;
