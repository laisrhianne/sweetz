// https://medium.com/@victormenezes35/select-async-reactjs-exemplos-com-api-rest-190db4847f93
import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaWindowClose } from 'react-icons/fa';
import * as colors from '../../config/colors';

import {
  App,
  Main,
  Title,
  HomeButton,
  Botoes,
  CadastrarButton,
  LoginButton,
} from '../../styles/GlobalStyles';

import {
  CustoIndicator,
  IngredientePicker,
  IngredientesTable,
  NumberInput,
  SelectContainer,
  UnidadeIndicator,
} from './styled';

const styles = {
  icon: {
    marginLeft: 0,
    marginRight: 10,
    color: '#FFF',
    cursor: 'pointer',
  },
  delete: {
    color: colors.primaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function PageComponent() {
  const [idIngrediente, setIdIngrediente] = React.useState(undefined);
  const [nomeIngrediente, setNomeIngrediente] = React.useState(undefined);
  const [quantidadeIngrediente, setQuantidadeIngrediente] = React.useState(0);
  const [unidadeIngrediente, setUnidadeIngrediente] = React.useState('');
  const [precoIngrediente, setPrecoIngrediente] = React.useState('');
  const [quantidadeUsada, setQuantidadeUsada] = React.useState(0);
  const [dados, setDados] = React.useState([]);
  const dadosIngredientes = Array.from(dados);

  function mounted() {
    async function api() {
      // dadosIngredientes = await axios.get('/ingredientes/padrao');
    }
    api();
  }

  React.useEffect(mounted, []);

  const mapResponseToValuesAndLabels = data => ({
    value: data.id,
    label: data.nome,
    quantidade: data.quantidade,
    unidade: data.unidade,
    preco: data.preco,
  });

  async function callApi(value) {
    const data = await fetch(
      `https://glowing-vehicle-275016.rj.r.appspot.com/ingredientes/padrao`
    )
      .then(response => response.json())
      .then(response => response.map(mapResponseToValuesAndLabels))
      .then(final =>
        final.filter(i => i.label.toLowerCase().includes(value.toLowerCase()))
      );

    return data;
  }

  /* function renderIngredientes(novoDado) {
    const table = document.getElementById('listIngredientes');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${novoDado.nome}</td> <td>${novoDado.quantidade}${novoDado.unidade}</td> <td>R$ ${novoDado.custo}</td>`;
    tr.setAttribute('key', `${novoDado.id}`);
    tr.setAttribute('id', `ingrediente${novoDado.id}`);
    table.appendChild(tr);
    dados.forEach(item => {
      ul.innerHTML = '';
      const li = document.createElement('li');
      li.innerHTML = `${item.nome} - ${item.quantidade}${item.unidade} - R$ ${item.preco}`;
      return ul.appendChild(li);
    });
  } */

  function addIngrediente() {
    let custo =
      parseFloat(precoIngrediente) *
      (parseFloat(quantidadeUsada) / parseFloat(quantidadeIngrediente));
    custo = custo.toFixed(2);
    const novoDado = {
      nome: nomeIngrediente,
      quantidade: quantidadeUsada,
      custo,
      id: idIngrediente,
      unidade: unidadeIngrediente,
    };
    const dadosCopy = Array.from(dados);
    dadosCopy.push(novoDado);
    setDados(dadosCopy);
    dadosIngredientes.push(novoDado);
    // renderIngredientes(novoDado);
  }

  const renderHeader = () => {
    const headerElement = ['Nome', 'Quantidade', 'Custo', 'Ações'];

    if (dados.length > 0) {
      return headerElement.map((key, index) => {
        return <th key={index}>{key}</th>;
      });
    }
  };

  const renderBody = () => {
    return (
      dados &&
      dados.map(({ id, nome, quantidade, unidade, custo }, index) => {
        return (
          <tr key={id}>
            <td>{nome}</td>
            <td>{`${quantidade}${unidade}`}</td>
            <td>{`R$ ${custo}`}</td>
            <td className="delete" style={styles.delete}>
              <FaWindowClose
                onClick={() => {
                  const novoDado = Array.from(dados);
                  novoDado.splice(index, 1);
                  setDados(novoDado);
                }}
                style={styles.delete}
              />
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <App>
      <Main>
        <Link to="/">
          <HomeButton>Home</HomeButton>
        </Link>
        <Botoes>
          <Link to="/cadastrar">
            <CadastrarButton>Cadastrar</CadastrarButton>
          </Link>
          <Link to="/login">
            <LoginButton>Login</LoginButton>
          </Link>
        </Botoes>
        <Title>Cálculo</Title>

        <IngredientePicker>
          <SelectContainer>
            <AsyncSelect
              cacheOptions
              loadOptions={callApi}
              onInputChange={() => {}}
              onChange={data => {
                setIdIngrediente(data.value);
                setNomeIngrediente(data.label);
                setUnidadeIngrediente(data.unidade);
                setQuantidadeIngrediente(data.quantidade);
                setPrecoIngrediente(data.preco);
              }}
              defaultOptions
            />
          </SelectContainer>
          <NumberInput
            type="number"
            placeholder="Quantidade"
            onChange={event => {
              setQuantidadeUsada(event.target.value);
            }}
          />
          <UnidadeIndicator>{unidadeIngrediente || 'unidade'}</UnidadeIndicator>
          <FaPlusCircle
            size={30}
            style={styles.icon}
            onClick={addIngrediente}
          />
        </IngredientePicker>

        <IngredientesTable id="listIngredientes">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </IngredientesTable>

        <CustoIndicator>
          Custo Total: R${' '}
          {dados
            ? dados.reduce(
                (ac, item) => parseFloat(ac) + parseFloat(item.custo),
                0
              )
            : '0,00'}
        </CustoIndicator>
      </Main>
    </App>
  );
}
