# Instalacao

## Opcao 1: uso manual em qualquer LLM

1. Abra `SKILL.md`.
2. Copie o conteudo.
3. Cole no chat como instrucao de sistema, contexto de projeto ou prompt inicial.
4. Diga: `Ative WorldWideBridges.MVP-allmight para este projeto`.

## Opcao 2: Claude Code

Instalacao como skill pessoal:

```bash
mkdir -p ~/.claude/skills/WorldWideBridges.MVP-allmight
git clone https://github.com/StriveKS/colony-brain.git /tmp/colony-brain
cp -R /tmp/colony-brain/WorldWideBridges.MVP-allmight/* ~/.claude/skills/WorldWideBridges.MVP-allmight/
```

Depois use no Claude Code:

```text
/WorldWideBridges.MVP-allmight
```

Ou inicie um projeto normalmente e deixe a descricao da skill guiar a ativacao.

## Opcao 3: ChatGPT

Quando o produto/plano permitir Skills:

1. Crie uma nova Skill.
2. Use `WorldWideBridges.MVP-allmight` como nome.
3. Importe ou cole o `SKILL.md`.
4. Adicione `templates/`, `scripts/` e `references/` como arquivos auxiliares.

Como alternativa, crie um GPT personalizado:

1. Crie um GPT.
2. Cole o conteudo resumido do `SKILL.md` nas instrucoes.
3. Anexe os arquivos deste pacote como conhecimento.
4. Configure conversation starters para criacao de MVPs, automacoes, landing pages e organizacao de projetos.

Cada usuario precisa autorizar suas proprias conexoes, como Drive, GitHub, Notion ou outras.

## Opcao 4: Google Drive

Crie no Drive:

```text
Projetos/
  Memoria/
  Planilhas/
```

Depois use o script:

```text
scripts/criar-base-projeto-drive.gs
```

Ele cria os arquivos de memoria e a planilha de acompanhamento para um novo projeto.

## Recomendacao

Para publicacao ampla:

1. mantenha este repositorio publico;
2. crie uma landing page com link para o repo;
3. crie um GPT publico com a versao orientadora;
4. mantenha o `SKILL.md` como fonte oficial.
