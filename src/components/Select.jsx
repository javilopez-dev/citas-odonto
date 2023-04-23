const { Field } = require("formik");

export const Select = (props) => {
  const { name, options, ...rest } = props;
  return (
    <>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        // validate={(value) => value.includes["M", "F"] ? "ERROR" : ""}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </Field>
    </>
  );
};