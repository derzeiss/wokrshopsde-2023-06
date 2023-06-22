import { usePrimaryColor } from "../domain/theme/hooks";
import logo from "../images/logo.png";
import { ThemeEditor } from "./ThemeEditor";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  const primaryColor = usePrimaryColor();

  return (
    <header className="app-header">
      <img src={logo} alt="Awesome comic-style monkey with sunglasses" />
      <h1 style={{ color: primaryColor }}>Bookmonkey</h1>
      <ThemeEditor />

      <nav>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
};
