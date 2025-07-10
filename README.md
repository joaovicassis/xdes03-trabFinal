# Sistema de Gerenciamento de Futebol

Este é um projeto Next.js bootstrapped com `create-next-app`, focado no gerenciamento de ligas de futebol. Ele permite aos usuários adicionar, listar, editar e remover informações de ligas, buscando dados de uma API externa e persistindo-os localmente em um arquivo JSON.

## Problema que o Projeto Tenta Resolver

O projeto visa solucionar a dificuldade em manter um registro organizado e de fácil acesso das diversas ligas de futebol, com suas respectivas informações como nome, país e emblema. Atualmente, gerenciar essas informações manualmente pode ser ineficiente e propenso a erros.

### Por que é um problema importante?

Para entusiastas de futebol, analistas de dados esportivos ou até mesmo desenvolvedores que precisam de um catálogo de ligas para outros projetos, ter um sistema centralizado e dinâmico para gerenciar essas informações é crucial. Ele economiza tempo, garante a consistência dos dados e facilita a consulta e manipulação dessas informações.

## Tecnologias Utilizadas

* **Next.js**: Framework React para construção de aplicações web com renderização do lado do servidor e geração de sites estáticos.
* **React**: Biblioteca JavaScript para construção de interfaces de usuário.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática, melhorando a manutenibilidade e escalabilidade do código.
* **ESLint**: Ferramenta de linting para identificar e relatar padrões problemáticos em código JavaScript/TypeScript.
* **Node.js**: Ambiente de tempo de execução JavaScript que permite a execução de código fora do navegador. (Implícito pelas dependências no `package.json` e uso de `fs` para manipulação de arquivos).
* **API Football-Data.org**: Utilizada para buscar informações detalhadas sobre as competições de futebol. (Implícito na lógica de `src/app/main/create/page.tsx`).

## Estrutura do Projeto

A estrutura do projeto segue a convenção do Next.js, com as páginas e componentes principais localizados em `src/app`.

## Funcionalidades Implementadas

### 1. Página Inicial (`src/app/page.tsx`)

A página inicial serve como a landing page do sistema, exibindo um título e uma imagem de fundo de um estádio de futebol. Possui um cabeçalho com navegação (atualmente apenas "Home") e um botão de "Login".

* **UI/UX**: Design responsivo com imagem de fundo cobrindo toda a tela, texto centralizado e cabeçalho fixo.
* **Estilização**: Utiliza CSS Modules (`page.module.css`) para escopo de estilos.
* **Recursos**:
    * Imagem de fundo dinamicamente carregada com `next/image` para otimização.
    * Menu de navegação e botão de login.

### 2. Tela de Login e Cadastro de Usuário

Esta funcionalidade permitirá que os usuários façam login no sistema e se cadastrem.

* **Tela de Login**: Possui os campos: "Usuário" e "Senha".
* **Cadastro de Usuário**: Possui os campos: "Usuário", "Senha", "Confirmação Senha" e "Email".
* **Validações**:
    * **Campos Vazios**: Todos os campos devem ser verificados para garantir que não estão vazios.
    * **Email Válido**: O campo de e-mail deve ter um formato válido.
    * **Senha Mínima**: A "Senha" e "Confirmação Senha" devem ter no mínimo 4 dígitos.

### 3. Gerenciamento de Ligas (CRUD)

O sistema oferece funcionalidades completas de CRUD (Create, Read, Update, Delete) para ligas de futebol. Os dados são persistidos em um arquivo `league-db.json` localizado em `src/db/`.

#### a. Conexão com o Banco de Dados (Arquivo JSON) (`src/app/lib/ConexaoBD.tsx`)

Um módulo utilitário para manipular o arquivo JSON que atua como banco de dados.

* `retornaBD(arquivo: string)`: Lê e retorna o conteúdo do arquivo JSON especificado.
* `armazenaBD(arquivo: string, dados: any)`: Escreve os dados no arquivo JSON especificado, formatando-o para melhor legibilidade.
* Utiliza `fs.promises` para operações assíncronas de arquivo.

