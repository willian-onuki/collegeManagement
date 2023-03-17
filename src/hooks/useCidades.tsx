import { useEffect, useState } from 'react';

export interface CidadeProps {
  nome: string;
  codigo_ibge: string;
}

interface Props {
  uf: string;
}

export function useCidades({uf}: Props) {
  const [cidades, setCidades] = useState<CidadeProps[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    if (uf) {
      setLoadingCidades(true);
      fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
        .then((response) => response.json())
        .then((data) => {
          setCidades(data);
          setLoadingCidades(false);
        });
    }
  }, [uf]);

  return {cidades, loadingCidades}
}
