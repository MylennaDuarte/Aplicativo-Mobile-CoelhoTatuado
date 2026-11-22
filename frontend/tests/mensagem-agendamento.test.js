import { mensagemAgendamento } from '../src/utils/whatsapp';

describe('mensagemAgendamento', () => {
  const agendamento = {
    codigo: 'CT-0001',
    servico: 'Sessão de tatuagem',
    data: '27/11/2026',
    horario: '15:30',
    nome: 'Maria',
  };

  test('gera a mensagem com os dados do agendamento', () => {
    const mensagem = mensagemAgendamento(agendamento);

    expect(mensagem).toMatch('Código: CT-0001');
    expect(mensagem).toMatch('Atendimento: Sessão de tatuagem');
    expect(mensagem).toMatch('Data: 27/11/2026 às 15:30');
    expect(mensagem).toMatch('Nome: Maria');
  });

  test('inclui as observações quando preenchidas', () => {
    const semObservacao = mensagemAgendamento({ ...agendamento, observacoes: '   ' });
    const comObservacao = mensagemAgendamento({ ...agendamento, observacoes: 'Primeira tattoo' });

    expect(semObservacao).not.toMatch('Observações');
    expect(comObservacao).toMatch('Observações: Primeira tattoo');
  });
});
