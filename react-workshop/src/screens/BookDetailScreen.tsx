import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBook } from "../domain/book/api";
import { Book } from "../domain/book/Book";

export const BookDetailScreen = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    if (!isbn) return;
    fetchBook(isbn).then(setBook);
  }, [isbn]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail-screen">
      <img src={book.cover} alt={book.title} />
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <div className="text-meta">by {book.author}</div>
      <small>
        {book.isbn} | {book.numPages} pages
      </small>
      <h2 className="m-top m-bottom">{book.price}</h2>
      <p className="m-top">{book.abstract}</p>

      <Link to="edit" className="m-top">
        <button>
          <span>✏️</span>
          Edit
        </button>
      </Link>
    </div>
  );
};
