import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {
    uploadDir: path.join(process.cwd(), '/public/upload'),
    filename: (name, ext, path) => {
      return Date.now().toString() + '_' + path.originalFilename;
    },
    maxFileSize: 2 * 1024 * 1024,
    filter: ({ mimetype }) => {
      return !!(mimetype && mimetype.includes('pdf'));
    },
    multiples: false,
  };

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    { filePath: string; fileName: string } | { error: string }
  >
) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Não permitido' });
  }

  try {
    await fs.readdir(path.join(process.cwd() + '/public', '/upload'));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/public', '/upload'));
  }
  const {
    files: { pdfFile },
  } = await readFile(req);

  if (pdfFile) {
    res.status(200).json({
      filePath:
        '/public' + (pdfFile as formidable.File).filepath.split('/public')[1],
      fileName: (pdfFile as formidable.File).newFilename,
    });
  }

  res.status(400).json({ error: 'Erro inesperado' });
};

export default handler;
