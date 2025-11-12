// next-js/endStory.cjs
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const process = require("process");

const pidFile = path.resolve(".storybook/storybook.pid");

console.log("🛑 Attempting to stop Storybook...");

if (!fs.existsSync(pidFile)) {
  console.warn("⚠️ No Storybook PID file found — nothing to stop.");
  process.exit(0);
}

const pidContent = fs.readFileSync(pidFile, "utf-8").trim();
if (!pidContent) {
  console.error("⚠️ PID file is empty or unreadable.");
  process.exit(1);
}

const pid = Number(pidContent);
if (isNaN(pid)) {
  console.error("⚠️ Invalid PID in file:", pidContent);
  process.exit(1);
}

try {
  if (process.platform === "win32") {
    // 🪟 On Windows, kill the process tree to ensure all child processes stop
    execSync(`taskkill /PID ${pid} /T /F`);
  } else {
    // 🐧 macOS/Linux
    process.kill(-pid, "SIGTERM"); // kills entire group
  }

  console.log(`✅ Storybook process ${pid} and its children terminated.`);

  if (fs.existsSync(pidFile)) {
    fs.unlinkSync(pidFile);
    console.log("🧹 PID file removed.");
  }
} catch (err) {
  console.error("⚠️ Failed to stop Storybook:", err);
  process.exit(1);
}
