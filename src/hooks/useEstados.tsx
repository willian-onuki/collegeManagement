import { useEffect, useState } from 'react';

export interface EstadoProps {
  id: number;
  sigla: string;
  nome: number;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

export function useEstado() {
  const [estados, setEstados] = useState<EstadoProps[]>([]);

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1').then((response) =>
      response.json()).then(data => setEstados(data));
  }, []);

  return { estados };
}
