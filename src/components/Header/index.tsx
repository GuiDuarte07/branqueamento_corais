import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function escKeyInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setShowSearchBar(false);
    }
  }

  function searchArticle() {
    const searchText = searchInputRef.current?.value;
    if (searchText) {
      router.push(`/${searchText}`);
    }
  }

  return (
    <header className="px-4 md:px-16 h-16 w-full bg-white flex justify-between items-center">
      <div className="">
        <h2 className="">RepoAmazing</h2>
      </div>
      <div className="flex-1 text-center items-center justify-center flex h-full">
        {showSearchBar ? (
          <form
            onSubmit={() => searchArticle()}
            className="w-5/6 flex items-center gap-2 h-4/6 border-b-2 border-gray-500"
          >
            <label htmlFor="search">
              <Image
                alt="search"
                src="/images/searchIcon.svg"
                height={18}
                width={18}
              />
            </label>
            <input
              autoFocus
              ref={searchInputRef}
              onKeyDown={(e) => escKeyInput(e)}
              id="search"
              type="text"
              className="w-full h-4/6 bg-inherit outline-none"
            />
            <button type="button" onClick={() => setShowSearchBar(false)}>
              <p className="font-bold text-xl">x</p>
            </button>
          </form>
        ) : (
          <div className="w-full h-full mx-8 flex justify-end">
            <button onClick={() => setShowSearchBar(true)} className="">
              <Image
                alt="search"
                src="/images/searchIcon.svg"
                height={18}
                width={18}
              />
            </button>
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
