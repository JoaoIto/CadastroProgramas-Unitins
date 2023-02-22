import { Input } from "./input";
import { useForm } from "react-hook-form";
import { container } from "./index.css";

export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  }; // watch input value by passing the name of it

  return (
    <>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="nome1"
          label="Nome Completo: "
          register={register}
          required
        />

        {/* include validation with required or other standard HTML validation rules */}
        <Input 
        name="cpf1"
        type="number" 
        label="CPF: " 
        register={register} 
        required 
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
}
