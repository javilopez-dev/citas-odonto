import { Autocomplete } from "./Autocomplete";
import { Field } from "formik";

export const AutocompleteField = ({ name, options, ...rest }) => {

    console.log("AutocompleteField", rest)
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <Autocomplete
            field={field}
            form={form}
            options={options}
            {...rest}
          />
        );
      }}
    </Field>
  );
};