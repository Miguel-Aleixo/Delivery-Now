🍕 Delivery‑now
Sistema de pizzaria online para pedidos e entregas, desenvolvido com Next.js, JavaScript (ES6+) e Tailwind CSS.

📦 O que é
O Delivery‑now é uma aplicação web que permite aos usuários visualizar o cardápio de pizzas, adicionar itens ao carrinho e realizar pedidos de forma simples e intuitiva. O sistema é responsivo, garantindo uma experiência de usuário otimizada em dispositivos móveis e desktops.

🚀 Tecnologias utilizadas
Next.js: Framework React para construção de interfaces de usuário com renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).

JavaScript (ES6+): Linguagem de programação utilizada para lógica de aplicação e interatividade.

Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

🧰 Funcionalidades principais
Visualização do cardápio: Exibição de pizzas disponíveis com detalhes como nome, descrição e preço.

Carrinho de compras: Adição de itens ao carrinho com atualização dinâmica do valor total.

Checkout simplificado: Formulário para coleta de informações do cliente e envio do pedido.

Design responsivo: Layout adaptável para diferentes tamanhos de tela, proporcionando uma boa experiência em dispositivos móveis e desktops.

⚙️ Como executar
Pré-requisitos
Node.js (v14 ou superior)

npm ou Yarn como gerenciador de pacotes

Passos
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/devnkz/Delivery-now.git
cd Delivery-now
Instale as dependências:

bash
Copiar
Editar
npm install
# ou
yarn install
Execute o servidor de desenvolvimento:

bash
Copiar
Editar
npm run dev
# ou
yarn dev
Acesse a aplicação em http://localhost:3000

🗂️ Estrutura do projeto
plaintext
Copiar
Editar
/
├── public/              # Imagens e arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis (ex: PizzaCard, Cart, Checkout)
│   ├── pages/           # Páginas da aplicação (ex: index.js, menu.js, checkout.js)
│   ├── styles/          # Arquivos de estilo (ex: globals.css)
│   └── utils/           # Funções utilitárias (ex: formatação de preço, validações)
├── .env.local           # Variáveis de ambiente locais (não comitar este arquivo)
├── tailwind.config.js   # Configuração do Tailwind CSS
├── next.config.js       # Configuração do Next.js
└── package.json         # Dependências e scripts do projeto


⚙️ Variáveis de ambiente
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:

dentro do .env = NEXT_PUBLIC_API_URL=http://localhost:8080/api

📄 Licença
Este projeto está licenciado sob a MIT License.
