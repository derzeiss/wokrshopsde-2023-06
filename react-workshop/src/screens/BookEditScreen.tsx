import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBook } from "../domain/book/api";
import { Book } from "../domain/book/Book";

interface BookEditFormData {
  title: string;
}

export const BookEditScreen = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [, setBook] = useState<Book>();
  const [title, setTitle] = useState("");

  const [formData, setFormData] = useState<BookEditFormData>({ title: "" });

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  useEffect(() => {
    if (!isbn) return;
    fetchBook(isbn).then((book) => {
      setBook(book);
      setTitle(book.title);
    });
  }, [isbn]);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    console.log(title);
  };

  return (
    <>
      <form className="book-edit-screen" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setTitle(ev.target.value)
          }
        />

        <button type="submit" className="m-top">
          <span>💾</span>
          Save
        </button>
      </form>
    </>
  );
};
