import { useState, useEffect, useRef } from "react";
import "./App.css";

const CONTEUDOS_ESTUDAR = [
  {
    id: "astronomia",
    categoria: "ASTRONOMIA",
    titulo: "Introdução ao Sistema Solar",
    descricao: "Explore a distribuição dos corpos celestes através da percepção de profundidade e direção sonora.",
    icone: "🪐",
    instrucao: "Perceba a posição dos corpos celestes nos canais estéreo (Esquerda: Vênus, Centro: Sol, Direita: Júpiter).",
    timbre: "espacial",
    narracoes: {
      esquerda: "Canal esquerdo. Planeta Vênus detectado na órbita interna.",
      centro: "Canal central. Sol e órbita terrestre alinhados no centro focal.",
      direita: "Canal direito. Planeta Júpiter identificado no quadrante externo."
    }
  },
  {
    id: "historia",
    categoria: "HISTÓRIA",
    titulo: "A Revolução Industrial",
    descricao: "Compreenda a espacialidade sonora das primeiras oficinas a vapor do século XVIII.",
    icone: "⚙️",
    instrucao: "Localize as máquinas em diferentes pontos da oficina fabril.",
    timbre: "industrial",
    narracoes: {
      esquerda: "Canal esquerdo. Banco de teares mecânicos em operação contínua.",
      centro: "Canal central. Linha principal de transporte e esteira motriz.",
      direita: "Canal direito. Caldeiras a vapor operando em alta pressão."
    }
  }
];

const CONTEUDOS_EXPLORAR = [
  {
    id: "vida-marinha",
    categoria: "VIDA MARINHA",
    titulo: "Sons do Oceano Profundo",
    descricao: "Uma imersão sonora pelas camadas oceânicas e ecolocalização marinha.",
    icone: "🐋",
    instrucao: "Acompanhe as espécies marinhas distribuídas pela plataforma marítima.",
    timbre: "subaquatico",
    narracoes: {
      esquerda: "Canal esquerdo. Ecolocalização de baleias azuis em águas abertas.",
      centro: "Canal central. Recife de coral e cardumes na coluna d'água.",
      direita: "Canal direito. Sons de crustáceos e correntes na encosta rochosa."
    }
  },
  {
    id: "universo",
    categoria: "O UNIVERSO",
    titulo: "Ecos do Cosmos",
    descricao: "Sonificação de pulsares e radiação cósmica de fundo distribuídos espacialmente.",
    icone: "🌌",
    instrucao: "Identifique as fontes de rádio emitidas por diferentes regiões do universo observável.",
    timbre: "pulsar",
    narracoes: {
      esquerda: "Canal esquerdo. Emissão periódica de pulsar detectada a 500 anos-luz.",
      centro: "Canal central. Radiação cósmica de fundo do universo primordial.",
      direita: "Canal direito. Supernova recente em galáxia espiral vizinha."
    }
  }
];

