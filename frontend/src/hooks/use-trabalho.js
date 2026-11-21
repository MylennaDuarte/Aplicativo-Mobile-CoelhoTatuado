import { useEffect, useState } from 'react';

import { GALERIA_MOCK } from '../data/galeria.mock';
import { api } from '../services/api/client';

// Um trabalho da galeria pelo id (tela de detalhe).
// Começa pelo mock, para a tela abrir na hora, e tenta atualizar pela API.
export function useTrabalho(id) {
  const chave = String(id);
  const [trabalho, setTrabalho] = useState(
    () => GALERIA_MOCK.trabalhos.find((item) => item.id === chave) ?? null
  );
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const lista = await api.get('/trabalhos');
        const encontrado = Array.isArray(lista)
          ? lista.find((item) => String(item.id) === chave)
          : null;
        if (ativo && encontrado) setTrabalho(encontrado);
      } catch (err) {
        console.log('Aviso: usando dados locais no detalhe do trabalho:', err.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [chave]);

  return { trabalho, carregando };
}
