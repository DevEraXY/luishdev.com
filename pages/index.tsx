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
    "  contact  - Show the best ways to reach me",
    "  experience- View work history",
  ],
  man: [
    "MAN PAGE - LH Terminal Emulator",
    "A simulated terminal interface to explore the career and achievements of Luis F Herrera.",
    "Use `help` to discover available commands.",
  ],
  clear: [],
  certs: ["[[SHOW_CERTS]]"],
  projects: ["[[SHOW_PROJECTS]]"],
  experience: ["[[SHOW_EXPERIENCE]]"],
  contact: ["[[SHOW_CONTACT]]"],
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
      '>luish:~/website/ echo "Hi, I’m Luis."',
      '>luish:~/website/ echo "I build scalable infrastructure"',
      '>luish:~/website/ echo "Site Reliability Engineer',
      '>luish:~/website/ echo "Serial Founder"',
      '>luish:~/website/ echo "Cloud Architect"',
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

      if (output.includes("[[SHOW_CERTS]]")) {
        setActiveSection("certs");
      } else if (output.includes("[[SHOW_PROJECTS]]")) {
        setActiveSection("projects");
      } else if (output.includes("[[SHOW_EXPERIENCE]]")) {
        setActiveSection("experience");
      } else if (output.includes("[[SHOW_CONTACT]]")) {
        setActiveSection("contact");
      } else {
        setActiveSection("");
      }
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
      <div className="w-full max-w-6xl mx-auto border border-monokai-orange rounded-lg shadow-lg bg-[#1e1f1c] p-6">
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
              autoFocus
              className="terminal-input flex-1 caret-animation"
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
        <section className="w-full max-w-6xl mt-8 text-monokai-pink">
          <h2 className="text-monokai-orange text-lg mb-2">Certifications</h2>
          <ul className="list-disc list-inside">
            <li>AZ-305: Solutions Architect Expert</li>
            <li>AZ-900: Microsoft Azure Fundamentals</li>
            <li>AWS Certified Cloud Practitioner</li>
          </ul>
        </section>
      )}

      {activeSection === "projects" && (
        <section className="w-full max-w-6xl mt-8 text-monokai-yellow">
          <h2 className="text-monokai-orange text-lg mb-2">Projects</h2>
          <ul className="list-disc list-inside">
            <li>
              ⚙️ <strong>Fraud Chain Detection System (BlockFi):</strong>
              Designed and deployed a real-time fraud detection engine using
              Kafka, Redis Streams, and Go — flagged $15M+ in fraudulent
              activity, integrating with internal alerting systems and
              compliance workflows, which flagged over $15M in suspicious
              transactions — including activity tied to a Nigerian fraud ring —
              accelerating compliance investigation workflows.
            </li>

            <li>
              🚀 <strong>Serverless Observability for Hyatt Hotels:</strong>
              Automated end-to-end health checks and synthetic API monitoring
              for critical AWS Lambda services — supported 99.9999% uptime
              during peak global campaigns.
            </li>

            <li>
              🔄 <strong>CI/CD Pipeline Unification:</strong>
              Migrated and templatized 10+ Elixir and Node.js pipelines using
              GitHub Actions and Dhall — cut deployment friction across
              distributed teams and improved release consistency.
            </li>

            <li>
              🧠 <strong>Clip Automation System:</strong>
              Built a multi-device clip-farming system to capture, trim, and
              auto-upload livestream highlights to TikTok & YouTube — complete
              with headless workflows, syncing, and templated post-processing.
            </li>

            <li>
              🛠️{" "}
              <strong>
                Infrastructure as Code Modules (Medline & Personal):
              </strong>
              Authored reusable, secure Terraform modules for Azure and AWS,
              supporting HA, multi-region, and HIPAA-compliant workloads — used
              in multiple client-facing and internal production stacks.
            </li>

            <li>
              👾 <strong>GTA RP Game Servers (Founder):</strong>
              Launched and scaled GTA RP servers to ~1K MRR — customized game
              logic, monetized player systems, and managed real-time server ops.
            </li>
          </ul>
        </section>
      )}
      {activeSection === "contact" && (
        <section className="w-full max-w-6xl mt-8 text-monokai-green">
          <h2 className="text-monokai-orange text-lg mb-2">Contact</h2>
          <ul className="list-disc list-inside">
            <li>
              Email:{" "}
              <a
                href="mailto:luishdev@gmail.com"
                className="underline text-monokai-cyan"
              >
                luishdev@gmail.com
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/luisf-herrera"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-monokai-cyan"
              >
                linkedin.com/in/luisf-herrera
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/LuishXY"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-monokai-cyan"
              >
                github.com/LuishXY
              </a>
            </li>
          </ul>
        </section>
      )}
      {activeSection === "experience" && (
        <section className="w-full max-w-6xl mt-8 text-monokai-green">
          <h2 className="text-monokai-orange text-lg mb-2">Work Experience</h2>
          <ul className="list-disc list-inside">
            <li>
              💰{" "}
              <strong>LGIMA (Legal & General Investment Mgmt America):</strong>
              Supported cloud and quant systems for a $3.2T AUM investment firm
              — resolved 20+ critical trading incidents and maintained
              high-availability platforms across AWS, Domino, and ROSA.
            </li>

            <li>
              🏨 <strong>Hyatt Hotels:</strong>
              Maintained 99.9999% uptime for global marketing tech stack —
              implemented AWS CloudWatch Synthetics, Terraform modules, and
              serverless Lambdas to deliver resilient observability across
              multi-region campaigns.
            </li>

            <li>
              🪙 <strong>BlockFi:</strong>
              Led 40+ high-severity production incident responses; migrated
              CI/CD pipelines with GitHub Actions & Dhall, and built scalable
              observability for 30+ services using Prometheus, Grafana, and
              Pulumi. Also helped detect $15M+ in fraud, including activity tied
              to an international scam ring.
            </li>

            <li>
              🏥 <strong>Medline Industries:</strong>
              Engineered hybrid cloud provisioning with vRealize, Bash, and
              PowerShell — reducing server deployment time from 6 months to 2
              days. Ensured HIPAA-compliant data erasure for 1500+ devices and
              authored infra standards documentation.
            </li>

            <li>
              🛠️ <strong>Founder / Builder:</strong>
              Built and monetized 3 self-funded ventures — Apple-certified phone
              repair business, $1K MRR GTA RP game server, and a
              branding/digital marketing agency. Led tech, strategy, and ops
              across all businesses.
            </li>
          </ul>
        </section>
      )}
    </main>
  );
}
