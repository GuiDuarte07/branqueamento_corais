import Link from 'next/link';

type Props = {
  title: string;
  authors: string[];
  className: string;
  id: string;
};

const ArticleCard: React.FC<Props> = ({ title, authors, id, className }) => {
  return (
    <div className={className}>
      <Link
        href={`/article/${id}`}
        className="cursor-pointer font-thin font-serif text-blue-500 hover:text-slate-800"
      >
        <span className="text-xl transition-all border-b-transparent border-b-2 hover:border-b-orange-400">
          {title}
        </span>
      </Link>
      <p className="text-sm my-1">{authors.map((author) => author + ', ')}</p>
      <p className="text-sm">
        {/* publicado em:{' '}
        <span>
          {createdAt.toLocaleDateString() +
            ' ' +
            createdAt.toLocaleTimeString()}
        </span> */}
      </p>
    </div>
  );
};

export default ArticleCard;
