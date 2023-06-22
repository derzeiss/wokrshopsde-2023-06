import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { fetchBook } from "./domain/book/api";
import { AboutScreen } from "./screens/AboutScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { BookEditScreenWithContext } from "./screens/BookEditScreenWithContext";
import { BooksScreen } from "./screens/BooksScreen";
import { ErrorScreen } from "./screens/ErrorScreen";
import { PersonEditScreen } from "./screens/PersonEditScreen";
import { PersonEditScreenSimple } from "./screens/PersonEditScreenSimple";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "",
        loader: () => redirect("books"),
      },
      {
        path: "books",
        element: <BooksScreen />,
      },
      {
        path: "about",
        element: <AboutScreen />,
      },
      {
        path: "books/:isbn",
        element: <BookDetailScreen />,
      },
      {
        path: "books/:isbn/edit",
        element: <BookEditScreenWithContext />,
        loader: ({ params }) => fetchBook(params.isbn || ""),
      },
      {
        path: "person-simple",
        element: <PersonEditScreenSimple />,
      },
      {
        path: "person",
        element: <PersonEditScreen />,
      },
    ],
  },
]);
