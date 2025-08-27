import React, { useMemo, useState, useEffect } from "react";

// ==========================
// QUIZ DATA
// ==========================
// Ogni sezione contiene 20 domande. Ogni domanda: { text, options: string[], correctIndex }
// Fonte: file fornito dall'utente "Quiz Competenze Digitali di Base"

const quizData = [
  {
    id: "s1",
    title: "Sezione 1 – Informatica",
    color: "from-blue-500 to-cyan-500",
    questions: [
      { text: "Qual è la definizione di informatica?", options: [
        "La scienza che si occupa di conservare, organizzare e trasmettere dati tramite elaborazione",
        "La disciplina che studia esclusivamente Internet e i social media",
        "L’insieme delle regole per l’utilizzo del computer"
      ], correctIndex: 0 },
      { text: "Cosa si intende per “elaborazione” in informatica?", options: [
        "La distruzione dei dati non più utili",
        "La raccolta, trasformazione e organizzazione delle informazioni",
        "La connessione dei computer in rete"
      ], correctIndex: 1 },
      { text: "Qual è il miglior elaboratore elettronico attualmente disponibile?", options: ["La calcolatrice scientifica","Il computer","Il televisore smart"], correctIndex: 1 },
      { text: "Dove possiamo trovare microprocessori, oltre che nei PC?", options: ["Solo nei data center","In lavatrici, telefoni e televisori","Solo nei sistemi militari"], correctIndex: 1 },
      { text: "Quale tra questi è un vantaggio dell’informatica?", options: ["Aumenta i tempi delle attività quotidiane","Rende più difficile accedere alle informazioni","Fa risparmiare tempo e rende più semplice l’organizzazione"], correctIndex: 2 },
      { text: "Cosa significa il termine “Intelligenza Artificiale”?", options: ["Un sotto-prodotto dell’informatica che unisce algoritmi complessi a matematica e neuroscienze","Un linguaggio di programmazione per PC","Un’applicazione per navigare in rete"], correctIndex: 0 },
      { text: "Qual è la differenza tra dati e informazioni?", options: ["Non esiste alcuna differenza","I dati sono grezzi, le informazioni sono dati elaborati e resi utili","I dati sono scritti su carta, le informazioni solo digitali"], correctIndex: 1 },
      { text: "Cosa si intende per Realtà Virtuale (VR)?", options: ["Un gioco elettronico basato su console","Una simulazione digitale immersiva","Una nuova versione di Internet"], correctIndex: 1 },
      { text: "Cosa si intende per Realtà Aumentata (AR)?", options: ["Una simulazione che sostituisce completamente la realtà","Una tecnologia che sovrappone informazioni digitali al mondo reale","Un tipo di memoria del computer"], correctIndex: 1 },
      { text: "A cosa serve ChatGPT nell’esercitazione proposta?", options: ["A chiedere un testo che spieghi il metaverso in modo semplice","A tradurre testi in lingue diverse","A cercare file all’interno del computer"], correctIndex: 0 },
      { text: "Quale funzione ha la tecnologia nel lavoro quotidiano?", options: ["Rallentare le attività","Automatizzare e rendere più efficienti i processi","Eliminare la necessità di collaborare"], correctIndex: 1 },
      { text: "Cosa significa “www”?", options: ["Wide World Web","World Wide Web","Web Wide Word"], correctIndex: 1 },
      { text: "Qual è la funzione principale di un motore di ricerca?", options: ["Archiviare dati personali","Analizzare, indicizzare e classificare contenuti","Creare siti Internet"], correctIndex: 1 },
      { text: "Quale tra i seguenti è un esempio di informazione elaborata?", options: ["Una serie di numeri scritti a caso","Un grafico ottenuto da dati numerici","Una password criptata"], correctIndex: 1 },
      { text: "Perché l’informatica è importante nella vita quotidiana?", options: ["Perché permette solo di giocare ai videogiochi","Perché facilita l’accesso alle informazioni e ottimizza il lavoro","Perché riduce le possibilità di comunicazione"], correctIndex: 1 },
      { text: "Quale tra i seguenti è un protocollo fondamentale per Internet?", options: ["HTTP","HTML","JPEG"], correctIndex: 0 },
      { text: "Cosa significa la parola software?", options: ["Uno strumento fisico del computer","Componenti digitali non tangibili, come programmi e applicazioni","Una parte meccanica del PC"], correctIndex: 1 },
      { text: "Cosa significa hardware?", options: ["Componenti elettroniche e meccaniche del computer","Solo la tastiera e il mouse","I programmi del sistema operativo"], correctIndex: 0 },
      { text: "Cosa distingue un software applicativo da un sistema operativo?", options: ["Il sistema operativo gestisce risorse hardware e software, l’applicativo risolve problemi specifici","L’applicativo è fisico, il sistema operativo è digitale","Non c’è alcuna differenza"], correctIndex: 0 },
      { text: "Quale tra i seguenti è un esempio di software open source?", options: ["Microsoft Word","Linux","Adobe Photoshop"], correctIndex: 1 }
    ]
  },
  {
    id: "s2",
    title: "Sezione 2 – Elaboratore elettronico",
    color: "from-violet-500 to-fuchsia-500",
    questions: [
      { text: "Cos’è un computer?", options: ["Una macchina elettronica che elabora dati in linguaggio binario","Un dispositivo solo per scrivere testi","Un apparecchio che serve solo a connettersi a Internet"], correctIndex: 0 },
      { text: "Quali sono i principali tipi di memoria del computer?", options: ["RAM, ROM, Hard Disk/SSD, Cache","CPU e GPU","USB e HDMI"], correctIndex: 0 },
      { text: "Qual è la funzione principale della CPU?", options: ["Eseguire le istruzioni del programma e coordinare le altre unità","Memorizzare i dati permanentemente","Gestire solo la connessione Internet"], correctIndex: 0 },
      { text: "Cosa contiene la memoria RAM?", options: ["Istruzioni e dati usati temporaneamente dalla CPU","File permanenti come foto e documenti","Solo il sistema operativo"], correctIndex: 0 },
      { text: "Quali sono le tre sezioni hardware di base?", options: ["CPU, memoria principale, periferiche","Monitor, tastiera, mouse","Hard disk, RAM, software"], correctIndex: 0 },
      { text: "Cosa sono le periferiche di input?", options: ["Dispositivi che permettono di inserire dati nel computer","Dispositivi che stampano dati","Memorie permanenti"], correctIndex: 0 },
      { text: "Quale tra questi è un esempio di dispositivo di output?", options: ["Monitor","Tastiera","Scanner"], correctIndex: 0 },
      { text: "Cosa sono le periferiche di input/output?", options: ["Dispositivi che possono sia ricevere che inviare dati","Solo dispositivi audio","Unità centrali di elaborazione"], correctIndex: 0 },
      { text: "Quale cavo trasmette sia audio che video?", options: ["HDMI","USB","VGA"], correctIndex: 0 },
      { text: "Qual è la caratteristica principale dell’USB-C?", options: ["Si inserisce in entrambi i versi e supporta ricarica veloce","Trasmette solo immagini","Funziona solo con smartphone"], correctIndex: 0 },
      { text: "Cos’è il software?", options: ["Un insieme di istruzioni che dice al computer cosa fare","Un componente fisico del computer","Un sistema di archiviazione dati esterno"], correctIndex: 0 },
      { text: "Esempi di sistemi operativi sono:", options: ["Windows, Linux, Android, iOS","Chrome, Firefox, Edge","Excel, Word, PowerPoint"], correctIndex: 0 },
      { text: "Qual è la differenza tra software applicativo e sistema operativo?", options: ["L’applicativo risolve problemi specifici, il sistema operativo gestisce le risorse","Sono identici","Il sistema operativo è hardware"], correctIndex: 0 },
      { text: "Un esempio di software applicativo è:", options: ["Microsoft Word","BIOS","Windows 11"], correctIndex: 0 },
      { text: "I videogiochi sono:", options: ["Software ludici finalizzati all’intrattenimento","Hardware di output","Dispositivi di rete"], correctIndex: 0 },
      { text: "Cosa fa un compilatore?", options: ["Traduce il codice sorgente in linguaggio macchina","Cancella i file inutili","Converte immagini in testo"], correctIndex: 0 },
      { text: "Cosa significa software open source?", options: ["Software con codice sorgente accessibile agli utenti","Software che non funziona su Internet","Software gratuito senza eccezioni"], correctIndex: 0 },
      { text: "Quale suite è sviluppata da Microsoft per lavoro e studio?", options: ["Microsoft Office","LibreOffice","OpenOffice"], correctIndex: 0 },
      { text: "Quale comando da tastiera corrisponde a Copia?", options: ["CTRL+C","CTRL+V","CTRL+B"], correctIndex: 0 },
      { text: "Quale funzione di Excel permette di unire nome e cognome in un’unica cella?", options: ["CONCATENA","SOMMA","DIVIDI"], correctIndex: 0 }
    ]
  },
  {
    id: "s3",
    title: "Sezione 3 – Internet",
    color: "from-emerald-500 to-lime-500",
    questions: [
      { text: "Cosa significa Internet?", options: ["L’insieme dei dispositivi collegati in rete con protocolli TCP/IP","Un singolo computer molto potente","Un social network globale"], correctIndex: 0 },
      { text: "In che anno nasce il WWW come servizio pubblico?", options: ["1991","1980","2000"], correctIndex: 0 },
      { text: "Cosa significa TCP/IP?", options: ["Una suite di protocolli di rete","Un sistema operativo","Un linguaggio di programmazione"], correctIndex: 0 },
      { text: "Internet è seconda solo a quale rete di telecomunicazioni?", options: ["Rete telefonica generale","GPS","Rete televisiva"], correctIndex: 0 },
      { text: "Un motore di ricerca serve a:", options: ["Analizzare e indicizzare siti per fornire risultati rilevanti","Creare siti web","Proteggere la rete"], correctIndex: 0 },
      { text: "Esempi di motori di ricerca sono:", options: ["Google, Bing, Yandex, DuckDuckGo","Chrome, Safari, Edge","Facebook, Twitter"], correctIndex: 0 },
      { text: "Cos’è un browser?", options: ["Un’applicazione per navigare in Internet","Un sistema operativo","Un tipo di malware"], correctIndex: 0 },
      { text: "Differenza tra browser e motore di ricerca?", options: ["Il browser è un’app, il motore un servizio web","Sono la stessa cosa","Il motore di ricerca è installato sul PC"], correctIndex: 0 },
      { text: "Differenza tra Google e Google Chrome?", options: ["Google è un motore di ricerca, Chrome un browser","Google è un browser, Chrome un sistema operativo","Sono entrambi social network"], correctIndex: 0 },
      { text: "Come si verifica se un sito è sicuro?", options: ["Controllare HTTPS e certificato SSL","Aprirlo senza precauzioni","Scaricare un file di prova"], correctIndex: 0 },
      { text: "Cosa significa SSL?", options: ["Protocollo di sicurezza che crittografa i dati","Un tipo di software open source","Un linguaggio di programmazione"], correctIndex: 0 },
      { text: "Cosa indica il tag title in una pagina web?", options: ["Il titolo della pagina visibile nei risultati di ricerca","Il link alla homepage","Il nome del server"], correctIndex: 0 },
      { text: "Cos’è la meta description?", options: ["Breve descrizione del contenuto di una pagina web","Il codice di accesso al sito","Un linguaggio di programmazione"], correctIndex: 0 },
      { text: "Cos’è uno snippet?", options: ["Un frammento di testo mostrato nei risultati di ricerca","Un virus informatico","Un tipo di password"], correctIndex: 0 },
      { text: "Quali informazioni legali deve riportare un sito aziendale?", options: ["Ragione sociale, P.IVA, sede legale, PEC","Solo indirizzo email","Solo nome azienda"], correctIndex: 0 },
      { text: "Cos’è la posta elettronica?", options: ["Uno spazio digitale per inviare e ricevere messaggi","Un protocollo di crittografia","Un software di fotoritocco"], correctIndex: 0 },
      { text: "Quali campi principali compongono un’email?", options: ["Destinatario, Oggetto, Messaggio","IP, URL, SSL","Login, Password, Server"], correctIndex: 0 },
      { text: "Cosa significa CC in un’email?", options: ["Copia conoscenza","Codice crittografato","Contatto certificato"], correctIndex: 0 },
      { text: "Cosa significa CCN?", options: ["Copia conoscenza nascosta","Centro comunicazioni nazionali","Chiave di connessione"], correctIndex: 0 },
      { text: "Qual è un vantaggio dell’email rispetto alla posta tradizionale?", options: ["Velocità e gratuità","Maggiore difficoltà di utilizzo","Richiede più tempo di consegna"], correctIndex: 0 }
    ]
  },
  {
    id: "s4",
    title: "Sezione 4 – SPID",
    color: "from-amber-500 to-orange-500",
    questions: [
      { text: "Cosa significa SPID?", options: ["Sistema Pubblico di Identità Digitale","Servizio Pubblico Internet Domestico","Software Personale di Identità Digitale"], correctIndex: 0 },
      { text: "Quando è stato introdotto lo SPID?", options: ["2016","2010","2020"], correctIndex: 0 },
      { text: "Chi gestisce SPID?", options: ["Identity Provider accreditati da AgID","Il Ministero dell’Istruzione","Google"], correctIndex: 0 },
      { text: "Quale documento serve per attivare SPID?", options: ["Carta d’Identità Elettronica o Passaporto","Patente di guida","Codice IBAN"], correctIndex: 0 },
      { text: "Qual è l’obiettivo di SPID?", options: ["Permettere accesso ai servizi online di PA e privati","Sostituire la posta elettronica","Creare nuovi social network"], correctIndex: 0 },
      { text: "Quante identità SPID erano attive a fine 2023?", options: ["36,7 milioni","5 milioni","100 milioni"], correctIndex: 0 },
      { text: "Come è cresciuto l’uso di SPID nel 2020?", options: ["Boom legato a bonus e sostegni Covid","È diminuito","È rimasto invariato"], correctIndex: 0 },
      { text: "Cosa permette di fare l’App PosteID?", options: ["Registrare dati e riconoscere l’identità","Scaricare musica","Gestire solo la PEC"], correctIndex: 0 },
      { text: "Quale percentuale di giovani tra 18-24 anni possiede SPID?", options: ["100%","50%","25%"], correctIndex: 1 },
      { text: "Qual è la differenza tra SPID e CIE?", options: ["Sono due sistemi di identità digitale distinti","SPID è obbligatorio, CIE no","Non c’è differenza"], correctIndex: 0 },
      { text: "Qual è stato il primo provvedimento ufficiale per SPID?", options: ["DPCM 24 ottobre 2014","Decreto Legge 2020","Regolamento UE 2005"], correctIndex: 0 },
      { text: "Quale ente coordina SPID?", options: ["AgID – Agenzia per l’Italia Digitale","INPS","Ministero della Difesa"], correctIndex: 0 },
      { text: "Quali informazioni servono per attivare SPID?", options: ["Dati anagrafici, documento d’identità, email e cellulare","Solo codice fiscale","Solo password"], correctIndex: 0 },
      { text: "Quale modalità di riconoscimento SPID NON esiste?", options: ["Via raccomandata cartacea","In presenza","Via webcam"], correctIndex: 0 },
      { text: "Cos’è l’Identity Provider?", options: ["Gestore che rilascia le credenziali SPID","Un software di posta elettronica","Un sistema operativo"], correctIndex: 0 },
      { text: "Perché il numero di SPID è aumentato nel 2020?", options: ["Per accedere a bonus e servizi legati al Covid","Per la diffusione dei videogiochi","Per obblighi scolastici"], correctIndex: 0 },
      { text: "Qual è il futuro di SPID secondo il Governo?", options: ["Convergere con CIE in un digital identity wallet","Sostituire completamente Internet","Diventare una valuta digitale"], correctIndex: 0 },
      { text: "Quanti accessi ai servizi sono stati fatti con SPID nel 2022?", options: ["Oltre un miliardo","Circa 100 milioni","Circa 50 mila"], correctIndex: 0 },
      { text: "Chi può richiedere SPID?", options: ["Cittadini e imprese","Solo studenti","Solo dipendenti pubblici"], correctIndex: 0 },
      { text: "Quale requisito serve per il riconoscimento via bonifico?", options: ["Conto corrente intestato al richiedente","Un indirizzo PEC","Un abbonamento telefonico"], correctIndex: 0 }
    ]
  },
  {
    id: "s5",
    title: "Sezione 5 – Cybersecurity",
    color: "from-rose-500 to-red-500",
    questions: [
      { text: "Cos’è la cybersecurity?", options: ["L’insieme di pratiche e tecnologie per proteggere dati e sistemi","Un nuovo social network","Un sistema operativo"], correctIndex: 0 },
      { text: "Quali sono i tre principi base della cybersecurity?", options: ["Riservatezza, Integrità, Disponibilità","Velocità, Gratuità, Semplicità","Connessione, Accesso, Rete"], correctIndex: 0 },
      { text: "Cos’è un malware?", options: ["Un software dannoso progettato per infiltrarsi o danneggiare un sistema","Un antivirus","Un firewall"], correctIndex: 0 },
      { text: "Cos’è un virus informatico?", options: ["Un malware che si replica infettando file o programmi","Un sistema operativo lento","Un software di sicurezza"], correctIndex: 0 },
      { text: "Differenza tra virus e worm?", options: ["Il worm si propaga autonomamente senza file ospite","Il virus non danneggia mai file","Non esiste differenza"], correctIndex: 0 },
      { text: "Cos’è un trojan?", options: ["Un malware che si maschera da programma legittimo","Un’app di messaggistica","Un antivirus"], correctIndex: 0 },
      { text: "Cos’è un attacco DDoS?", options: ["Un sovraccarico di richieste che rende un servizio non disponibile","Un attacco con email di phishing","Un virus su chiavetta USB"], correctIndex: 0 },
      { text: "Cos’è il ransomware?", options: ["Un malware che cripta file e chiede un riscatto","Un antivirus a pagamento","Un backup automatico"], correctIndex: 0 },
      { text: "Cos’è il phishing?", options: ["Un inganno per rubare dati tramite email o siti falsi","Un attacco hardware","Un metodo di backup"], correctIndex: 0 },
      { text: "Qual è un segnale tipico di email di phishing?", options: ["Link sospetti e mittenti falsi","Allegati sempre sicuri","Testo breve senza errori"], correctIndex: 0 },
      { text: "Cosa fa un firewall?", options: ["Protegge la rete da accessi non autorizzati","Cripta file personali","Aumenta la velocità di Internet"], correctIndex: 0 },
      { text: "Cos’è una VPN?", options: ["Una rete privata virtuale per proteggere la connessione","Un nuovo browser","Un protocollo email"], correctIndex: 0 },
      { text: "Perché gli aggiornamenti software sono importanti?", options: ["Correggono vulnerabilità di sicurezza","Aumentano la dimensione dei file","Servono solo per estetica"], correctIndex: 0 },
      { text: "Cos’è l’ingegneria sociale?", options: ["Tecniche per manipolare gli utenti e ottenere informazioni","Un software di grafica","Un linguaggio di programmazione"], correctIndex: 0 },
      { text: "Cosa protegge la crittografia?", options: ["La riservatezza dei dati","La velocità di download","La creazione di virus"], correctIndex: 0 },
      { text: "Cos’è il backup?", options: ["La copia di dati per ripristinarli in caso di perdita","Un malware","Un tipo di password"], correctIndex: 0 },
      { text: "Cosa significa GDPR?", options: ["Regolamento europeo per la protezione dei dati personali","Un software di sicurezza","Un motore di ricerca"], correctIndex: 0 },
      { text: "Qual è una buona pratica di sicurezza?", options: ["Usare password complesse e uniche","Condividere password via email","Usare sempre la stessa password"], correctIndex: 0 },
      { text: "Cos’è un attacco brute force?", options: ["Tentativo di indovinare password provando molte combinazioni","Un attacco via email certificata","Un virus su smartphone"], correctIndex: 0 },
      { text: "Qual è la funzione principale di un antivirus?", options: ["Rilevare e bloccare software dannosi","Velocizzare Internet","Creare file di backup"], correctIndex: 0 }
    ]
  }
];

