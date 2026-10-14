# Ficha adaptada A–E (uso pessoal)

## Objetivo
Modelo para acompanhar a ficha fotografada pelo usuário, removendo agachamentos, mesa flexora deitado e banco romano por conforto pessoal. **Não é prescrição nova de profissional habilitado.** As substituições exigem aprovação do professor; priorizar técnica, histórico individual e equipamentos disponíveis.

## Arquitetura
- `src/data/personalComfortPlan.ts`: dados estáticos, instruções, prescrições e referências de GIF exatas. Fácil revisar sem tocar no Supabase.
- `src/components/PersonalComfortPlan.tsx`: interface das abas A–E, demonstração animada, mensagens quando o GIF falha e marcação local dos exercícios realizados.
- `src/personal-comfort-plan.css`: layout responsivo e estados acessíveis.
- `src/screens/WorkoutsScreen.tsx`: novo bloco independente de ficha pessoal; a ficha vinculada ao professor continua sendo carregada normalmente e não é sobrescrita.
- `src/test/personalComfortPlan.test.tsx`: valida os cinco treinos, a ausência de posições evitadas no nome dos novos exercícios, links para GIFs e interações.

O progresso fica apenas no `localStorage`, por conta e dia, para não misturar registros pessoais com os registros formais dos treinos. Não é sincronizado entre aparelhos e pode ser apagado se o navegador limpar seus dados.

## GIFs e direitos
Os caminhos dos GIFs da ficha foram conferidos no índice público **JahelCuadrado/ExerciseGymGifsDB v1.1.0**. O app carrega as demonstrações por **URL externa**, sem incorporar ou republicar o arquivo GIF no repositório:
https://github.com/JahelCuadrado/ExerciseGymGifsDB

O exercício segue visível e exibe fallback caso a mídia falhe. Há crédito ao repositório no rodapé da seção. Atenção: repositório público/uso pessoal **não é prova de licença de redistribuição** das mídias; obter autorização específica antes de usar imagens em produtos públicos ou comercializados. Trechos ilustrativos não substituem correção de execução por instrutor.

## Segurança e UX
- Sem acesso à sessão do professor ou alterações nas políticas RLS do Supabase.
- Sem chaves de API e sem URLs fornecidas por inputs de usuário.
- Responsivo; fontes legíveis; mídia `loading=lazy`; fallback para falhas de rede; seleção por teclado; botões com estados explícitos.
- Temporização de cardio em minutos, nunca como repetições; sem impor frequência cardíaca fixa.

## Verificação
```bash
npm install
npm run build
npm test
```

Validação manual: abrir Treinos > Minha ficha adaptada A–E, alternar A/B/C/D/E, conferir cada GIF com o respectivo exercício, marcar e desmarcar, recarregar a página (progresso do dia deve persistir), testar smartphone de 320 px e sem conexão (mensagem de GIF indisponível), testar login de dois usuários distintos, garantir que os treinos do professor não foram alterados. Confirmar disponibilidade das máquinas e obter avaliação do profissional antes da primeira execução.
