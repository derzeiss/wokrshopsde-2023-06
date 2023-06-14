const API_URL = "http://localhost:4730";

const getRequestHeaders = (headers) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  ...headers,
});

const getRequestInit = (init) => ({
  method: "get",
  headers: getRequestHeaders(init.headers),
  ...init,
});

const fetchJson = (url, init) =>
  fetch(url, init).then((res) => (res.ok ? res.json() : Promise.reject(res)));

/**
 * Fetch all books from the bookmonkey API.
 * @returns Promise resolving to an array of book objects.
 */
export const getBooks = () => fetchJson(`${API_URL}/books`, getRequestInit());

/**
 * Fetch a specific book by ISBN from the bookmonkey API.
 * @param {string} isbn The books isbn.
 * @returns Promise resolving to a single book object.
 */
export const getBook = (isbn) =>
  fetchJson(`${API_URL}/books/${isbn}`, getRequestInit());

/**
 * POSTS a new book to the bookmonkey API.
 * @param {Book} book book object to add.
 * @returns Promise resolving to the added book object.
 */
export const createBook = (book) =>
  fetchJson(
    `${API_URL}/books`,
    getRequestInit({ method: "post", body: JSON.stringify(book) })
  );

/**
 * Updates a book by PUTting it to the bookmonkey API.
 * @param {Book} book book object to update.
 * @returns Promise resolving to the updated book object.
 */
export const updateBook = (book) =>
  fetchJson(
    `${API_URL}/books/${book.isbn}`,
    getRequestInit({ method: "put", body: JSON.stringify(book) })
  );

/**
 * DELETEs a book from the bookmonkey API.
 * @param {string} isbn ISBN of the book that should be removed.
 * @returns A promise resolving to void
 */
export const removeBook = (isbn) =>
  fetchJson(`${API_URL}/books/${isbn}`, getRequestInit({ method: "delete" }));
