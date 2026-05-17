function criarInfraSubmissoesColonyBrain() {
  const CONFIG = {
    // Opcional: cole o ID da pasta Projetos. Se vazio, o script cria/usa uma pasta chamada Projetos na raiz do Drive.
    pastaProjetosId: '',
    nomePastaProjetos: 'Projetos',
    nomePastaColonyBrain: 'colony-brain',
    nomePlanilha: 'colony-brain - Skill Submissions'
  };

  const pastaProjetos = obterOuCriarPastaProjetos_(CONFIG);
  const pastaColonyBrain = obterOuCriarSubpasta_(pastaProjetos, CONFIG.nomePastaColonyBrain);
  const pastaSubmissions = obterOuCriarSubpasta_(pastaColonyBrain, 'skill-submissions');

  const pastas = {
    incoming: obterOuCriarSubpasta_(pastaSubmissions, 'incoming'),
    underReview: obterOuCriarSubpasta_(pastaSubmissions, 'under-review'),
    approved: obterOuCriarSubpasta_(pastaSubmissions, 'approved'),
    rejected: obterOuCriarSubpasta_(pastaSubmissions, 'rejected'),
    published: obterOuCriarSubpasta_(pastaSubmissions, 'published'),
    archived: obterOuCriarSubpasta_(pastaSubmissions, 'archived'),
    reviewLogs: obterOuCriarSubpasta_(pastaColonyBrain, 'review-logs'),
    contributorGuides: obterOuCriarSubpasta_(pastaColonyBrain, 'contributor-guides')
  };

  criarGuiasContribuidores_(pastas.contributorGuides);
  criarPlanilhaSubmissoes_(CONFIG.nomePlanilha, pastaColonyBrain, pastas);

  Logger.log('Infraestrutura colony-brain criada/validada.');
  Logger.log('Pasta colony-brain: ' + pastaColonyBrain.getUrl());
  Object.keys(pastas).forEach(key => Logger.log(key + ': ' + pastas[key].getUrl()));
}

function obterOuCriarPastaProjetos_(config) {
  if (config.pastaProjetosId && config.pastaProjetosId.trim() !== '') {
    return DriveApp.getFolderById(config.pastaProjetosId.trim());
  }
  return obterOuCriarPastaRaiz_(config.nomePastaProjetos);
}

function obterOuCriarPastaRaiz_(nome) {
  const folders = DriveApp.getFoldersByName(nome);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(nome);
}

function obterOuCriarSubpasta_(parent, nome) {
  const folders = parent.getFoldersByName(nome);
  if (folders.hasNext()) return folders.next();
  return parent.createFolder(nome);
}

function criarGuiasContribuidores_(pasta) {
  criarOuAtualizarArquivoTexto_(pasta, 'COMO_CRIAR_SKILL.md', `# Como criar uma Skill para colony-brain\n\n## Fluxo simples\n\n1. Identifique um workflow reutilizavel.\n2. Use a Skill WorldWideBridges.MVP-allmight ou colony-brain.skill-forge para estruturar a ideia.\n3. Gere um pacote com SKILL.md, README.md e exemplos.\n4. Preencha SUBMISSION.md.\n5. Salve a submissao em skill-submissions/incoming.\n6. Aguarde revisao.\n\n## Pacote minimo\n\n\`\`\`text\nskill-name/\n  SKILL.md\n  README.md\n  SUBMISSION.md\n\`\`\`\n\n## Pacote recomendado\n\n\`\`\`text\nskill-name/\n  SKILL.md\n  README.md\n  install.md\n  templates/\n  examples/\n  references/\n  scripts/\n  SUBMISSION.md\n\`\`\`\n`);

  criarOuAtualizarArquivoTexto_(pasta, 'SUBMISSION_TEMPLATE.md', `# Skill Submission\n\n## Skill name\n\n## Author / contributor\n\n## Type\n- [ ] New Skill\n- [ ] Improvement\n- [ ] Experimental\n\n## Problem solved\n\n## Target user\n\n## When to use\n\n## When not to use\n\n## Reusable process\n\n## Required tools\n\n## Native connections or permissions\n\n## Files included\n\n## Free-first path\n\n## Low-cost robust path\n\n## Risks and limitations\n\n## Project memory compatibility\n\n## Review request\n`);

  criarOuAtualizarArquivoTexto_(pasta, 'REVIEW_TEMPLATE.md', `# Skill Review\n\n## Skill name\n\n## Reviewer\n\n## Decision\n- [ ] Approved\n- [ ] Approved as experimental\n- [ ] Needs changes\n- [ ] Rejected\n\n## Summary\n\n## Strengths\n\n## Required changes\n\n## Risks\n\n## Free-first quality\n\n## Operational quality\n\n## Safety\n\n## Publication notes\n\n## Next step\n`);
}

function criarOuAtualizarArquivoTexto_(pasta, nome, conteudo) {
  const files = pasta.getFilesByName(nome);
  if (files.hasNext()) {
    const file = files.next();
    file.setContent(conteudo);
    return file;
  }
  return pasta.createFile(nome, conteudo, MimeType.PLAIN_TEXT);
}