// ==========================
// UTILS & STORAGE
// ==========================
const STORAGE_KEY = "quiz-competenze-progress-v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ==========================
// UI COMPONENTS
// ==========================
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-lg p-6 bg-white/80 backdrop-blur border border-black/5 ${className}`}>
      {children}
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden">
      <div className="h-full bg-black/70" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

function Pill({ children }) {
  return <span className="px-2 py-1 text-xs rounded-full bg-black/10">{children}</span>;
}

// ==========================
// MAIN APP
// ==========================
export default function App() {
  const [view, setView] = useState({ type: "hub" as const, sectionId: null as null | string });
  const [progress, setProgress] = useState(loadProgress());

  useEffect(() => { saveProgress(progress); }, [progress]);

  const sections = quizData;

  function startSection(sectionId: string) {
    setView({ type: "quiz", sectionId });
  }

  function goHub() {
    setView({ type: "hub", sectionId: null });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="max-w-5xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold">Quiz Competenze Digitali</h1>
        <p className="text-sm md:text-base text-slate-600 mt-2">Hub personale con 5 sezioni · 20 domande per sezione</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {view.type === "hub" && (
          <Hub
            sections={sections}
            progress={progress}
            onStart={startSection}
            onReset={() => setProgress({})}
          />
        )}
        {view.type === "quiz" && view.sectionId && (
          <QuizView
            section={sections.find(s => s.id === view.sectionId)!}
            progress={progress}
            setProgress={setProgress}
            onExit={goHub}
          />
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 pb-10 text-xs text-slate-500">
        <p>Prototipo React · Salvataggio locale (LocalStorage). Puoi condividere questo hub tramite link.</p>
      </footer>
    </div>
  );
}

function Hub({ sections, progress, onStart, onReset }) {
  const totalAnswered = useMemo(() => {
    return sections.reduce((acc, s) => acc + (progress[s.id]?.answers?.length || 0), 0);
  }, [sections, progress]);

  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Seleziona una sezione</h2>
          <div className="flex items-center gap-2 text-sm">
            <Pill>{totalAnswered}/{totalQuestions} risposte</Pill>
            <Pill>5 sezioni</Pill>
            <Pill>20 domande/Sezione</Pill>
          </div>
        </div>
        <button onClick={onReset} className="text-xs px-3 py-2 rounded-lg border border-slate-300 hover:bg-white">Azzera progressi</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((s) => {
          const answered = progress[s.id]?.answers?.length || 0;
          const pct = (answered / s.questions.length) * 100;
          const best = progress[s.id]?.bestScore ?? null;
          return (
            <Card key={s.id} className="flex flex-col gap-4">
              <div className={`h-20 rounded-xl bg-gradient-to-r ${s.color}`}/>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <ProgressBar value={pct} />
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Completate: {answered}/{s.questions.length}</span>
                  {best !== null && <span>Miglior punteggio: {best}%</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onStart(s.id)} className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:opacity-90">
                  {answered === 0 ? "Inizia" : answered < s.questions.length ? "Riprendi" : "Ricomincia"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function QuizView({ section, progress, setProgress, onExit }) {
  const state = progress[section.id] || { index: 0, answers: [], score: 0 };
  const [index, setIndex] = useState(state.index || 0);
  const [answers, setAnswers] = useState(state.answers || []);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setProgress({
      ...progress,
      [section.id]: { index, answers, score: calcScore(section, answers) }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, answers]);

  const q = section.questions[index];
  const done = index >= section.questions.length;

  if (done) {
    const scorePct = calcScore(section, answers);
    return (
      <ResultsView
        title={section.title}
        scorePct={scorePct}
        total={section.questions.length}
        answers={answers}
        section={section}
        onRestart={() => { setIndex(0); setAnswers([]); setSelected(null); setShowFeedback(false); }}
        onExit={() => {
          const best = Math.max(progress[section.id]?.bestScore || 0, scorePct);
          setProgress({
            ...progress,
            [section.id]: { index: 0, answers: [], score: 0, bestScore: best }
          });
          onExit();
        }}
      />
    );
  }

  function submitAnswer(choiceIndex: number) {
    if (showFeedback) return;
    setSelected(choiceIndex);
    setShowFeedback(true);
  }

  function nextQuestion() {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setShowFeedback(false);
    setIndex(index + 1);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onExit} className="text-sm mb-4 underline">← Torna all’hub</button>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <Pill>Domanda {index + 1} di {section.questions.length}</Pill>
        </div>
        <ProgressBar value={(index / section.questions.length) * 100} />
        <div className="mt-6 space-y-4">
          <p className="text-base font-medium">{q.text}</p>
          <div className="grid gap-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isSelected = selected === i;
              const show = showFeedback;
              return (
                <button
                  key={i}
                  onClick={() => submitAnswer(i)}
                  className={`text-left px-4 py-3 rounded-xl border transition ${
                    show
                      ? isCorrect
                        ? "border-green-600 bg-green-50"
                        : isSelected
                        ? "border-red-600 bg-red-50"
                        : "opacity-60"
                      : "border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            {showFeedback ? (
              <span className="text-sm">
                {selected === q.correctIndex ? "✅ Corretto!" : "❌ Risposta errata"}
              </span>
            ) : <span />}
            <button
              onClick={nextQuestion}
              disabled={!showFeedback}
              className={`px-4 py-2 rounded-xl text-white ${showFeedback ? "bg-slate-900" : "bg-slate-400 cursor-not-allowed"}`}
            >
              {index + 1 === section.questions.length ? "Concludi sezione" : "Prossima domanda"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ResultsView({ title, scorePct, total, answers, section, onRestart, onExit }) {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <h3 className="text-xl font-semibold mb-2">{title} · Risultati</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl font-bold">{scorePct}%</div>
          <div className="text-sm text-slate-600">punteggio finale</div>
        </div>
        <div className="grid gap-2 mb-6">
          {section.questions.map((q, idx) => {
            const user = answers[idx];
            const correct = q.correctIndex;
            const ok = user === correct;
            return (
              <div key={idx} className={`p-3 rounded-xl border ${ok ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
                <div className="text-sm font-medium">{idx + 1}. {q.text}</div>
                <div className="text-xs mt-1">Tua risposta: <strong>{q.options[user ?? -1] ?? "—"}</strong></div>
                <div className="text-xs">Corretta: <strong>{q.options[correct]}</strong></div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button onClick={onRestart} className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-white">Ricomincia sezione</button>
          <button onClick={onExit} className="px-4 py-2 rounded-xl bg-slate-900 text-white">Torna all’hub</button>
        </div>
      </Card>
    </div>
  );
}

function calcScore(section, answers) {
  let correct = 0;
  section.questions.forEach((q, i) => { if (answers[i] === q.correctIndex) correct++; });
  return Math.round((correct / section.questions.length) * 100);
}
