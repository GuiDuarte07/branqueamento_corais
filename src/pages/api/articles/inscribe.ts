import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string | undefined;
    abstract: string | undefined;
    authors: string[] | undefined;
    keywords: string[] | undefined;
  };
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<{ sucessfully: true } | { error: string }>
) => {
  const { title, abstract, authors, keywords } = req.body;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: 'Não permitido' });
  }

  if (!title || !abstract || !authors || !keywords) {
    return res.status(400).json({ error: 'Algum dado não foi enviado' });
  }

  if (
    typeof title !== 'string' ||
    typeof abstract !== 'string' ||
    !Array.isArray(authors) ||
    !Array.isArray(keywords)
  ) {
    return res
      .status(400)
      .json({ error: 'Tipo dos dados enviados são inválidos' });
  }

  res.status(200).json({ sucessfully: true });
};

export default handler;
