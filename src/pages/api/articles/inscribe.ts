import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prismadb';
import { Authors } from '@prisma/client';
import { InscribeApiResponde } from '../../../../types/types';
import path from 'path';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string | undefined;
    abstract: string | undefined;
    pdfName: string | undefined;
    pdfpath: string | undefined;
    authors: Authors[] | undefined;
    keywords: string[] | undefined;
  };
}

function deleteFile(pdfName: string) {
  //console.log(fs.readdirSync(''));
  //console.log(path.resolve('./'));
  fs.unlinkSync(path.join(process.cwd() + '/public', '/upload/', pdfName));
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<InscribeApiResponde>
) => {
  const { title, abstract, authors, keywords, pdfName, pdfpath } = req.body;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ isError: true, message: 'Não permitido' });
  }

  if (!title || !abstract || !pdfName || !pdfpath || !authors || !keywords) {
    return res
      .status(400)
      .json({ isError: true, message: 'Algum dado não foi enviado' });
  }

  if (
    typeof title !== 'string' ||
    typeof abstract !== 'string' ||
    typeof pdfName !== 'string' ||
    typeof pdfpath !== 'string' ||
    !Array.isArray(authors) ||
    !Array.isArray(keywords)
  ) {
    deleteFile(pdfName);
    return res.status(400).json({
      isError: true,
      message: 'Tipo dos dados enviados são inválidos',
    });
  }

  if (!session?.user?.email) {
    deleteFile(pdfName);
    return res.status(400).json({
      isError: true,
      message: 'Tipo dos dados enviados são inválidos',
    });
  }

  try {
    await prisma.article.create({
      data: {
        title,
        abstract,
        pdfName,
        pdfpath,
        User: { connect: { email: session?.user?.email } },
        keywords: {
          createMany: {
            data: keywords.map((keyword) => ({
              name: keyword,
            })),
          },
        },
        Authors: {
          createMany: {
            data: authors,
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
    deleteFile(pdfName);
    return res
      .status(404)
      .json({ message: 'Erro interno no servidor', isError: true });
  }

  res.status(200).json({ message: 'Requisição concluida', isError: false });
};

export default handler;
