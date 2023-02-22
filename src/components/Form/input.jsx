import { input, labelInput } from "./index.css";

export function Input({ type, name, label, register, placeholder, ...rest }) {
  return (
    <>
      <label className={labelInput} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={input}
        {...register(name, { ...rest })}
      />
    </>
  );
}
