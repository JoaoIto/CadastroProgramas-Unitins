import { Input } from "./input";
import { useForm } from "react-hook-form";
import { styles } from "./index.css";


export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();// watch input value by passing the name of it

  return (
    <>
      <form
        className={styles.container}
        onSubmit={handleSubmit((data) => {
          console.log(JSON.stringify(data));
          console.log(watch(data));
        })}
      >
        <Input
          type="text"
          name="aluno1.nome"
          label="Nome completo: "
          register={register}
          placeholder="Insira seu nome completo: "
          required
        />

        <Input
          type="date"
          name="aluno1.dataDeNascimento"
          label="Data de Nascimento: "
          register={register}
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
          name="aluno1.documentos.rg.RG"
          label="RG: "
          register={register}
          placeholder="Insira seu registro civil:"
          required
        />

        <Input
          type="text"
          name="aluno1.documentos.rg.orgãoEmissor"
          register={register}
          placeholder="Insira o orgão emissor:"
          required
        />

        <Input
          type="text"
          label="CPF: "
          name="aluno1.documentos.CPF"
          register={register}
          placeholder="Insira o seu número de CPF:"
          required
        />

        <Input
          type="text"
          name="aluno1.endereco.rua"
          label="Endereço: "
          register={register}
          placeholder="Insira seu endereço:"
          required
        />

        <Input
          type="text"
          name="aluno1.endereco.bairro"
          label="Bairro: "
          register={register}
          placeholder="Bairro:"
          required
        />

        <Input
          type="number"
          name="aluno1.endereco.cep"
          label="CEP: "
          register={register}
          placeholder="CEP:"
          maxlength="10"
          required
        />

        <input className={styles.submit} type="submit" />
      </form>
    </>
  );
}
