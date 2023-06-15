import logo from "../images/logo.png";

export const AppHeader = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="Awesome comic-style monkey with sunglasses" />
      <h1>Bookmonkey</h1>
    </header>
  );
};
