import './App.css';
import React, { useState } from 'react';

function App() {

  const [cepDigitado, setCepDigitado] = useState(''); // Estado para armazenar o CEP digitado
  const [buscaCep, setBuscaCep] = useState({}); // Estado para armazenar os dados do CEP  

  const handleCepChange = (event) => {
    setCepDigitado(event.target.value);
  };

  const limparFormulario = () => {
    setCepDigitado('');
    setBuscaCep({}); 
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário   

    if (!cepDigitado) return; // Verifica se o cepDigitado está definido

    async function loadApi() {
      let url = `https://viacep.com.br/ws/${cepDigitado}/json/`;

      fetch(url)
        .then((result) => result.json())
        .then((data) => {
          console.log(data);
          setBuscaCep(data);
        })       
        .catch((error) => {
          console.error('Ocorreu um erro no processamento dos dados, verifique o valor do CEP', error);
        });
    }  

    loadApi();
  };

  return (
    <div className="container">
      <header>
        <strong>ENCONTRE SEU ENDEREÇO PELO CEP</strong>
        <p>Digite seu CEP abaixo para fazer a pesquisa:</p>
      </header>     

      {/* Formulário para inserir o CEP */}
      <form onSubmit={handleSubmit}>
        <input className='txtBox'
          type="text"
          value={cepDigitado}
          onChange={handleCepChange}               
        />
        <button className="bt1" type="submit">Buscar</button>
        <button className="bt2" type="submit" onClick={limparFormulario}>Limpar</button>
      </form>

      {/* Exibe os dados do CEP */}
      {Object.keys(buscaCep).length > 0 && (
        <article className="objeto">
          <p className="cep"><b>CEP:</b> {buscaCep.cep}</p>
          <p className="logradouro"><b>Rua:</b> {buscaCep.logradouro}</p>
          <p className="bairro"><b>Bairro:</b> {buscaCep.bairro}</p>
          <p className="localidade"><b>Cidade:</b> {buscaCep.localidade}</p>
          <p className="uf"><b>UF:</b> {buscaCep.uf}</p>
          <p className="ibge"><b>IBGE:</b> {buscaCep.ibge}</p>
          <p className="complemento"><b>Complemento:</b> {buscaCep.complemento}</p>
        </article>         
      )}       
    </div>
  );
}

export default App;
