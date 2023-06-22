import { useLoaderData } from "react-router-dom";
import { Form } from "../components/Form";
import { Textbox } from "../components/Textbox";
import { Book } from "../domain/book/Book";
import { updateBook } from "../domain/book/api";
import { FormBucket } from "../domain/forms/FormBucket";
import { v } from "../domain/forms/validation";

type BookEditFormBucket = Partial<Book>;

const validators = {
  title: [v.required(), v.minLength(5)],
  numPages: [
    v.number(),
    v.min(0, "A book cannot have a negative number of pages"),
  ],
};

export const BookEditScreenWithContext = () => {
  const book = useLoaderData() as Book;

  const handleSubmit = (bucket: FormBucket<BookEditFormBucket>) => {
    if (!book) return;
    console.log("submit", bucket);

    updateBook({ ...book })
      .then((data) => console.log("Updated successfully. Response:", data))
      .catch((err) => console.error("Error while updating book. Error:", err));
  };

  return (
    <>
      <Form
        className="book-edit-screen"
        onFormSubmit={handleSubmit}
        initialValues={book}
        validators={validators}
      >
        {(formBucket) => (
          <>
            <Textbox label="Title" name="title" />
            <Textbox label="Subtitle" name="subtitle" />
            <Textbox label="Author" name="author" />
            <Textbox label="Number of pages" name="numPages" type="number" />

            <button type="submit" className="m-top">
              <span>💾</span>
              Save
            </button>

            <pre>{JSON.stringify(formBucket, null, 2)}</pre>
          </>
        )}
      </Form>
    </>
  );
};
