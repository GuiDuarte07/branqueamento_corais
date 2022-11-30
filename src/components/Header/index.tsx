import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const { showSearchBar, setShowSearchBar } = useState(false);

  return (
    <header className="px-16 h-16 w-full fixed bg-slate-600 flex justify-between items-center">
      <div className="">
        <h2 className="">RepoAmazing</h2>
      </div>
      <div className="flex-1 text-center flex h-full">
        {showSearchBar ? (
          'Nada aqui'
        ) : (
          <div className="bg-white w-full h-full mx-8 flex justify-end">
            <button className="">P</button>
          </div>
        )}
      </div>
      <div className="">
        <button
          className="border-2 py-2 px-2 border-blue-600"
          onClick={session?.user ? () => signOut() : () => signIn()}
        >
          {session?.user ? 'Sair' : 'Entrar'}
        </button>
      </div>
    </header>
  );
};

export default Header;
