import { linkWhatsApp } from '../src/utils/whatsapp';

describe('linkWhatsApp', () => {
  test('gera o link do WhatsApp com o número e a mensagem informados', () => {
    const link = linkWhatsApp('+55 (11) 99999-9999', 'Olá, Victor!');

    expect(link).toBe('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20Victor!');
  });

  test('sem número configurado, não gera link', () => {
    expect(linkWhatsApp('', 'Olá')).toBe('');
  });
});
