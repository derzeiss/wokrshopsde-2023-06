import { useRef, FormEvent } from "react";

export const BookEditScreen = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    // Be careful when using the ! operator to assert that a value is not null or undefined.
    // In this case it is ok, as we know that the ref will always be set to an element.
    console.log(titleInputRef.current!.value);
  };

  return (
    <>
      <form className="book-edit-screen" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input ref={titleInputRef} type="text" id="title" name="title" />

        <button type="submit" className="m-top">
          <span>💾</span>
          Save
        </button>
      </form>
    </>
  );
};
