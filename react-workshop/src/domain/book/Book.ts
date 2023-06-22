export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  abstract?: string;
  author?: string;
  publisher?: string;
  price?: string;
  numPages?: number;
  cover?: string;
}
