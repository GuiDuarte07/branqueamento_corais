import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <p>Olá</p>
    </>
  );
};

export default Home;
