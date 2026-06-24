import { spawn } from "node:child_process";

const children = [];
let shuttingDown = false;

const startProcess = (command, args, label) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: false,
  });

  children.push(child);

  child.on("exit", (code, signal) => {
    if (shuttingDown) return;

    shuttingDown = true;
    console.log(
      `${label} exited${signal ? ` with ${signal}` : ""}`
    );
    for (const proc of children) {
      if (!proc.killed) {
        proc.kill("SIGTERM");
      }
    }
    process.exit(code ?? 0);
  });

  return child;
};

const shutdown = () => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const proc of children) {
    if (!proc.killed) {
      proc.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(0), 250);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startProcess(process.execPath, ["server/index.js"], "API server");
startProcess(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "dev:ui"],
  "Vite"
);
