# Form com React Hook Form

**A biblioteca nativa do React faz com que se torne simples e totalmente interativa ao desenvolvedor! Com componentes que além de dentro do HTML faz o *props* com tudo que precisa ser colocado de propriedade, ainda sim consegue fazer interacões com os objetos criados dentro do componente com o JavaScript!**

Imagino ainda que esse poder seja ainda mais seguro dentro do formulário, ao ser usado com o superset, com o ***TypeScript***, já que a própria lib indica o uso, mesmo não o obrigando...

## Entendendo como usar

- **Exemplo:**

```jsx
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";

const App = () => {
    // Objeto em JavaScript
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {}
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="select"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" }
          ]} 
        />}
      />
      <input type="submit" />
    </form>
  );
};

```

**No exemplo percebe-se que o React consegue integrar os objetos que foram criados no seu ambiente em JavaScript, aos próprios objetos comuns em HTML, fazendo com que suas propriedades se tornem interativas e mutáveis, tendo mais controle sobre elas dentro do desenvolvimento!**

---