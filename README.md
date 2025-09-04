# HabitScanner - Plataforma de Rastreamento de Hábitos

Uma aplicação web completa para rastreamento e análise de hábitos, desenvolvida com Spring Boot 3 (Java 17) no backend e React no frontend, com autenticação OAuth gerenciada pelo frontend.

## 🚀 Funcionalidades

- **Autenticação OAuth Google**: Login seguro gerenciado pelo frontend
- **Arquitetura Moderna**: Spring Boot 3 + Java 17 + React 18
- **Gerenciamento de Hábitos**: Criar, editar e excluir hábitos
- **Rastreamento Diário**: Marcar hábitos como concluídos diariamente
- **Estatísticas Detalhadas**: Visualizar progresso, streaks e taxas de conclusão
- **Dashboard Interativo**: Visão geral do progresso diário
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias Utilizadas

### Backend
- **Spring Boot 3.2.0** (Java 17)
- **Spring Security 6** com validação de token
- **Spring Data JPA** para persistência
- **H2 Database** (desenvolvimento)
- **Maven** para gerenciamento de dependências

### Frontend
- **React 18** com Hooks
- **Material-UI (MUI)** para componentes
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Google OAuth API** para autenticação
- **Day.js** para manipulação de datas

## 📋 Pré-requisitos

- Java 17 ou superior
- Node.js 14 ou superior
- npm ou yarn
- Conta Google para OAuth (opcional para desenvolvimento)

## 🔧 Configuração e Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Joaopedromartins21/habitscanner-app.git
cd habitscanner-app
```

### 2. Configuração do Backend

```bash
cd backend

# Instalar dependências e executar
./mvnw spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### 3. Configuração do Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start
```

O frontend estará disponível em `http://localhost:3000`

## 🔐 Configuração OAuth Google (Opcional)

Para habilitar a autenticação Google em produção:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure as variáveis de ambiente no frontend:

```bash
# frontend/.env
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui
REACT_APP_GOOGLE_API_KEY=seu_api_key_aqui
```

## 🏗️ Arquitetura

### Fluxo de Autenticação
1. **Frontend inicia login**: Usuário clica em "Entrar com Google"
2. **Google OAuth**: Frontend gerencia o fluxo OAuth completo
3. **Token obtido**: Frontend recebe access token do Google
4. **Validação**: Frontend envia token para backend validar
5. **Autorização**: Backend valida token e autoriza requisições

### Estrutura do Projeto

```
habitscanner-app/
├── backend/                 # Spring Boot 3 API
│   ├── src/main/java/
│   │   └── com/habitscanner/habitscanner/
│   │       ├── config/      # Configurações (Security, CORS)
│   │       ├── controller/  # Controllers REST
│   │       ├── dto/         # Data Transfer Objects
│   │       ├── filter/      # Filtros de autenticação
│   │       ├── model/       # Entidades JPA
│   │       ├── repository/  # Repositórios
│   │       └── service/     # Lógica de negócio
│   └── src/main/resources/
│       └── application.properties
├── frontend/                # React App
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Context API (Auth, Habits)
│   │   ├── pages/           # Páginas da aplicação
│   │   └── services/        # Serviços HTTP e OAuth
│   └── public/
└── README.md
```

## 🎯 Funcionalidades Principais

### Dashboard
- Visão geral dos hábitos do dia
- Estatísticas de progresso
- Marcação rápida de conclusão

### Gerenciamento de Hábitos
- Criar novos hábitos com frequência (diário, semanal, mensal)
- Editar hábitos existentes
- Excluir hábitos (soft delete)

### Estatísticas
- Taxa de conclusão por período
- Streaks atuais e recordes
- Análise detalhada por hábito

## 🔄 API Endpoints

### Autenticação
- `POST /api/auth/validate` - Validar token OAuth
- `GET /api/user` - Informações do usuário autenticado

### Hábitos
- `GET /api/habits` - Listar hábitos do usuário
- `POST /api/habits` - Criar novo hábito
- `PUT /api/habits/{id}` - Atualizar hábito
- `DELETE /api/habits/{id}` - Excluir hábito

### Entradas de Hábitos
- `GET /api/entries/habit/{habitId}` - Entradas de um hábito
- `POST /api/entries/habit/{habitId}` - Criar/atualizar entrada
- `GET /api/entries/date/{date}` - Entradas por data

## 🚀 Deploy

### Backend
O backend pode ser deployado em qualquer plataforma que suporte Java 17:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Platform
- Azure App Service

### Frontend
O frontend pode ser deployado em:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🔧 Desenvolvimento

### Requisitos de Sistema
- Java 17+
- Node.js 14+
- Maven 3.6+

### Comandos Úteis

```bash
# Backend
cd backend
./mvnw clean compile    # Compilar
./mvnw test            # Executar testes
./mvnw spring-boot:run # Executar aplicação

# Frontend
cd frontend
npm install            # Instalar dependências
npm start             # Modo desenvolvimento
npm run build         # Build para produção
npm test              # Executar testes
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**João Pedro Martins**
- GitHub: [@Joaopedromartins21](https://github.com/Joaopedromartins21)

## 🙏 Agradecimentos

- Spring Boot pela excelente framework
- React pela biblioteca frontend
- Material-UI pelos componentes elegantes
- Google pela API OAuth2

## 📈 Versões

### v2.0.0 (Atual)
- ✅ Migração para Spring Boot 3 e Java 17
- ✅ Fluxo OAuth gerenciado pelo frontend
- ✅ Arquitetura moderna e segura
- ✅ Validação de token no backend

### v1.0.0
- ✅ Versão inicial com Spring Boot 2
- ✅ OAuth tradicional com redirecionamentos

