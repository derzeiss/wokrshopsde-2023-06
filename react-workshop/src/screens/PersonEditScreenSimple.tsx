import { ChangeEvent, useState } from "react";

interface PersonEditFormData {
  firstname: string;
  lastname: string;
}

const getBlankFormData = (): PersonEditFormData => ({
  firstname: "",
  lastname: "",
});

const validateFirstname = (firstname: string) => {
  if (!firstname?.length) return "Please fill out this field";
  if (firstname.length < 5)
    return "Firstname should have at least 5 characters";
  return undefined;
};

export const PersonEditScreenSimple = () => {
  const [formData, setFormData] = useState(getBlankFormData());
  const firstnameError = validateFirstname(formData.firstname);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <form className="book-edit-screen" noValidate>
      <fieldset>
        <label htmlFor="firstname">first name</label>
        <input
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          autoComplete="none"
        />
        {firstnameError && <div className="error">{firstnameError}</div>}
      </fieldset>

      <fieldset>
        <label htmlFor="lastname">last name</label>
        <input
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          autoComplete="none"
        />
      </fieldset>
      <button type="submit">
        <span>🚀</span>
        submit
      </button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  );
};
