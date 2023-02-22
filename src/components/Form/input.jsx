import { input } from "./index.css";

export function Input({ type, name, label, register, ...rest }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} className={input} {...register(label, { ...rest })} />
    </>
  );
}
