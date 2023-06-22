import { FormEvent, ReactNode, useState } from "react";
import { type FormBucket } from "../domain/forms/FormBucket";
import { FormBucketContext } from "../domain/forms/FormBucketContext";
import { ValidatorFunction } from "../domain/forms/ValidatorFunction";

interface FormProps<T> {
  /** Initial form value */
  initialValues: T;
  /** object of validators for form */
  validators?: { [key in keyof T]?: ValidatorFunction[] };
  /**
   * Form submit handler.
   * @param bucket formBucket containing the current values, errors, etc.
   */
  onFormSubmit: (bucket: FormBucket<T>) => void;
  /** children can be either a default {@link ReactNode} or a render-function */
  children?: ReactNode | ((formBucket: FormBucket<T>) => ReactNode);

  /** HTML-PROPS */
  className?: string;
}

/**
 * Form component that provides a {@link FormBucketContext} to all children.
 * Will call onFormSubmit on submit instead of onSubmit.
 */
export const Form = <T extends {}>({
  initialValues,
  validators,
  onFormSubmit,
  children,
  ...props
}: FormProps<T>) => {
  const [formBucket, setFormBucket] = useState<FormBucket<T>>({
    values: initialValues,
    touched: {},
    errors: {},
    validators: validators || {},
  });

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // don't submit if there are any validation errors
    if (Object.values(formBucket.errors).some((e) => !!e)) return;
    onFormSubmit(formBucket);
  };

  return (
    <FormBucketContext.Provider value={{ formBucket, setFormBucket }}>
      <form {...props} onSubmit={handleSubmit}>
        {children && typeof children === "function"
          ? children(formBucket)
          : children}
      </form>
    </FormBucketContext.Provider>
  );
};
