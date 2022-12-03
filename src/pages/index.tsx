import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Container from '../components/container';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="relative w-full h-40">
          <Image
            alt="branqueamento de corais"
            src="/images/branquea_corais_pior.jpg"
            fill
          ></Image>
        </div>
      </Container>
    </>
  );
};

export default Home;
