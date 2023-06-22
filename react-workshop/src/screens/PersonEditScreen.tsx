import { ChangeEvent, FocusEvent, useState } from "react";
import { FormBucket } from "../domain/forms/FormBucket";

interface PersonEditFormData {
  firstname: string;
  lastname: string;
}

const getBlankFormData = (): FormBucket<PersonEditFormData> => ({
  values: {
    firstname: "",
    lastname: "",
  },
  touched: {},
  errors: {},
  validators: {},
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
  const firstnameError = validateFirstname(formData.values.firstname);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [ev.target.name]: ev.target.value,
      },
    });
  };

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
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
          value={formData.values.firstname}
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
          value={formData.values.lastname}
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
