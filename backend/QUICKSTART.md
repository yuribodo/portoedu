# ⚡ Guia Rápido - PortoEdu Backend

## 🎯 Comece em 5 minutos!

### Passo 1: Instalar Dependências
```bash
cd backend
npm install
```

### Passo 2: Criar API Key da OpenAI

1. **Criar conta**: https://platform.openai.com/signup
2. **Criar chave**: API Keys → "Create new secret key"
3. **Copiar a chave** (só aparece uma vez!)
4. **Adicionar créditos**: Billing → Add payment method → Mínimo $5

### Passo 3: Configurar .env

```bash
cp .env.example .env
```

Edite `.env` e cole sua chave:
```env
OPENAI_API_KEY=sk-proj-sua-chave-aqui-cole-a-chave-completa
```

### Passo 4: Rodar o Servidor

```bash
npm run dev
```

Você deve ver:
```
🚀 Servidor PortoEdu iniciado!
📍 Rodando em: http://localhost:3000
```

### Passo 5: Testar

Abra outro terminal e execute:

```bash
# Health check
curl http://localhost:3000/health

# Testar recomendações (NOVO!)
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"userProfile": {"idade": 17, "escolaPublica": true, "interesses": ["tecnologia"]}}'

# Testar chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Oi, Porti!"}'

# Listar oportunidades
curl http://localhost:3000/api/opportunities
```

## ✅ Tudo Funcionando?

Se os comandos acima funcionaram, você está pronto para integrar com o frontend!

## 🔗 Próximo Passo: Integrar com o Frontend

No frontend, configure a URL do backend:

```typescript
// frontend/src/config/api.ts
export const API_URL = 'http://localhost:3000'
```

## ❌ Problemas?

Veja o arquivo `README.md` completo para mais detalhes e troubleshooting.

---

**Dúvidas?** Leia o `README.md` ou verifique os logs do servidor.
