function criarBaseProjeto() {
  const NOME_PROJETO = 'Nome do Projeto Aqui';

  // Substitua pelos IDs das suas pastas no Google Drive.
  const PASTA_MEMORIA_ID = 'COLE_AQUI_O_ID_DA_PASTA_MEMORIA';
  const PASTA_PLANILHAS_ID = 'COLE_AQUI_O_ID_DA_PASTA_PLANILHAS';

  const pastaMemoria = DriveApp.getFolderById(PASTA_MEMORIA_ID);
  const pastaPlanilhas = DriveApp.getFolderById(PASTA_PLANILHAS_ID);

  const dataHoje = new Date().toISOString().slice(0, 10);

  const projectHistory = `# PROJECT_HISTORY - ${NOME_PROJETO}\n\n## Identidade do projeto\n- Nome: ${NOME_PROJETO}\n- Objetivo:\n- Publico-alvo:\n- Problema que resolve:\n- Proposta de valor:\n- Status atual: Inicio\n- Stack atual:\n- Links importantes:\n\n## Linha do tempo\n\n### ${dataHoje} - Registro inicial\n**O que foi feito:**\nBase operacional criada.\n\n**Problemas encontrados:**\n\n**Solucoes aplicadas:**\n\n**Decisoes tomadas:**\nUsar Google Drive como hub de memoria e planilhas como acompanhamento.\n\n**Arquivos criados ou alterados:**\n\n**Ferramentas usadas:**\nGoogle Drive, Google Apps Script.\n\n**Proximos passos:**\n\n**Pontos de atencao:**\n`;

  const contextoLLM = `# CONTEXTO_LLM - ${NOME_PROJETO}\n\n## Resumo do projeto\n\n## Estado atual\n\n## O que ja foi decidido\n\n## O que nao deve ser refeito\n\n## Ferramentas em uso\n\n## Arquivos importantes\n\n## Proxima tarefa recomendada\n\n## Prompt de transferencia\nVoce e uma LLM auxiliando neste projeto. Leia este contexto e continue a partir do estado atual, sem refazer decisoes ja tomadas. Priorize solucoes simples, gratuitas, conectaveis e rapidas de implementar.\n`;

  const decisoes = `# DECISOES - ${NOME_PROJETO}\n\n| Data | Tipo | Decisao | Motivo | Impacto | Revisar quando |\n|---|---|---|---|---|---|\n`;

  const prompts = `# PROMPTS - ${NOME_PROJETO}\n\n## Prompt para continuar projeto\nLeia o PROJECT_HISTORY.md e o CONTEXTO_LLM.md. Continue o projeto a partir do estado atual.\n\n## Prompt para arquitetura\nAnalise este projeto e proponha uma stack 100% gratuita e uma stack de menor custo possivel.\n\n## Prompt para marketing\nCom base no projeto, gere plano de landing page, criativos, videos curtos, copy e captura de leads.\n`;

  pastaMemoria.createFile(`${NOME_PROJETO} - PROJECT_HISTORY.md`, projectHistory, MimeType.PLAIN_TEXT);
  pastaMemoria.createFile(`${NOME_PROJETO} - CONTEXTO_LLM.md`, contextoLLM, MimeType.PLAIN_TEXT);
  pastaMemoria.createFile(`${NOME_PROJETO} - DECISOES.md`, decisoes, MimeType.PLAIN_TEXT);
  pastaMemoria.createFile(`${NOME_PROJETO} - PROMPTS.md`, prompts, MimeType.PLAIN_TEXT);

  const ss = SpreadsheetApp.create(`${NOME_PROJETO} - Acompanhamento`);
  const file = DriveApp.getFileById(ss.getId());
  pastaPlanilhas.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  const abas = [
    'Visao Geral',
    'Backlog',
    'Tarefas',
    'Ferramentas e Conexoes',
    'Custos',
    'Marketing',
    'Entrega',
    'Problemas',
    'Proximos Passos'
  ];

  const primeiraAba = ss.getSheets()[0];
  primeiraAba.setName(abas[0]);

  for (let i = 1; i < abas.length; i++) {
    ss.insertSheet(abas[i]);
  }

  ss.getSheetByName('Tarefas').appendRow([
    'ID', 'Fase', 'Tarefa', 'Prioridade', 'Status', 'Responsavel', 'Ferramenta', 'Proximo passo', 'Data'
  ]);

  ss.getSheetByName('Ferramentas e Conexoes').appendRow([
    'Categoria', 'Ferramenta', 'Uso', 'Custo', 'Status', 'Conexao nativa?', 'LLM consegue operar?', 'Observacoes'
  ]);

  ss.getSheetByName('Custos').appendRow([
    'Ferramenta', 'Plano', 'Custo', 'Necessario agora?', 'Alternativa gratuita', 'Observacoes'
  ]);

  ss.getSheetByName('Problemas').appendRow([
    'Problema', 'Impacto', 'Prioridade', 'Solucao possivel', 'Status', 'Revisar em'
  ]);

  Logger.log('Base criada para: ' + NOME_PROJETO);
  Logger.log('Planilha: ' + ss.getUrl());
}
