import React from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";
import dataJSON from "./data/analise_presidios_capacidade_pop_aids.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      maiorPresidio: {},
      maiorAIDS: {},
      percentualPopAids: 0
    };
  }

  componentDidMount() {
    this.getJson();
  }
  async getJson() {
    await this.setState({ data: dataJSON.analise });
    await this.retornaMaiorPrsidio();
    await this.retornaMaiorCasoAIDS();
  }

  async retornaMaiorPrsidio() {
    let max = this.state.data.reduce((max, game) => (parseFloat(max.capacidade) > parseFloat(game.capacidade) ? max : game));
    await await this.setState({ maiorPresidio: max });
  }

  async retornaMaiorCasoAIDS() {
    let max = this.state.data.reduce((max, game) => (parseFloat(max.frequencia) > parseFloat(game.frequencia) ? max : game));
    await this.setState({ maiorAIDS: max });
    let percent = parseFloat((max.frequencia * 100) / max.populao) / 100;
    await this.setState({ percentualPopAids: percent.toFixed(2) });
  }

  render() {
    return (
      <div className="div">
        <div className="navbar">
          <h3 className="title-navbar">
            Panorama das unidades prisionais brasileiras
            <h5>Levantamento feito com base nos dados do INFOPEN, DATASUS e IBGE do ano de 2014</h5>
          </h3>

          <img className="img-navbar" src="https://www.univali.br/Style%20Library/Univali/custom/marca/imgs/logo.png" />
        </div>
        <div className="body-data">
          <div class="card">
            <div class="container">
              <h2>Quantidade de presídios: 1.456</h2>
            </div>
          </div>
          <div class="card">
            <div class="container">
              <h2>Quantidade de presos: 698.618</h2>
            </div>
          </div>

          <div class="card">
            <div class="container">
              <h2>Maior quantidade de presos por idade: De 18 a 24 anos</h2>
            </div>
          </div>
          <div class="card">
            <div class="container">
              <h2>Estado com maior concentração de presídios: Amazonas</h2>
            </div>
          </div>
          <div class="card">
            <div class="container">
              <h2>{`Maior capacidade: ${this.state.maiorPresidio.presidio}`}</h2>
              <h2>{`Cidade: ${this.state.maiorPresidio.municipipuf}`}</h2>
              <h2>{`Casos de AIDS: ${this.state.maiorPresidio.frequencia}`}</h2>
            </div>
          </div>
          <div class="card">
            <div class="container">
              <h2>{`Cidade com mais casos de AIDS: ${this.state.maiorAIDS.municipipuf}`}</h2>
              <h2>{`Casos de AIDS: ${this.state.maiorAIDS.frequencia}`}</h2>
              <h2>{`Presídio: ${this.state.maiorAIDS.presidio}`}</h2>
              <h2>{`População: ${this.state.maiorAIDS.populao}`}</h2>
              <h2>{`Percentual da população: ${this.state.percentualPopAids}%`}</h2>
            </div>
          </div>
        </div>
        <div className="footer">
          <a href="https://bit.ly/34aqDHv" className="title-navbar" target="_blank">
            Código das análises
          </a>
          <a href="https://github.com/OdolirJunior/CNPq-App-Panorama-Unidades-Prisionais-Brasil" target="_blank" className="title-navbar">
            Código dessa página
          </a>
        </div>
      </div>
    );
  }
}

export default App;
