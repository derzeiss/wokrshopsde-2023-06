import { HTMLProps, useState } from "react";
import { useFormBucket } from "../domain/forms/FormBucketContext";
import { getNextId } from "../common/util/getNextId";
import { cx } from "../common/util/cx";

interface TextboxProps extends HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
}

/**
 * Basic input component
 * @param props Accepts all props an HTMLInputElement would accept
 * @param props.label label displayed above the input.
 */
export const Textbox: React.FC<TextboxProps> = ({
  label,
  name,
  id,
  className,
  onChange,
  onBlur,
  ...props
}) => {
  const [id_safe] = useState(id || getNextId());
  const { formBucket, getChangeHandler, getBlurHandler } = useFormBucket();

  const data = formBucket.values as Record<string, string>;
  const touched = formBucket.touched as Record<string, boolean>;
  const errors = formBucket.errors as Record<string, string>;

  const shouldShowError = !!(touched[name] && errors[name]);

  return (
    <fieldset>
      <label htmlFor={id_safe}>{label}</label>
      <input
        {...props}
        className={cx(className, { textbox_invalid: shouldShowError })}
        name={name}
        value={data[name]}
        onChange={getChangeHandler(onChange)}
        onBlur={getBlurHandler(onBlur)}
      />
      {shouldShowError && <div className="error">{errors[name][0]}</div>}
    </fieldset>
  );
};
