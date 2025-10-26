# 📋 Exemplos de Uso - PortoEdu Backend

## 🎯 Recomendações Personalizadas (NOVO!)

### Exemplo 1: Estudante de Escola Pública interessado em Tecnologia

**Request:**
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "idade": 17,
      "escolaPublica": true,
      "interesses": ["tecnologia"],
      "renda": "baixa",
      "escolaridade": "ensino médio"
    }
  }'
```

**Response esperada:**
A Porti vai recomendar:
1. **ProUni** - Porque atende requisitos de escola pública e idade
2. **Bootcamp Tech** - Porque tem interesse em tecnologia
3. **Outras oportunidades** compatíveis

Cada recomendação virá com:
- ✅ Score de compatibilidade (0-100)
- 💡 Explicação personalizada do POR QUE é bom para esse perfil
- 📝 Próximos passos práticos
- 🔗 Link direto para se inscrever

---

### Exemplo 2: Universitário interessado em Intercâmbio

**Request:**
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "idade": 20,
      "escolaPublica": false,
      "interesses": ["idiomas", "tecnologia"],
      "renda": "media",
      "escolaridade": "graduação"
    }
  }'
```

**Response esperada:**
- **Erasmus+** - Prioridade por estar na faixa etária e cursando graduação
- **Certificação de Idiomas** - Alinhado com interesse em idiomas
- Outras oportunidades para universitários

---

### Exemplo 3: Jovem buscando Primeiro Emprego

**Request:**
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "idade": 16,
      "escolaPublica": true,
      "interesses": ["empreendedorismo"],
      "renda": "baixa"
    }
  }'
```

**Response esperada:**
- **Jovem Aprendiz** - Dentro da faixa etária (14-24 anos)
- **Cursos Gratuitos** - Formação profissional
- Oportunidades adequadas para essa idade

---

## 💬 Chat com a Porti

### Exemplo 1: Primeira Conversa

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Oi, Porti! Sou novo aqui"
  }'
```

**Response esperada:**
```json
{
  "message": "Oi! 🦫 Eu sou a Porti, e estou aqui para te ajudar a encontrar oportunidades incríveis! Para começar, me conta: quantos anos você tem?"
}
```

---

### Exemplo 2: Conversa com Contexto de Perfil

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tenho 17 anos e adoro tecnologia!",
    "conversationHistory": [
      {
        "role": "user",
        "content": "Oi, Porti! Sou novo aqui"
      },
      {
        "role": "assistant",
        "content": "Oi! 🦫 Para começar, me conta: quantos anos você tem?"
      }
    ],
    "userProfile": {
      "idade": 17,
      "escolaPublica": true,
      "interesses": ["tecnologia"]
    }
  }'
```

**Response esperada:**
A Porti vai responder de forma personalizada, sugerindo oportunidades relacionadas a tecnologia.

---

## 📚 Listar Oportunidades

### Exemplo 1: Todas as Oportunidades

```bash
curl http://localhost:3000/api/opportunities
```

---

### Exemplo 2: Apenas Bolsas de Estudo

```bash
curl "http://localhost:3000/api/opportunities?category=bolsa"
```

---

### Exemplo 3: Oportunidades em Destaque

```bash
curl "http://localhost:3000/api/opportunities?featured=true"
```

---

### Exemplo 4: Cursos Gratuitos em Destaque

```bash
curl "http://localhost:3000/api/opportunities?category=curso&featured=true"
```

---

## 🔍 Detalhes de uma Oportunidade

```bash
curl http://localhost:3000/api/opportunities/prouni-2025
```

**Response:**
Retorna todos os detalhes da oportunidade:
- Descrição completa
- Requisitos
- Passos para se candidatar
- Benefícios
- Links oficiais
- Prazos

---

## 🎨 Fluxo Completo: Do Perfil à Inscrição

### Passo 1: Usuário preenche perfil no frontend
*(Frontend envia para o backend)*

### Passo 2: Backend gera recomendações
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "idade": 17,
      "escolaPublica": true,
      "interesses": ["tecnologia"],
      "renda": "baixa"
    }
  }'
```

### Passo 3: Usuário vê TOP 5 oportunidades personalizadas
*(Frontend mostra as recomendações com score e explicações)*

### Passo 4: Usuário clica em uma oportunidade
```bash
curl http://localhost:3000/api/opportunities/prouni-2025
```

### Passo 5: Usuário vê detalhes completos e próximos passos
*(Frontend mostra passos, checklist, dicas)*

### Passo 6: Usuário conversa com a Porti para tirar dúvidas
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Como faço para me inscrever no ProUni?",
    "userProfile": {...}
  }'
```

---

## 💡 Dicas de Integração Frontend

### 1. Ao carregar a página inicial:
```javascript
// Buscar oportunidades em destaque
fetch('http://localhost:3000/api/opportunities?featured=true')
  .then(res => res.json())
  .then(data => mostrarNoCarrossel(data.opportunities))
```

### 2. Quando usuário preenche perfil:
```javascript
// Gerar recomendações personalizadas
fetch('http://localhost:3000/api/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userProfile: perfilUsuario })
})
  .then(res => res.json())
  .then(data => {
    mostrarRecomendacoes(data.recommendations)
    mostrarResumo(data.summary)
  })
```

### 3. No chat:
```javascript
// Enviar mensagem com contexto
fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: mensagemUsuario,
    conversationHistory: historicoConversa,
    userProfile: perfilUsuario
  })
})
  .then(res => res.json())
  .then(data => adicionarMensagemPorti(data.message))
```

---

## ⚠️ Tratamento de Erros

### Perfil vazio:
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"userProfile": {}}'
```

**Response (400):**
```json
{
  "error": "Perfil do usuário é obrigatório",
  "message": "Por favor, forneça pelo menos idade ou interesses"
}
```

---

### Oportunidade não encontrada:
```bash
curl http://localhost:3000/api/opportunities/nao-existe
```

**Response (404):**
```json
{
  "error": "Oportunidade não encontrada"
}
```

---

## 🎯 Casos de Uso Reais

### Caso 1: "Quero fazer faculdade mas não tenho dinheiro"
→ **Recomendações**: ProUni, FIES, bolsas de universidades

### Caso 2: "Quero aprender programação"
→ **Recomendações**: Bootcamp Tech, cursos online gratuitos

### Caso 3: "Sonho em estudar fora do Brasil"
→ **Recomendações**: Erasmus+, bolsas de intercâmbio

### Caso 4: "Preciso do meu primeiro emprego"
→ **Recomendações**: Jovem Aprendiz, estágios

---

**Dúvidas?** Consulte o `README.md` para documentação completa!
