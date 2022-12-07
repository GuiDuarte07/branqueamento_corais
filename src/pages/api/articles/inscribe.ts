import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prismadb';
import { Authors } from '@prisma/client';

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

export type InscribeApiResponde = { sucessfully: true } | { error: string };

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<InscribeApiResponde>
) => {
  const { title, abstract, authors, keywords, pdfName, pdfpath } = req.body;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: 'Não permitido' });
  }

  if (!title || !abstract || !pdfName || !pdfpath || !authors || !keywords) {
    return res.status(400).json({ error: 'Algum dado não foi enviado' });
  }

  if (
    typeof title !== 'string' ||
    typeof abstract !== 'string' ||
    typeof pdfName !== 'string' ||
    typeof pdfpath !== 'string' ||
    !Array.isArray(authors) ||
    !Array.isArray(keywords)
  ) {
    return res
      .status(400)
      .json({ error: 'Tipo dos dados enviados são inválidos' });
  }

  if (!session?.user?.email)
    return res
      .status(400)
      .json({ error: 'Tipo dos dados enviados são inválidos' });

  console.log(authors);

  const result = await prisma.article.create({
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

  console.log(result);

  res.status(200).json({ sucessfully: true });
};

export default handler;
