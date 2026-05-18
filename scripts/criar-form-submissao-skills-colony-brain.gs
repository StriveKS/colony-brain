function criarFormSubmissaoSkillsColonyBrain() {
  var CONFIG = {
    tituloForm: 'Submit a Skill to colony-brain',
    descricaoForm: 'Envie uma Skill, workflow reutilizavel ou melhoria para o ecossistema colony-brain. Voce pode anexar um ZIP, colar links ou enviar uma proposta gerada pelo GPT WorldWideBridges MVP Allmight.',
    spreadsheetId: '1womP9SK5StzcM-dJnSc1A89cIqZfBJ4y2VocmyjcBh0',
    emailNotificacao: 'contato.eduardokeitel@gmail.com'
  };

  var form = FormApp.create(CONFIG.tituloForm);
  form.setDescription(CONFIG.descricaoForm);
  form.setCollectEmail(true);
  form.setAllowResponseEdits(true);
  form.setAcceptingResponses(true);
  form.setConfirmationMessage('Obrigado. Sua submissao foi recebida para revisao no colony-brain.');

  form.addTextItem()
    .setTitle('Nome da Skill')
    .setHelpText('Exemplo: free-first-lead-capture-flow')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Autor / Nome publico')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Contato')
    .setHelpText('Email, GitHub, LinkedIn ou outro contato.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Tipo de submissao')
    .setChoiceValues(['New Skill', 'Improvement', 'Experimental'])
    .setRequired(true);

  form.addListItem()
    .setTitle('Categoria principal')
    .setChoiceValues([
      'MVP',
      'Marketing',
      'Design',
      'Video',
      'Automation',
      'Google Workspace',
      'GitHub',
      'Database',
      'Deployment',
      'LLM Orchestration',
      'Sales',
      'Delivery',
      'Operations',
      'Skill Creation',
      'Other'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Problema que resolve')
    .setHelpText('Explique o problema real que esta Skill resolve.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Para quem serve')
    .setHelpText('Descreva o publico-alvo.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Workflow reutilizavel')
    .setHelpText('Explique o processo, passo a passo ou combinacao de ferramentas.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Caminho gratuito')
    .setHelpText('Explique como usar a Skill com ferramentas gratuitas ou quase gratuitas.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Ferramentas envolvidas')
    .setHelpText('Exemplo: Google Drive, Sheets, Apps Script, GitHub, Canva, Tally, Supabase etc.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Link do pacote da Skill')
    .setHelpText('Cole um link para Drive, GitHub, Gist, ZIP ou pasta publica com SKILL.md, README.md e SUBMISSION.md.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Conteudo da Skill ou observacoes')
    .setHelpText('Cole aqui o rascunho, links adicionais, riscos, instrucoes ou observacoes.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Aceite open-source')
    .setHelpText('A submissao pode ser revisada, adaptada e publicada no colony-brain como open-source?')
    .setChoiceValues([
      'Sim, aceito que seja revisada/adaptada/publicada como open-source.',
      'Nao, quero apenas feedback privado.'
    ])
    .setRequired(true);

  try {
    form.addFileUploadItem()
      .setTitle('Upload do pacote ZIP da Skill')
      .setHelpText('Opcional. Envie um ZIP com SKILL.md, README.md, SUBMISSION.md e arquivos auxiliares.')
      .setRequired(false);
  } catch (e) {
    form.addParagraphTextItem()
      .setTitle('Upload alternativo / link do ZIP')
      .setHelpText('Seu ambiente nao permitiu criar campo de upload. Cole aqui um link para o ZIP no Drive, GitHub ou outro local.')
      .setRequired(false);
  }

  var ss = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  criarAbaFormularioSeNecessario_(ss);
  registrarFormNaAbaFolders_(ss, form);

  MailApp.sendEmail({
    to: CONFIG.emailNotificacao,
    subject: 'colony-brain Skill Submission Form criado',
    body: 'Formulario criado com sucesso:\n\n' + form.getPublishedUrl() + '\n\nEditor:\n' + form.getEditUrl()
  });

  Logger.log('Formulario publico: ' + form.getPublishedUrl());
  Logger.log('Formulario editor: ' + form.getEditUrl());
  Logger.log('Planilha destino: ' + ss.getUrl());
}

function criarAbaFormularioSeNecessario_(ss) {
  var nomeAba = 'Form Setup';
  var sheet = ss.getSheetByName(nomeAba);

  if (!sheet) {
    sheet = ss.insertSheet(nomeAba);
  }

  sheet.clear();
  sheet.getRange(1, 1, 1, 2).setValues([['Campo', 'Valor']]);
  sheet.getRange(2, 1, 7, 2).setValues([
    ['Status', 'Form created by Apps Script'],
    ['Usage', 'Share the public form URL with contributors.'],
    ['Review flow', 'Responses should be reviewed and copied/normalized into Submissions if needed.'],
    ['Required package', 'SKILL.md, README.md, SUBMISSION.md'],
    ['Minimum status', 'Submitted'],
    ['Owner action', 'Review pending responses weekly.'],
    ['Publication target', 'skills/experimental or skills/official in colony-brain']
  ]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  sheet.autoResizeColumns(1, 2);
}

function registrarFormNaAbaFolders_(ss, form) {
  var sheet = ss.getSheetByName('Folders');
  if (!sheet) {
    sheet = ss.insertSheet('Folders');
    sheet.getRange(1, 1, 1, 2).setValues([['Folder', 'URL']]);
  }

  var values = sheet.getDataRange().getValues();
  var foundPublic = false;
  var foundEdit = false;

  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === 'skill-submission-form-public') {
      sheet.getRange(i + 1, 2).setValue(form.getPublishedUrl());
      foundPublic = true;
    }
    if (values[i][0] === 'skill-submission-form-edit') {
      sheet.getRange(i + 1, 2).setValue(form.getEditUrl());
      foundEdit = true;
    }
  }

  var nextRow = sheet.getLastRow() + 1;
  if (!foundPublic) {
    sheet.getRange(nextRow, 1, 1, 2).setValues([['skill-submission-form-public', form.getPublishedUrl()]]);
    nextRow++;
  }
  if (!foundEdit) {
    sheet.getRange(nextRow, 1, 1, 2).setValues([['skill-submission-form-edit', form.getEditUrl()]]);
  }

  sheet.autoResizeColumns(1, 2);
}
