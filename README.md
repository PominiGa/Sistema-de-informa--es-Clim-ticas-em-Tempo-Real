# PolClima - Sistema de Informações Climáticas em Tempo Real

Sistema completo para consulta de dados meteorológicos em tempo real, com versão **Java (console)** e **Web (frontend)**.

## Funcionalidades

- Consulta do clima atual por nome da cidade
- Temperatura atual e sensação térmica
- Umidade do ar
- Velocidade do vento
- Pressão atmosférica
- Índice UV
- País e cidade consultados
- Data e hora da última atualização
- Tratamento de erro para cidade não encontrada

---

## Versão Java (Console)

Aplicação em Java que consome a WeatherAPI e exibe os dados no terminal.

### Tecnologias
- Java 11+
- HttpClient (`java.net.http`)
- org.json para manipulação de JSON
- Scanner para entrada de dados

### Como executar

1. Obtenha uma API Key gratuita em [weatherapi.com](https://www.weatherapi.com/)
2. Crie um arquivo `api-key.txt` na raiz do projeto com sua chave
3. Baixe a dependência JSON:
   ```bash
   curl -o json.jar https://repo1.maven.org/maven2/org/json/json/20231013/json-20231013.jar
   ```
4. Compile e execute:
   ```bash
   javac -cp json.jar src/Main.java
   java -cp "src;json.jar" Main
   ```

---

## Versão Web (Frontend)

Interface moderna e responsiva com temas dinâmicos que mudam baseado nas condições climáticas e horário local da cidade pesquisada.

### Recursos
- Design clean e profissional
- Tema claro (branco e azul) como padrão
- **Temas dinâmicos:**
  - Dia claro
  - Dia quente (acima de 30°C)
  - Dia frio (abaixo de 10°C)
  - Dia nublado
  - Dia chuvoso
  - Nascer do sol (5h-7h)
  - Pôr do sol (17h-19h)
  - Noite clara
  - Noite nublada

### Tecnologias
- HTML5
- CSS3 (variáveis CSS, animações, responsivo)
- JavaScript (ES6+, Fetch API, async/await)

### Como executar

1. Navegue até a pasta `frontend/`
2. Abra o arquivo `script.js` e substitua `YOUR_API_KEY_HERE` pela sua API Key
3. Abra o arquivo `index.html` no navegador

---

## Configuração da API Key

Este projeto utiliza a [WeatherAPI](https://www.weatherapi.com/). Para obter uma chave:

1. Acesse [weatherapi.com](https://www.weatherapi.com/)
2. Crie uma conta gratuita
3. Copie sua API Key do dashboard

**Importante:** Nunca compartilhe sua API Key publicamente. O arquivo `api-key.txt` está no `.gitignore` para sua segurança.

---

## Estrutura do Projeto

```
├── src/
│   └── Main.java          # Aplicação Java (console)
├── frontend/
│   ├── index.html         # Página principal
│   ├── style.css          # Estilos e temas
│   └── script.js          # Lógica e chamadas à API
├── api-key.txt            # Sua API Key (não commitado)
├── .gitignore
└── README.md
```

---

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## Licença

Este projeto está sob a licença MIT.

---

Dados fornecidos por [WeatherAPI](https://weatherapi.com)
