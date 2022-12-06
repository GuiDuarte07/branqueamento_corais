import axios from 'axios';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Author } from '../../../@types/types';
import Container from '../../../components/container';
import Header from '../../../components/Header';
import validateNewAuthor from '../../../utils/Validations';
import { InscribeApiResponde } from '../../api/articles/inscribe';

const Article: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>();

  const [authors, setAuthors] = useState<Author[]>([
    {
      name: 'José Guilherme Duarte Abrantes',
      phone: '(84)9997-14703',
      email: 'guilduarte07@gmail.com',
    },
  ]);

  const [authorNameInput, setAuthorNameInput] = useState<string>('');
  const [authorEmailInput, setAuthorEmailInput] = useState<string>('');
  const [authorPhoneInput, setAuthorPhoneInput] = useState<string>('');

  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [selectedFile, setSelecetFile] = useState<File | null>(null);

  function addNewAuthor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = validateNewAuthor(
      authorNameInput,
      authorEmailInput,
      authorPhoneInput
    );

    //if (!result.email && !result.name && !result.phone) return;

    setAuthors((prev) => {
      const prevState = structuredClone(prev);

      prevState[prevState.length - 1].name = authorNameInput;
      prevState[prevState.length - 1].email = authorEmailInput;
      prevState[prevState.length - 1].phone = authorPhoneInput;

      prevState.push({ name: '', phone: '', email: '' });

      return prevState;
    });
  }

  async function submitApplication() {
    setFileLoading(true);
    if (!selectedFile) return;

    let fileResult: { filePath: string; fileName: string } | undefined;

    try {
      const formData = new FormData();
      formData.append('pdfFile', selectedFile);
      const { data } = await axios.post('/api/articles/upload', formData);
      fileResult = data;
    } catch (error) {
      console.log(error);
    }

    if (fileResult) {
      const { fileName, filePath } = fileResult;
      try {
        const { data } = await axios.post<InscribeApiResponde>(
          '/api/articles/inscribe',
          {
            title,
            abstract: textareaRef.current?.value,
            pdfName: fileName,
            pdfpath: filePath,
            authors,
            keywords: ['dasd', 'sdasd'],
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    setFileLoading(false);
  }

  return (
    <>
      <Header />
      <Container>
        <section className="pb-16 md:w-7/12 flex flex-col gap-4">
          <div className="h-20 w-full border-b-2 border-b-gray-500 flex">
            <p className="flex-1">RepoAmazing</p>
            <div className="">
              <h3 className="">Evento científico de branqueamento de corais</h3>
              <p className="">Todos os direitos reservados - 2022</p>
            </div>
          </div>

          <h1 className="mt-10 mb-2 font-normal text-2xl ">
            Submeta seu artigo
          </h1>

          <label htmlFor="title" className="">
            Insira o título do seu artigo
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            className=""
            placeholder="título do artigo"
          />

          <label htmlFor="resume" className="">
            Insira um resumo do seu artigo
          </label>
          <textarea
            ref={textareaRef}
            id="resume"
            className="bg-gray-100 min-h-[150px] rounded pt-1 pl-2 text-gray-700 outline-none"
          />

          <div className="flex flex-col gap-4">
            Autores que escreveram esse artigo
            {authors.map(({ name, email, phone }) => (
              <div key={name} className="pb-1 flex border-b border-b-slate-400">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold">{name}</h3>
                  <div className="pl-4 flex gap-8">
                    <h4 className="text-gray-500">{email}</h4>
                    <p className="my-auto text-sm text-gray-400">{phone}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-amber-300 w-6 rounded font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <form className="flex flex-col" onSubmit={(e) => addNewAuthor(e)}>
            <h3 className="">Autores</h3>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="authorName" className="">
                  Nome
                </label>
                <input
                  id="authorName"
                  type="text"
                  className="pl-1 flex-1 border-b-2 border-gray-300"
                  value={authorNameInput}
                  onChange={(e) => setAuthorNameInput(e.target.value)}
                />
                <label htmlFor="authorEmail" className="">
                  Email
                </label>
                <input
                  id="authorEmail"
                  type="text"
                  className="pl-1 flex-1 border-b-2 border-gray-300"
                  value={authorEmailInput}
                  onChange={(e) => setAuthorEmailInput(e.target.value)}
                />
                <label htmlFor="authorPhone" className="">
                  Telefone
                </label>
                <input
                  id="authorPhone"
                  type="text"
                  className="pl-1 flex-1 border-b-2 border-gray-300"
                  value={authorPhoneInput}
                  onChange={(e) => setAuthorPhoneInput(e.target.value)}
                />
              </div>
              <button
                className="bg-amber-400 w-8 rounded-md font-bold text-lg"
                type="submit"
              >
                +
              </button>
            </div>
          </form>

          <label htmlFor="pdfFile" className="">
            Enviar arquivo PDF do artigo
          </label>
          <input
            type="file"
            id="pdfFile"
            className=""
            disabled={fileLoading}
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelecetFile(file);
              }
            }}
          />
        </section>
        <button onClick={() => submitApplication()}>Enviar um arquivo</button>
      </Container>
    </>
  );
};

export default Article;
