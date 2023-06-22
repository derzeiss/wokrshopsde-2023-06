import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  createContext,
  useContext,
} from "react";
import { FormBucket } from "./FormBucket";
import { ValidatorFunction } from "./ValidatorFunction";
import { validate } from "./validation";

export const getEmptyFormBucket = <T,>(): FormBucket<T> => ({
  values: {} as T,
  touched: {},
  errors: {},
  validators: {},
});

interface FormBucketContextValue<T> {
  formBucket: FormBucket<T>;
  setFormBucket: (newBucket: FormBucket<T>) => void;
}

/**
 * Holds a form bucket. Used as provider in the {@link Form} component and as consumer in {@link useFormBucket}.
 */
export const FormBucketContext = createContext<FormBucketContextValue<any>>({
  formBucket: getEmptyFormBucket(),
  setFormBucket: () => {},
});

export const useFormBucket = <T extends object>() => {
  const { formBucket, setFormBucket } =
    useContext<FormBucketContextValue<T>>(FormBucketContext);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.name;
    const newVal = ev.target.value;
    const validators = (
      formBucket.validators as Record<string, ValidatorFunction[]>
    )[name];

    const validationErrors = validate(newVal, validators);

    setFormBucket({
      ...formBucket,
      values: {
        ...formBucket.values,
        [ev.target.name]: ev.target.value,
      },
      errors: {
        ...formBucket.errors,
        [ev.target.name]: validationErrors,
      },
    });
  };

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    setFormBucket({
      ...formBucket,
      touched: {
        ...formBucket.touched,
        [ev.target.name]: true,
      },
    });
  };

  const getChangeHandler =
    (onChange?: ChangeEventHandler<HTMLInputElement>) =>
    (ev: ChangeEvent<HTMLInputElement>) => {
      handleChange(ev);
      onChange && onChange(ev);
    };

  const getBlurHandler =
    (onChange?: FocusEventHandler<HTMLInputElement>) =>
    (ev: FocusEvent<HTMLInputElement>) => {
      handleBlur(ev);
      onChange && onChange(ev);
    };

  const setValues = (values: T) =>
    setFormBucket({ ...formBucket, values: { ...values } });

  return { formBucket, getChangeHandler, getBlurHandler, setValues };
};
