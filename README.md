# HabitScanner - Plataforma de Rastreamento de Hábitos

Uma aplicação web completa para rastreamento e análise de hábitos, desenvolvida com Spring Boot (Java) no backend e React no frontend.

## 🚀 Funcionalidades

- **Autenticação OAuth Google**: Login seguro usando conta Google
- **Gerenciamento de Hábitos**: Criar, editar e excluir hábitos
- **Rastreamento Diário**: Marcar hábitos como concluídos diariamente
- **Estatísticas Detalhadas**: Visualizar progresso, streaks e taxas de conclusão
- **Dashboard Interativo**: Visão geral do progresso diário
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias Utilizadas

### Backend
- **Spring Boot 2.7.18** (Java 11)
- **Spring Security** com OAuth2
- **Spring Data JPA** para persistência
- **H2 Database** (desenvolvimento)
- **Maven** para gerenciamento de dependências

### Frontend
- **React 18** com Hooks
- **Material-UI (MUI)** para componentes
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Day.js** para manipulação de datas

## 📋 Pré-requisitos

- Java 11 ou superior
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
5. Configure as variáveis de ambiente:

```bash
export GOOGLE_CLIENT_ID=seu_client_id_aqui
export GOOGLE_CLIENT_SECRET=seu_client_secret_aqui
```

## 📊 Estrutura do Projeto

```
habitscanner-app/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/habitscanner/habitscanner/
│   │       ├── config/      # Configurações (Security, CORS)
│   │       ├── controller/  # Controllers REST
│   │       ├── dto/         # Data Transfer Objects
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
│   │   └── services/        # Serviços HTTP
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
- `GET /api/user` - Informações do usuário autenticado
- `GET /oauth2/authorization/google` - Iniciar login OAuth

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
O backend pode ser deployado em qualquer plataforma que suporte Java:
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

