import { useState, ChangeEvent } from "react";

interface PersonEditFormData {
  firstname: string;
  lastname: string;
}

const getBlankFormData = (): PersonEditFormData => ({
  firstname: "",
  lastname: "",
});

export const PersonEditScreen = () => {
  const [formData, setFormData] = useState(getBlankFormData());

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <form className="book-edit-screen">
      <label htmlFor="firstname">first name</label>
      <input
        id="firstname"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
      />
      <label htmlFor="lastname">last name</label>
      <input
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
      />
      <button type="submit" className="m-top">
        <span>🚀</span>
        submit
      </button>
    </form>
  );
};
