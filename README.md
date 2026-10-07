# Sistema NIUC — Navegação Imersiva para Usuários Cegos

<p align="center">
  <strong>Prova de Conceito (PoC) para Trabalho de Conclusão de Curso (TCC) do MBA em Engenharia de Software pela USP/Esalq (Turma 251)</strong><br>
  Plataforma web de aprendizagem e exploração guiada por áudio espacial e tecnologia assistiva.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18%2B-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Ready-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Web%20Audio%20API-W3C-orange?style=flat" alt="Web Audio API" />
  <img src="https://img.shields.io/badge/Web%20Speech%20API-TTS-green?style=flat" alt="Web Speech API" />
  <img src="https://img.shields.io/badge/Accessibility-WCAG%202.1-blue?style=flat" alt="Acessibilidade" />
</p>

---

## 📌 Sobre o Projeto

O **Sistema NIUC** (*Navegação Imersiva para Usuários Cegos*) é uma aplicação web experimental desenvolvida para investigar como o **áudio espacial** e a **navegação não-visual** podem ser combinados para criar experiências autônomas de aprendizagem e entretenimento para pessoas com deficiência visual total ou severa.

Eliminando a barreira visomotora imposta pelo cursor do mouse, a aplicação permite uma experiência 100% orientada por teclado físico, com audiodescrição integrada e percepção direcional angular (esquerda, centro e direita).

---

## ✨ Funcionalidades Principais

- 🎧 **Áudio Espacial Angular (Azimute):** Manipulação de canais estéreo (`StereoPannerNode`) simulando pistas psicoacústicas interaurais (ITD/ILD).
- 🗣️ **Audiodescrição Nativa (TTS):** Síntese vocal de tela em PT-BR via Web Speech API, contextualizando elementos sem exigir leitor de tela externo instalado.
- ⌨️ **Navegação Não-Visual por Teclado:** Controle integral via `Setas`, `Enter` e tecla de ancoragem rápida `Escape`.
- 🔁 **Lembrete Aural Inteligente:** Interrupção imediata da fala ao mudar de foco e auto-releitura a cada 10 segundos de inatividade.
- 📚 **Módulos Temáticos Distintos:**
  - **Estudar (Acadêmico):** Astronomia (*Introdução ao Sistema Solar*) e História (*A Revolução Industrial*).
  - **Explorar (Entretenimento):** Biologia Marinha (*Sons do Oceano Profundo*) e Cosmologia (*Ecos do Cosmos*).
- 🏆 **Gamificação e Persistência:** Recompensa com ganho de XP (+50 XP), arpejos musicais de vitória, retenção em `localStorage` e funcionalidade de reinício/reset de progresso.
- 📱 **Design Responsivo:** Adaptabilidade fluida para telas móveis e desktops.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React** | Biblioteca para construção da interface declarativa em componentes |
| **Vite** | Ferramenta de build rápida e servidor de desenvolvimento |
| **Web Audio API** | Síntese de áudio procedural e posicionamento estéreo angular |
| **Web Speech API** | Síntese de voz local (*Text-to-Speech*) em português |
| **LocalStorage** | Armazenamento de dados no lado do cliente para retenção de progresso |
| **CSS3 Semântico** | Estilização temática em modo escuro com ênfase em contraste e foco visível |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (recomendado v18+ ou v22+)
- Fones de ouvido estéreo (indispensáveis para perceber o posicionamento sonoro)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/sistema-niuc.git](https://github.com/SEU-USUARIO/sistema-niuc.git)
   cd sistema-niuc