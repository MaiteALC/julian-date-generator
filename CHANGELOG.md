# Changelog

Todos os projetos notáveis e alterações nesta aplicação serão documentados neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.2] - 2026-05-12

### Corrigido
- **Cor do resultado:** Corrigido bug que fazia com que os resultados se mantivessem na cor vermelha indefinidamente caso uma mensagem de erro fosse exibida imediatamente antes de um cálculo correto.

## [1.0.1] - 2026-05-06

### Corrigido
- **Ícone no Android**: Alterado o ícone exibido em dispositivos Android (anteriormente o ícone padrão do framework Tauri) para o ícone oficial correto.

## [1.0.0] - 2026-05-05

### Adicionado
- **Geração de Data Juliana**: Motor principal capaz de converter datas atuais do calendário gregoriano para o formato de Data Juliana (Dia sequencial do ano), tambem sendo possível customizações no formato de saída da data calculada.

- **Reversão de Data Juliana**: Funcionalidade para converter uma Data Juliana de volta para o formato de calendário padrão (DD/MM/AAAA).

- **Validação de Anos Bissextos**: O motor matemático (escrito em Rust) possui validação estrita, suportando corretamente a variação do dia 29 de fevereiro e impedindo o cálculo de dias inválidos (como o dia 366 em anos não-bissextos).

- **Identidade Visual**: Implementação do primeiro ícone oficial.

- **Distribuição Android (APK)**: Pipeline de CI/CD automatizada fornecendo suporte oficial para o sistema Android.

- **Distribuição Desktop (Windows e Linux)**: Pipeline de CI/CD automatizada fornecendo suporte oficial para Windows (instaladores `.exe` e `.msi`) e distribuições Linux (arquivos `.deb` e `.AppImage`)