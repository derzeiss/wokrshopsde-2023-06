import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../domain/book/Book";
import { fetchBook, updateBook } from "../domain/book/api";
import { FormBucket } from "../domain/forms/FormBucket";
import { ValidatorFunction } from "../domain/forms/ValidatorFunction";
import { v, validate } from "../domain/forms/validation";

type BookEditFormBucket = Partial<Book>;

const getInitialFormBucket = (): FormBucket<BookEditFormBucket> => ({
  values: {
    title: "",
    subtitle: "",
    author: "",
    numPages: 0,
  },
  touched: {},
  errors: {},
  validators: {
    title: [v.required(), v.minLength(5)],
    numPages: [v.number(), v.min(0)],
  },
  initialValues: {} as BookEditFormBucket,
  hasChanged: false,
});

export const BookEditScreen = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<Book>();
  const [title, setTitle] = useState("");
  const [formBucket, setFormBucket] = useState(getInitialFormBucket());

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.name;
    const newVal = ev.target.value;
    const validators = (
      formBucket.validators as Record<string, ValidatorFunction[]>
    )[name];

    const validationErrors = validate(newVal, validators);

    setFormBucket({
      ...formBucket,
      values: {
        ...formBucket.values,
        [ev.target.name]: ev.target.value,
      },
      errors: {
        ...formBucket.errors,
        [ev.target.name]: validationErrors,
      },
    });
  };

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    setFormBucket({
      ...formBucket,
      touched: {
        ...formBucket.touched,
        [ev.target.name]: true,
      },
    });
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
    if (!book) return;

    updateBook({ ...book, title })
      .then((data) => console.log("Updated successfully. Response:", data))
      .catch((err) => console.error("Error while updating book. Error:", err));
  };

  return (
    <>
      <form className="book-edit-screen" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formBucket.values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="none"
          />
          {formBucket.touched.title && formBucket.errors.title && (
            <div className="error">{formBucket.errors.title[0]}</div>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="subtitle">Subtitle</label>
          <input
            id="subtitle"
            name="subtitle"
            value={formBucket.values.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="none"
          />
          {formBucket.touched.subtitle && formBucket.errors.subtitle && (
            <div className="error">{formBucket.errors.subtitle[0]}</div>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            value={formBucket.values.author}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="none"
          />
          {formBucket.touched.author && formBucket.errors.author && (
            <div className="error">{formBucket.errors.author[0]}</div>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="numPages">Number of pages</label>
          <input
            id="numPages"
            name="numPages"
            type="number"
            value={formBucket.values.numPages}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="none"
          />
          {formBucket.touched.numPages && formBucket.errors.numPages && (
            <div className="error">{formBucket.errors.numPages[0]}</div>
          )}
        </fieldset>

        <button type="submit" className="m-top">
          <span>💾</span>
          Save
        </button>

        <pre>{JSON.stringify(formBucket, null, 2)}</pre>
      </form>
    </>
  );
};
