import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prismadb';
import { InscribeApiResponde } from '../../../../types/types';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    articleId: string;
  };
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<InscribeApiResponde>
) => {
  const { articleId } = req.body;
  console.log(articleId);

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user.role === 'USER') {
    res.status(401).json({ message: 'Não permitido', isError: true });
  }

  if (typeof articleId !== 'string' || !articleId) {
    return res
      .status(400)
      .json({ message: 'Algum dado não foi enviado', isError: true });
  }

  try {
    await prisma.article.update({
      where: { id: articleId },
      data: { approved: true },
    });
  } catch (e) {
    return res
      .status(404)
      .json({ message: 'Erro interno no servidor', isError: true });
  }

  res.status(200).json({ message: 'Requisição concluida', isError: false });
};

export default handler;
