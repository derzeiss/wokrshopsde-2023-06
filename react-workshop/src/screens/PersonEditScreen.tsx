import { ChangeEvent, FocusEvent, useState } from "react";

interface FormData<T> {
  data: T;
  touched: { [key: string]: boolean };
  errors: { [key in keyof T]?: string };
}
interface PersonEditFormData {
  firstname: string;
  lastname: string;
}

const getBlankFormData = (): FormData<PersonEditFormData> => ({
  data: {
    firstname: "",
    lastname: "",
  },
  touched: {},
  errors: {},
});

const validateFirstname = (firstname: string) => {
  const requiredErr = validator.required(firstname);
  if (requiredErr) return requiredErr;
  if (firstname.length < 5)
    return "Firstname should have at least 5 characters";
  return undefined;
};

const validator = {
  required: (val: any, msg?: string) =>
    !!val && val.length ? undefined : msg ?? "Please fill out this field",
};

export const PersonEditScreen = () => {
  const [formData, setFormData] = useState(getBlankFormData());
  const firstnameError = validateFirstname(formData.data.firstname);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        [ev.target.name]: ev.target.value,
      },
    });
  };

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    if (formData.touched[ev.target.name]) return;

    setFormData({
      ...formData,
      touched: {
        ...formData.touched,
        [ev.target.name]: true,
      },
    });
  };

  return (
    <form className="book-edit-screen">
      <fieldset>
        <label htmlFor="firstname">first name</label>
        <input
          id="firstname"
          name="firstname"
          value={formData.data.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="none"
        />
        {formData.touched.firstname && firstnameError && (
          <div className="error">{firstnameError}</div>
        )}
      </fieldset>

      <fieldset>
        <label htmlFor="lastname">last name</label>
        <input
          id="lastname"
          name="lastname"
          value={formData.data.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
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
