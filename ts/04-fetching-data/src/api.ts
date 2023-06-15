import { Book } from "./Book";

const API_URL = "http://localhost:4730";

const getRequestHeaders = (headers?: HeadersInit) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  ...headers,
});

const getRequestInit = (init?: RequestInit) => ({
  method: "get",
  headers: getRequestHeaders(init?.headers),
  ...init,
});

const fetchJson = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, init).then((res) => (res.ok ? res.json() : Promise.reject(res)));

/**
 * Fetch all books from the bookmonkey API.
 * @returns Promise resolving to an array of book objects.
 */
export const getBooks = () =>
  fetchJson<Book[]>(`${API_URL}/books`, getRequestInit());

/**
 * Fetch a specific book by ISBN from the bookmonkey API.
 * @param isbn The books isbn.
 * @returns Promise resolving to a single book object.
 */
export const getBook = (isbn: string) =>
  fetchJson<Book>(`${API_URL}/books/${isbn}`, getRequestInit());

/**
 * POSTS a new book to the bookmonkey API.
 * @param book book object to add.
 * @returns Promise resolving to the added book object.
 */
export const createBook = (book: Omit<Book, "id">) =>
  fetchJson<Book>(
    `${API_URL}/books`,
    getRequestInit({ method: "post", body: JSON.stringify(book) })
  );

/**
 * Updates a book by PUTting it to the bookmonkey API.
 * @param book book object to update.
 * @returns Promise resolving to the updated book object.
 */
export const updateBook = (book: Book) =>
  fetchJson<Book>(
    `${API_URL}/books/${book.isbn}`,
    getRequestInit({ method: "put", body: JSON.stringify(book) })
  );

/**
 * DELETEs a book from the bookmonkey API.
 * @param isbn ISBN of the book that should be removed.
 * @returns A promise resolving to void
 */
export const removeBook = (isbn: string) =>
  fetchJson<void>(
    `${API_URL}/books/${isbn}`,
    getRequestInit({ method: "delete" })
  );
