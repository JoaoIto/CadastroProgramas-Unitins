import { Input } from "./input";
import { useForm } from "react-hook-form";
import { container, submit } from "./index.css";

export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    console.log(data);
  }; // watch input value by passing the name of it

  return (
    <>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="aluno1.nome"
          label="Nome completo: "
          register={register}
          placeholder="Insira seu nome completo: "
          required
        />
        <Input
          type="email"
          name="aluno1.email"
          label="Email: "
          register={register}
          placeholder="Insira seu email institucional:"
          required
        />

        <Input
          type="tel"
          name="aluno1.telefone"
          label="Telefone: "
          register={register}
          placeholder="Insira seu telefone:"
          required
        />

        <Input
          type="number"
          name="aluno1.rg"
          label="RG: "
          register={register}
          placeholder="Insira seu registro civil:"
          required
        />

        <Input
          type="text"
          name="aluno1.address.rua"
          label="Endereço: "
          register={register}
          placeholder="Insira seu endereço:"
          required
        />

        <Input
          type="text"
          name="aluno1.address.bairro"
          label="Bairro: "
          register={register}
          placeholder="Bairro:"
          required
        />

        <Input
          type="text"
          name="aluno1.address.cep"
          label="CEP: "
          register={register}
          placeholder="CEP:"
          required
        />

        <Input
          type="text"
          name="aluno1.address.cidade"
          label="Cidade: "
          register={register}
          placeholder="Cidade:"
          required
        />

        <input className={submit} type="submit" />
      </form>
    </>
  );
}
