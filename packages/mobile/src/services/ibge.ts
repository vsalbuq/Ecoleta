import axios from 'axios';

interface IIbgeUfResponse {
  sigla: string;
}
interface IIbgeCityResponse {
  nome: string;
}

const ibge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

function getUfs() {
  return ibge.get<IIbgeUfResponse[]>('/estados?orderBy=nome');
}

function getCities(ufName: string) {
  return ibge.get<IIbgeCityResponse[]>(
    `/estados/${ufName}/municipios?orderBy=nome`
  );
}

export default { getUfs, getCities };