function App() {
  const [tela, setTela] = useState("inicio");
  const [experienciaAtiva, setExperienciaAtiva] = useState(null);
  const [ultimoXpGanho, setUltimoXpGanho] = useState(0);
  const [canalAtivo, setCanalAtivo] = useState(null);
  const [indiceFoco, setIndiceFoco] = useState(0);
  const [sistemaIniciado, setSistemaIniciado] = useState(false);
  const [xp, setXp] = useState(() => Number(localStorage.getItem("navegacao-xp")) || 0);

  const containerRef = useRef(null);
  const timerRepeticaoRef = useRef(null);

  const limparTimerRepeticao = () => {
    if (timerRepeticaoRef.current) {
      clearTimeout(timerRepeticaoRef.current);
      timerRepeticaoRef.current = null;
    }
  };

  const falarRotuloComRepeticao = (elemento) => {
    if (!elemento) return;
    limparTimerRepeticao();

    const texto = elemento.getAttribute("aria-label") || elemento.innerText;
    falarTexto(texto, true);

    timerRepeticaoRef.current = setTimeout(() => {
      falarTexto(texto, true);
    }, 10000);
  };

  // Navegação global por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sistemaIniciado) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          iniciarSistema();
        }
        return;
      }

      const botoes = Array.from(containerRef.current?.querySelectorAll("button") || []);
      if (!botoes.length) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setIndiceFoco((prev) => {
          const prox = (prev + 1) % botoes.length;
          botoes[prox]?.focus();
          falarRotuloComRepeticao(botoes[prox]);
          return prox;
        });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setIndiceFoco((prev) => {
          const prox = (prev - 1 + botoes.length) % botoes.length;
          botoes[prox]?.focus();
          falarRotuloComRepeticao(botoes[prox]);
          return prox;
        });
      } else if (e.key === "Escape") {
        e.preventDefault();
        limparTimerRepeticao();
        if (tela !== "inicio") {
          voltarInicio();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      limparTimerRepeticao();
    };
  }, [tela, sistemaIniciado]);

  // Posiciona o foco sem atropelar o anúncio inicial da tela
  useEffect(() => {
    if (!sistemaIniciado) return;

    limparTimerRepeticao();
    setIndiceFoco(0);

    const timer = setTimeout(() => {
      const botoes = Array.from(containerRef.current?.querySelectorAll("button") || []);
      if (botoes[0]) {
        botoes[0].focus();
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [tela, sistemaIniciado]);

  const iniciarSistema = () => {
    setSistemaIniciado(true);
    tocarIdentidadeSonora();
    setTimeout(() => {
      anunciarHome(xp);
    }, 350);
  };

  const anunciarHome = (pontosAtuais = xp) => {
    let mensagem = "Você está na tela inicial do sistema NIUC. Navegue usando as setas do teclado e confirme com Enter. Pressione a tecla Escape, no canto superior esquerdo, para voltar a este menu a qualquer momento.";
    
    if (pontosAtuais > 0) {
      mensagem += ` Você possui ${pontosAtuais} pontos de experiência acumulados. Se desejar reiniciar seu progresso do zero, utilize as setas até a opção Resetar XP.`;
    }

    falarTexto(mensagem, true);
  };

  const resetarXp = () => {
    limparTimerRepeticao();
    setXp(0);
    localStorage.removeItem("navegacao-xp");
    tocarSomReset();
    falarTexto("Progresso reiniciado com sucesso. Seu saldo de XP agora é zero.", true);

    // Reposiciona o foco no primeiro botão após zerar
    setTimeout(() => {
      const botoes = Array.from(containerRef.current?.querySelectorAll("button") || []);
      if (botoes[0]) {
        botoes[0].focus();
      }
    }, 250);
  };

  const finalizarAtividade = (valorXp) => {
    limparTimerRepeticao();
    const novoTotal = xp + valorXp;
    setXp(novoTotal);
    setUltimoXpGanho(valorXp);
    localStorage.setItem("navegacao-xp", novoTotal);
    tocarSomConclusao();
    setTela("conclusao");
    falarTexto(
      `Atividade concluída com sucesso! Você ganhou cinquenta pontos de experiência. Total: ${novoTotal} XP. Pressione Enter para voltar ao menu ou tecle Escape.`,
      true
    );
  };

  const voltarInicio = () => {
    limparTimerRepeticao();
    setExperienciaAtiva(null);
    setCanalAtivo(null);
    setTela("inicio");
    setTimeout(() => {
      anunciarHome(xp);
    }, 200);
  };

  const abrirExperiencia = (item) => {
    limparTimerRepeticao();
    tocarIdentidadeSonora();
    setExperienciaAtiva(item);
    setCanalAtivo(null);
    setTela("experiencia");
    setTimeout(() => {
      falarTexto(
        `${item.titulo}. Use as setas para alternar entre os canais de áudio e tecle Enter para ouvir. Para voltar ao catálogo, pressione a tecla Escape.`,
        true
      );
    }, 250);
  };

  const executarCanal = (posicao, chave) => {
    limparTimerRepeticao();
    setCanalAtivo(chave);
    tocarSomTematico(posicao, experienciaAtiva.timbre);
    if (experienciaAtiva.narracoes && experienciaAtiva.narracoes[chave]) {
      setTimeout(() => {
        falarTexto(experienciaAtiva.narracoes[chave], true);
      }, 200);
    }
  };

  // --- TELA INICIAL DE ACESSO ---
  if (!sistemaIniciado) {
    return (
      <div className="app" ref={containerRef}>
        <main className="inicio centralizado">
          <div className="marca-icone">◉</div>
          <div className="marca">
            <span>SISTEMA</span>
            <strong>NIUC</strong>
          </div>
          <p className="subtitulo">
            Navegação Imersiva para Usuários Cegos.
          </p>
          <button
            className="botao-principal botao-iniciar-grande"
            onClick={iniciarSistema}
            aria-label="Entrar no Sistema NIUC. Pressione Enter para começar."
            autoFocus
          >
            Entrar no Sistema NIUC (Pressione Enter)
          </button>
        </main>
      </div>
    );
  }

  // --- TELA: ESTUDAR ---
  if (tela === "estudar") {
    return (
      <div className="app" ref={containerRef}>
        <header className="topo">
          <button onClick={voltarInicio} aria-label="Voltar ao menu inicial. Tecla Escape.">
            ← Voltar (Esc)
          </button>
          <span>{xp} XP</span>
        </header>

        <main className="conteudo">
          <span className="categoria">MÓDULO ACADÊMICO</span>
          <h1>Estudar</h1>
          <p>Selecione um tópico com as setas e confirme com Enter:</p>

          <div className="grade-cards">
            {CONTEUDOS_ESTUDAR.map((item) => (
              <div key={item.id} className="card-item">
                <span className="card-icone">{item.icone}</span>
                <span className="categoria">{item.categoria}</span>
                <h2>{item.titulo}</h2>
                <p>{item.descricao}</p>
                <button
                  className="botao-principal"
                  onClick={() => abrirExperiencia(item)}
                  aria-label={`Acessar conteúdo: ${item.titulo}. ${item.descricao}`}
                >
                  Acessar conteúdo →
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // --- TELA: EXPLORAR ---
  if (tela === "explorar") {
    return (
      <div className="app" ref={containerRef}>
        <header className="topo">
          <button onClick={voltarInicio} aria-label="Voltar ao menu inicial. Tecla Escape.">
            ← Voltar (Esc)
          </button>
          <span>{xp} XP</span>
        </header>

        <main className="conteudo">
          <span className="categoria">MÓDULO DE ENTRETENIMENTO</span>
          <h1>Explorar</h1>
          <p>Selecione uma atmosfera sonoro-espacial com as setas e tecle Enter:</p>

          <div className="grade-cards">
            {CONTEUDOS_EXPLORAR.map((item) => (
              <div key={item.id} className="card-item">
                <span className="card-icone">{item.icone}</span>
                <span className="categoria">{item.categoria}</span>
                <h2>{item.titulo}</h2>
                <p>{item.descricao}</p>
                <button
                  className="botao-principal"
                  onClick={() => abrirExperiencia(item)}
                  aria-label={`Explorar ambiente: ${item.titulo}. ${item.descricao}`}
                >
                  Explorar ambiente →
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // --- TELA: EXPERIÊNCIA ATIVA ---
  if (tela === "experiencia" && experienciaAtiva) {
    const moduloOrigem = (experienciaAtiva.categoria === "ASTRONOMIA" || experienciaAtiva.categoria === "HISTÓRIA") ? "estudar" : "explorar";

    return (
      <div className="app" ref={containerRef}>
        <header className="topo">
          <button
            onClick={() => {
              limparTimerRepeticao();
              setTela(moduloOrigem);
            }}
            aria-label="Voltar ao catálogo. Tecla Escape."
          >
            ← Voltar ao Catálogo (Esc)
          </button>
          <span>{xp} XP</span>
        </header>

        <main className="conteudo">
          <span className="categoria">{experienciaAtiva.categoria}</span>
          <h1>{experienciaAtiva.titulo}</h1>
          <p>{experienciaAtiva.instrucao}</p>

          <div className="audio-card">
            <div className="audio-icon">{experienciaAtiva.icone}</div>
            <div>
              <strong>Ambiente de Navegação Sonora</strong>
              <p>
                {canalAtivo 
                  ? experienciaAtiva.narracoes[canalAtivo] 
                  : "Navegue pelas setas até um canal e tecle Enter. Tecle Escape para voltar."}
              </p>
            </div>
          </div>

          <div className="audio-controls">
            <button 
              className={canalAtivo === "esquerda" ? "ativo" : ""}
              onClick={() => executarCanal(-1, "esquerda")}
              aria-label="Canal Esquerdo. Pressione Enter para ouvir o som à esquerda."
            >
              ← Canal Esquerdo
            </button>
            <button 
              className={canalAtivo === "centro" ? "ativo" : ""}
              onClick={() => executarCanal(0, "centro")}
              aria-label="Canal Central. Pressione Enter para ouvir o som no centro."
            >
              Canal Central
            </button>
            <button 
              className={canalAtivo === "direita" ? "ativo" : ""}
              onClick={() => executarCanal(1, "direita")}
              aria-label="Canal Direito. Pressione Enter para ouvir o som à direita."
            >
              Canal Direito →
            </button>
          </div>

          <button
            className="botao-principal botao-concluir"
            onClick={() => finalizarAtividade(50)}
            aria-label="Concluir atividade e receber cinquenta pontos de experiência."
          >
            Concluir atividade (+50 XP)
          </button>
        </main>
      </div>
    );
  }

  // --- TELA: CONCLUSÃO (GAMIFICAÇÃO) ---
  if (tela === "conclusao") {
    return (
      <div className="app" ref={containerRef}>
        <main className="conteudo centralizado">
          <div className="trofeu-icone">🏆</div>
          <span className="categoria">ATIVIDADE CONCLUÍDA</span>
          <h1 className="titulo-sucesso">Excelente progresso!</h1>
          
          <div className="recompensa-card">
            <span className="tag-xp">+{ultimoXpGanho} XP</span>
            <p>Você completou com sucesso a interação de percepção auditiva espacial.</p>
            
            <div className="progresso-wrapper">
              <div className="barra">
                <div
                  className="barra-progresso"
                  style={{ width: `${Math.min(xp, 100)}%` }}
                />
              </div>
              <span className="total-xp-label">Total acumulado: {xp} XP</span>
            </div>
          </div>

          <div className="botoes-conclusao">
            <button 
              className="botao-principal" 
              onClick={voltarInicio}
              aria-label="Voltar ao menu inicial. Pressione Enter ou Escape."
            >
              Voltar ao menu inicial (Enter ou Esc)
            </button>
          </div>
        </main>
      </div>
    );
  }

  // --- TELA: HOME ---
  return (
    <div className="app" ref={containerRef}>
      <main className="inicio">
        <div className="marca">
          <div className="marca-icone">◉</div>
          <span>SISTEMA</span>
          <strong>NIUC</strong>
        </div>

        <p className="subtitulo">
          Navegação Imersiva para Usuários Cegos — Aprendizagem e exploração guiadas por áudio espacial.
        </p>

        {/* Card de Progresso com Opção de Reset e Audiodescrição Direta */}
        <div className="xp-card">
          <div className="xp-card-topo">
            <span>SEU PROGRESSO</span>
            {xp > 0 && (
              <button 
                className="botao-reset-xp"
                onClick={resetarXp}
                aria-label={`Opção Resetar XP. Seu saldo atual é de ${xp} pontos. Pressione Enter caso deseje zerar e reiniciar seu progresso.`}
                title="Zerar progresso"
              >
                Resetar XP
              </button>
            )}
          </div>
          <strong>{xp} XP</strong>
          <div className="barra">
            <div
              className="barra-progresso"
              style={{ width: `${Math.min(xp, 100)}%` }}
            />
          </div>
        </div>

        <div className="dica-teclado">
          <span>⌨️ Acessibilidade: Use as <strong>Setas</strong> e <strong>Enter</strong>. A tecla <strong>Esc</strong> volta ao menu a qualquer momento.</span>
        </div>

        <div className="opcoes">
          <button
            className="opcao"
            onClick={() => {
              limparTimerRepeticao();
              tocarIdentidadeSonora();
              setTela("estudar");
              setTimeout(() => {
                falarTexto("Módulo Estudar. Selecione um conteúdo com as setas e tecle Enter. Tecle Escape para voltar.", true);
              }, 250);
            }}
            aria-label="Módulo Estudar. Conteúdos acadêmicos e educativos."
          >
            <span className="opcao-icone">📚</span>
            <div>
              <strong>Estudar</strong>
              <span>Conteúdos acadêmicos e educativos</span>
            </div>
            <span>→</span>
          </button>

          <button
            className="opcao"
            onClick={() => {
              limparTimerRepeticao();
              tocarIdentidadeSonora();
              setTela("explorar");
              setTimeout(() => {
                falarTexto("Módulo Explorar. Experiências sonoras e de entretenimento. Use as setas e tecle Enter. Tecle Escape para voltar.", true);
              }, 250);
            }}
            aria-label="Módulo Explorar. Experiências de entretenimento e descoberta sonoro-espacial."
          >
            <span className="opcao-icone">🎧</span>
            <div>
              <strong>Explorar</strong>
              <span>Experiências de entretenimento e descoberta</span>
            </div>
            <span>→</span>
          </button>
        </div>

        <p className="rodape">
          Sistema de Navegação Imersiva para Usuários Cegos
        </p>
        
        {/* Ver depois se tudo bem eu colocar o curso e turma aqui... */}
        <p className="rodape">
          MBA em Engenharia de Software - USP/Esalq (Turma 251)
        </p>
      </main>
    </div>
  );
}

// --- FUNÇÃO DE SÍNTESE DE VOZ ROBUSTA ---
function falarTexto(texto, cancelarAnterior = true) {
  if (!("speechSynthesis" in window)) return;

  if (cancelarAnterior) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR";
  utterance.rate = 1.15;
  utterance.pitch = 1.0;

  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
}

// --- FUNÇÕES DE ÁUDIO WEB AUDIO API ---
function tocarIdentidadeSonora() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const notas = [261.63, 329.63, 392.0];

  notas.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;

    const t = ctx.currentTime + idx * 0.1;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);
  });
}

function tocarSomConclusao() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const notasSucesso = [523.25, 659.25, 783.99, 1046.50];

  notasSucesso.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const t = ctx.currentTime + idx * 0.08;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  });
}

function tocarSomReset() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

function tocarSomTematico(posicao, tipoTimbre) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const panner = ctx.createStereoPanner();
  panner.pan.value = posicao;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const agora = ctx.currentTime;

  if (tipoTimbre === "espacial") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, agora);
    osc.frequency.exponentialRampToValueAtTime(600, agora + 0.5);
    gain.gain.setValueAtTime(0.001, agora);
    gain.gain.exponentialRampToValueAtTime(0.18, agora + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.6);
  } else if (tipoTimbre === "industrial") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, agora);
    osc.frequency.exponentialRampToValueAtTime(50, agora + 0.3);
    gain.gain.setValueAtTime(0.001, agora);
    gain.gain.exponentialRampToValueAtTime(0.2, agora + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.4);
  } else if (tipoTimbre === "subaquatico") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(95, agora);
    osc.frequency.linearRampToValueAtTime(130, agora + 0.4);
    gain.gain.setValueAtTime(0.001, agora);
    gain.gain.exponentialRampToValueAtTime(0.2, agora + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.7);
  } else {
    osc.type = "square";
    osc.frequency.setValueAtTime(800, agora);
    osc.frequency.exponentialRampToValueAtTime(250, agora + 0.25);
    gain.gain.setValueAtTime(0.001, agora);
    gain.gain.exponentialRampToValueAtTime(0.15, agora + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.35);
  }

  osc.connect(gain);
  gain.connect(panner);
  panner.connect(ctx.destination);

  osc.start(agora);
  osc.stop(agora + 0.7);
}

export default App;