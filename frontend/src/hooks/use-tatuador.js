import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { AppConfig } from '../constants/config';
import { GALERIA_MOCK } from '../data/galeria.mock';
import { TATUADOR_MOCK } from '../data/tatuador.mock';
import { api } from '../services/api/client';
import { linkWhatsApp } from '../utils/whatsapp';

const TOTAL_DESTAQUES = 3;
function linkDaRede(id) {
  if (id === 'instagram') return `https://instagram.com/${AppConfig.instagram}`;
  if (id === 'tiktok') return `https://www.tiktok.com/@${AppConfig.tiktok}`;
  if (id === 'whatsapp') return linkWhatsApp(AppConfig.whatsapp);
  return '';
}

export function useTatuador() {
  const [destaques, setDestaques] = useState(GALERIA_MOCK.trabalhos.slice(0, TOTAL_DESTAQUES));
  const [imagemUrl, setImagemUrl] = useState(null);

  useEffect(() => {
    async function carregarDestaques() {
      try {
        const lista = await api.get('/trabalhos');
        if (Array.isArray(lista) && lista.length > 0) {
          setDestaques(lista.slice(0, TOTAL_DESTAQUES));
        }
      } catch (err) {
        console.log('Aviso: usando dados locais nos destaques do tatuador:', err.message);
      }
    }

    async function carregarFoto() {
      try {
        const inicio = await api.get('/inicio');
        setImagemUrl(inicio?.tatuador?.imagemUrl ?? null);
      } catch (err) {
        console.log('Aviso: sem foto do tatuador do servidor:', err.message);
      }
    }

    carregarDestaques();
    carregarFoto();
  }, []);

  async function abrirRede(id) {
    const url = linkDaRede(id);
    if (!url) {
      Alert.alert('Link não configurado', 'Preencha EXPO_PUBLIC_WHATSAPP no .env do front-end.');
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Não foi possível abrir o link', url);
    }
  }

  return { tatuador: { ...TATUADOR_MOCK, imagemUrl }, destaques, abrirRede, carregando: false };
}