function criarPlanilhaSubmissoes_(nomePlanilha, pastaDestino, pastas) {
  const existente = buscarArquivoNaPasta_(pastaDestino, nomePlanilha, MimeType.GOOGLE_SHEETS);
  const ss = existente ? SpreadsheetApp.openById(existente.getId()) : SpreadsheetApp.create(nomePlanilha);

  if (!existente) {
    const file = DriveApp.getFileById(ss.getId());
    pastaDestino.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
  }

  garantirAbas_(ss, [
    'Submissions',
    'Review Queue',
    'Approved',
    'Published',
    'Rejected',
    'Contributors',
    'Folders'
  ]);

  preencherAbaSeVazia_(ss, 'Submissions', [[
    'ID', 'Skill name', 'Author', 'Type', 'Status', 'Category', 'Drive link', 'GitHub link', 'Risk', 'Reviewer', 'Next step', 'Created at', 'Updated at'
  ]]);

  preencherAbaSeVazia_(ss, 'Review Queue', [[
    'ID', 'Skill name', 'Priority', 'Reviewer', 'Status', 'Main concern', 'Decision target date', 'Notes'
  ]]);

  preencherAbaSeVazia_(ss, 'Approved', [[
    'ID', 'Skill name', 'Approved by', 'Approved at', 'Publication target', 'Notes'
  ]]);

  preencherAbaSeVazia_(ss, 'Published', [[
    'ID', 'Skill name', 'Published at', 'GitHub path', 'Version', 'Notes'
  ]]);

  preencherAbaSeVazia_(ss, 'Rejected', [[
    'ID', 'Skill name', 'Rejected by', 'Rejected at', 'Reason', 'Can resubmit?', 'Notes'
  ]]);

  preencherAbaSeVazia_(ss, 'Contributors', [[
    'Name', 'Contact', 'GitHub', 'Skills submitted', 'Notes'
  ]]);

  preencherAba_(ss, 'Folders', [
    ['Folder', 'URL'],
    ['incoming', pastas.incoming.getUrl()],
    ['under-review', pastas.underReview.getUrl()],
    ['approved', pastas.approved.getUrl()],
    ['rejected', pastas.rejected.getUrl()],
    ['published', pastas.published.getUrl()],
    ['archived', pastas.archived.getUrl()],
    ['review-logs', pastas.reviewLogs.getUrl()],
    ['contributor-guides', pastas.contributorGuides.getUrl()]
  ]);

  formatarPlanilha_(ss);
  aplicarValidacoesSubmissoes_(ss);

  Logger.log('Planilha de submissoes: ' + ss.getUrl());
  return ss;
}

function buscarArquivoNaPasta_(pasta, nome, mimeType) {
  const files = pasta.getFilesByName(nome);
  while (files.hasNext()) {
    const file = files.next();
    if (!mimeType || file.getMimeType() === mimeType) return file;
  }
  return null;
}

function garantirAbas_(ss, abas) {
  const existing = ss.getSheets().map(s => s.getName());
  if (existing.length === 1 && !abas.includes(existing[0])) {
    ss.getSheets()[0].setName(abas[0]);
  }
  abas.forEach(nome => {
    if (!ss.getSheetByName(nome)) ss.insertSheet(nome);
  });
}

function preencherAbaSeVazia_(ss, nomeAba, rows) {
  const sheet = ss.getSheetByName(nomeAba);
  if (sheet.getLastRow() === 0) preencherAba_(ss, nomeAba, rows);
  if (sheet.getLastRow() === 1 && sheet.getRange(1, 1).getValue() === '') preencherAba_(ss, nomeAba, rows);
}

function preencherAba_(ss, nomeAba, rows) {
  const sheet = ss.getSheetByName(nomeAba);
  sheet.clear();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}

function formatarPlanilha_(ss) {
  ss.getSheets().forEach(sheet => {
    const lastColumn = Math.max(sheet.getLastColumn(), 1);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, lastColumn).setFontWeight('bold');
    sheet.autoResizeColumns(1, lastColumn);
  });
}

function aplicarValidacoesSubmissoes_(ss) {
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Draft', 'Submitted', 'Under Review', 'Needs Changes', 'Approved', 'Published', 'Rejected', 'Archived'], true)
    .build();

  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New Skill', 'Improvement', 'Experimental'], true)
    .build();

  const riskRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Low', 'Medium', 'High', 'Unknown'], true)
    .build();

  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Critical', 'High', 'Medium', 'Low'], true)
    .build();

  const submissions = ss.getSheetByName('Submissions');
  submissions.getRange('D2:D500').setDataValidation(typeRule);
  submissions.getRange('E2:E500').setDataValidation(statusRule);
  submissions.getRange('I2:I500').setDataValidation(riskRule);

  const queue = ss.getSheetByName('Review Queue');
  queue.getRange('C2:C500').setDataValidation(priorityRule);
  queue.getRange('E2:E500').setDataValidation(statusRule);
}
