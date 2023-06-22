import { ValidatorFunction } from "./ValidatorFunction";

export interface FormBucket<T> {
  values: T;
  touched: { [key in keyof T]?: boolean };
  errors: { [key in keyof T]?: string };
  validators: { [key in keyof T]?: ValidatorFunction[] };
  initialValues: T;
  hasChanged: boolean;
}
