import axios from "axios";
import { useState, useEffect } from "react";

export function Select(props) {
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [municipioSelecionado, setMunicipioSelecionado] = useState("");

  useEffect(() => {
    // Busca a lista de estados na API ViaCEP
    axios.get("https://viacep.com.br/ws/RS/json/").then((response) => {
      setEstados(response.data.map((estado) => estado.uf));
    });
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      // Busca a lista de municípios para o estado selecionado
      axios
        .get(`https://viacep.com.br/ws/${estadoSelecionado}/json/`)
        .then((response) => {
          setMunicipios(response.data.map((municipio) => municipio.localidade));
        });
    }
  }, [estadoSelecionado]);

  function handleEstadoChange(event) {
    const estado = event.target.value;
    setEstadoSelecionado(estado);
    setMunicipioSelecionado("");
    if (props.onChange) {
      props.onChange(estado, "");
    }
  }

  function handleMunicipioChange(event) {
    const municipio = event.target.value;
    setMunicipioSelecionado(municipio);
    if (props.onChange) {
      props.onChange(estadoSelecionado, municipio);
    }
  }

  return (
    <div>
      <label>
        Estado:
        <select value={estadoSelecionado} onChange={handleEstadoChange}>
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </label>
      <label>
        Município:
        <select value={municipioSelecionado} onChange={handleMunicipioChange}>
          <option value="">Selecione um município</option>
          {municipios.map((municipio) => (
            <option key={municipio} value={municipio}>
              {municipio}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}