import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import {
  createBook,
  getBook,
  getBooks,
  removeBook,
  updateBook,
} from "./api.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

// fetch book task

const randrange = (max: number) => Math.floor(Math.random() * max);

const books = await getBooks();
console.log("books", books);

getBook(books[42].isbn).then((book) => console.log("book", book));
updateBook({ ...books[42], numPages: randrange(1000) }).then((book) =>
  console.log("updated book", book)
);
const newBook = await createBook({
  title: "tmp book",
  subtitle: "subtitle",
  isbn: "isbn",
  abstract: "abstract",
  author: "author",
  publisher: "publisher",
  price: "price",
  numPages: 123,
  cover: "cover",
});

console.log("created book", newBook);

removeBook(newBook.isbn).then((response) =>
  console.log("deleted book", response)
);