#### b. Listar Ligas (`src/app/main/list/page.tsx`)

Exibe uma lista de todas as ligas cadastradas.

* Busca as ligas do arquivo JSON através do `ConexaoBD.retornaBD`.
* Renderiza cada liga usando o componente `LeagueCard`.
* Possui um link para a página de adição de novas ligas.

#### c. Adicionar Nova Liga (`src/app/main/create/page.tsx`)

Permite adicionar uma nova liga ao sistema.

* O formulário aceita um "Código da Liga" (ex: PL para Premier League).
* Ao submeter, busca os dados da liga na API `football-data.org` usando o código fornecido.
* Cria um novo objeto de liga com `id`, `nome`, `pais` e `img` (emblema).
* Adiciona a nova liga ao arquivo JSON através do `ConexaoBD.armazenaBD`.
* Redireciona o usuário para a página de listagem após a adição.
* **Variável de Ambiente**: Utiliza `process.env.FOOTBALL_API_KEY` para o token da API, garantindo segurança e flexibilidade.

#### d. Editar Liga (`src/app/main/edit/page.tsx`)

Permite editar as informações de uma liga existente.

* Recebe o `id` da liga como parâmetro na URL.
* Carrega os dados da liga correspondente do arquivo JSON.
* Exibe um formulário preenchido com as informações atuais da liga.
* Ao submeter, atualiza os dados da liga no arquivo JSON.
* Redireciona o usuário para a página de listagem após a atualização.
* Se a liga não for encontrada, exibe a página `not-found`.

#### e. Componente `LeagueCard` (`src/app/ui/league-card.tsx`)

Um componente reutilizável para exibir os detalhes de uma liga e suas ações.

* Exibe o nome, país e emblema da liga.
* Possui um botão "Editar" que redireciona para a página de edição da liga.
* Inclui um formulário com um botão "Remover" que, ao ser acionado, remove a liga do arquivo JSON e redireciona para a página de listagem.
* Utiliza `next/image` para o emblema da liga para otimização.

### 4. Página Não Encontrada (`src/app/not-found.tsx`)

Uma página personalizada para erros 404, com uma temática de futebol.

* Exibe uma mensagem "404 - Página não encontrada" com uma descrição temática.
* Inclui uma imagem animada (`/gif404.gif`) e um botão "Voltar para o Campo" que redireciona para a página inicial.
* **Estilização**: Utiliza CSS Modules (`error.module.css`) para estilização específica.

## Configurações do Projeto

* **ESLint**: Configurado para Next.js, incluindo suporte a TypeScript, para garantir a qualidade do código.
* **TypeScript**: Configuração padrão do Next.js para tipagem, com paths configurados para `@/*` mapeando para `src/*`.
* **`next.config.ts`**: Arquivo de configuração do Next.js (atualmente vazio, mas pronto para futuras configurações).
* **`globals.css`**: Define variáveis CSS globais para cores (ex: `football-pitch`, `football-sky`, `football-accent`) e estilos básicos para `html`, `body`, `a` e `*`.
* **`layout.tsx`**: Define a estrutura global do layout da aplicação, importando os estilos globais e utilizando as fontes Geist e Geist Mono da Vercel.

## Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/joaovicassis/xdes03-trabFinal.git>
    cd <nome_do_seu_repositorio>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
    ```

3.  **Crie um arquivo `.env.local` na raiz do projeto:**
    ```
    TOKEN=SEU_TOKEN
    FOOTBALL_API_KEY=SUA_CHAVE_DA_API_AQUI
    ```
    Você pode obter uma chave da API em [football-data.org](https://www.football-data.org/).
    O TOKEN pode ser gerado utilizando o proprio Node seguindo os comandos abaixo:

    ```bash
    node
    require('crypto').randomBytes(64).toString('hex')
    .exit
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    # ou
    bun dev
    ```

5.  **Abra no navegador:**
    Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar as páginas modificando os arquivos em `src/app`. As alterações serão automaticamente refletidas no navegador.

Confira nossa [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.