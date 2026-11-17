import { useEffect, useState } from 'react';

import { INICIO_MOCK } from '../data/inicio.mock';
import { api } from '../services/api/client';

export function useInicio() {
  const [dados, setDados] = useState(INICIO_MOCK);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarInicio() {
      try {
        setCarregando(true);
        const resposta = await api.get('/inicio');
        if (resposta && Object.keys(resposta).length > 0) {
          setDados(resposta);
        }
      } catch (err) {
        console.log('Aviso: usando dados locais na tela inicial:', err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarInicio();
  }, []);

  return { dados, carregando };
}
