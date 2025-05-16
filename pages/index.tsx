import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const commands = {
  help: [
    "Available commands:",
    "  help      - Show available commands",
    "  man       - Read the manual",
    "  clear     - Clear the screen",
    "  certs     - View certifications",
    "  projects  - View selected projects",
    "  resume  - Download latest resume",
    "  experience- View work history",
  ],
  man: [
    "manual mode - LH Terminal Emulator",
    "A simulated terminal interface to explore the career of Luis F Herrera.",
    "Use `help` to discover available commands.",
  ],
  clear: [],
  certs: ["[[SHOW_CERTS]]"],
  projects: ["[[SHOW_PROJECTS]]"],
  experience: ["[[SHOW_EXPERIENCE]]"],
  resume: ["Opening resume..."],
};

export default function Home() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [text] = useTypewriter({
    words: [
      ">luish:~/website/ echo Hi, I’m Luis.",
      ">luish:~/website/ echo I build scalable infrastructure",
      ">luish:~/website/ echo Site Reliability Engineer",
      ">luish:~/website/ echo Serial Founder",
      ">luish:~/website/ echo Cloud Architect",
    ],
    loop: 0,
    delaySpeed: 1500,
  });

  useEffect(() => {
    // Auto-show help on load
    handleCommand("help");
  }, []);

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setTerminalLines([]);
      setActiveSection("");
      return;
    }

    const output = commands[cmd];
    if (output) {
      setTerminalLines((prev) => [...prev, `$ ${cmd}`, ...output]);

      if (cmd === "resume") {
        window.open("/LuisHerrera_Resume.pdf", "_blank");
      }

      if (output.includes("[[SHOW_CERTS]]")) setActiveSection("certs");
      else if (output.includes("[[SHOW_PROJECTS]]"))
        setActiveSection("projects");
      else if (output.includes("[[SHOW_EXPERIENCE]]"))
        setActiveSection("experience");
      else setActiveSection("");
    } else {
      setTerminalLines((prev) => [
        ...prev,
        `$ ${cmd}`,
        `command not found: ${cmd}`,
      ]);
      setActiveSection("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        handleCommand(input.trim());
        setHistory((prev) => [...prev, input.trim()]);
        setHistoryIndex(null);
      }
      setInput("");
    } else if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      setHistoryIndex((prev) => {
        const index =
          prev === null ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[index]);
        return index;
      });
    } else if (e.key === "ArrowDown") {
      if (history.length === 0) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const index = Math.min(prev + 1, history.length - 1);
        setInput(history[index] || "");
        return index;
      });
    }
  };

  return (
    <main className="min-h-screen bg-monokai-bg text-monokai-text font-mono flex flex-col justify-start items-start px-4 sm:px-6 md:px-16 py-12">
      <div className="w-full max-w-6xl mx-auto border border-monokai-green rounded-lg shadow-lg bg-[#1e1f1c] p-6">
        <div className="px-4 py-6 space-y-6">
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-monokai-green">{text}</span>
            <Cursor cursorStyle="|" />
          </motion.h1>

          <div className="bg-[#1e1f1c] mt-4 p-4 rounded border border-monokai-green text-sm whitespace-pre-line min-h-[200px]">
            {terminalLines.map((line, idx) => (
              <p key={idx} className="text-monokai-green">
                {line}
              </p>
            ))}
          </div>

          <div className="w-full flex items-center gap-2 bg-[#1e1f1c] border border-monokai-green rounded px-3 py-2">
            <span className="text-monokai-yellow">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command..."
              className="flex-1 bg-[#1e1f1c] text-monokai-green placeholder:text-monokai-yellow text-sm border-none outline-none focus:outline-none autofill:bg-[#1e1f1c] caret-animation"
              autoFocus
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .caret-animation {
          caret-color: #a6e22e;
          animation: blink-caret 1s step-start infinite;
        }

        @keyframes blink-caret {
          0%,
          100% {
            caret-color: transparent;
          }
          50% {
            caret-color: #a6e22e;
          }
        }
      `}</style>

      {activeSection === "certs" && (
        <section className="w-full max-w-6xl mt-8 text-monokai-green">
          <h2 className="text-monokai-orange text-lg mb-2">Certifications</h2>
          <ul className="list-disc list-inside">
            <li>AZ-305: Designing Microsoft Azure Infrastructure Solutions</li>
            <li>AZ-900: Microsoft Azure Fundamentals</li>
            <li>AWS Certified Cloud Practitioner</li>
          </ul>
        </section>
      )}

      {activeSection === "projects" && (
        <section className="w-full max-w-6xl mt-8 text-monokai-green">
          <h2 className="text-monokai-orange text-lg mb-2">Projects</h2>
          <ul className="list-disc list-inside">
            <li>Built internal fraud detection chain at BlockFi</li>
            <li>Created a clip automation system for livestream highlights</li>
            <li>
              Scaled a personal website into a terminal experience (this!)
            </li>
          </ul>
        </section>
      )}

      {activeSection === "experience" && (
        <section className="w-full max-w-6xl mt-8 text-monokai-green">
          <h2 className="text-monokai-orange text-lg mb-2">Work Experience</h2>
          <ul className="list-disc list-inside">
            <li>LGIMA: Quant support in $3.2T firm</li>
            <li>Hyatt: 99.9999% uptime marketing systems</li>
            <li>BlockFi: Observability, CI/CD, incident mgmt</li>
            <li>Medline: Infra automation + HIPAA compliance</li>
            <li>Founder: Repair business, GTA servers, branding agency</li>
          </ul>
        </section>
      )}
    </main>
  );
}
