// // next-js/startStory.cjs
// const { spawn } = require("child_process");
// const fs = require("fs");
// const path = require("path");
// const http = require("http");

// const port = 6006;
// const pidFile = path.resolve(".storybook/storybook.pid");

// console.log("🚀 Starting Storybook on port", port);

// // Ensure .storybook directory exists
// const storybookDir = path.dirname(pidFile);
// if (!fs.existsSync(storybookDir)) {
//   fs.mkdirSync(storybookDir, { recursive: true });
// }

// // Helper: check if Storybook already running
// function isStorybookRunning() {
//   return new Promise((resolve) => {
//     const req = http.get(`http://localhost:${port}`, (res) => {
//       res.destroy();
//       resolve(res.statusCode === 200);
//     });
//     req.on("error", () => resolve(false));
//     req.end();
//   });
// }

// (async () => {
//   const running = await isStorybookRunning();
//   if (running) {
//     console.log(
//       `⚠️ Storybook already running at http://localhost:${port}. Skipping new launch.`
//     );
//     process.exit(0);
//   }

//   // ✅ Use pnpm to run Storybook
//   const storybook = spawn("pnpm", ["storybook"], {
//     stdio: "inherit",
//     shell: true,
//     cwd: path.resolve(__dirname),
//   });

//   const pid = storybook.pid;
//   if (!pid) {
//     console.error("❌ Failed to get Storybook PID.");
//     process.exit(1);
//   }

//   fs.writeFileSync(pidFile, pid.toString(), "utf-8");
//   console.log(`📄 Storybook PID saved: ${pid}`);

//   storybook.on("close", (code) => {
//     console.log(`📦 Storybook exited with code ${code}`);
//     if (fs.existsSync(pidFile)) {
//       fs.unlinkSync(pidFile);
//       console.log("🧹 PID file removed.");
//     }
//   });
// })();

// next-js/startStory.cjs
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const port = 6006;
const pidFile = path.resolve(".storybook/storybook.pid");

console.log("🚀 Starting Storybook on port", port);

// Ensure .storybook directory exists
const storybookDir = path.dirname(pidFile);
if (!fs.existsSync(storybookDir)) {
  fs.mkdirSync(storybookDir, { recursive: true });
}

// Helper: check if Storybook already running
function isStorybookRunning() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      res.destroy();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.end();
  });
}

(async () => {
  const running = await isStorybookRunning();
  if (running) {
    console.log(
      `⚠️ Storybook already running at http://localhost:${port}. Skipping new launch.`
    );
    process.exit(0);
  }

  // 🧩 Step 1: Ensure dependencies are installed before running Storybook
  try {
    console.log("📦 Installing dependencies (pnpm install)...");
    execSync("pnpm install", {
      stdio: "inherit",
      shell: true,
      cwd: path.resolve(__dirname),
    });
    console.log("✅ Dependencies installed successfully.");
  } catch (err) {
    console.error("❌ Failed to install dependencies:", err.message || err);
    process.exit(1);
  }

  // ✅ Step 2: Use pnpm to run Storybook
  const storybook = spawn("pnpm", ["storybook"], {
    stdio: "inherit",
    shell: true,
    cwd: path.resolve(__dirname),
  });

  const pid = storybook.pid;
  if (!pid) {
    console.error("❌ Failed to get Storybook PID.");
    process.exit(1);
  }

  fs.writeFileSync(pidFile, pid.toString(), "utf-8");
  console.log(`📄 Storybook PID saved: ${pid}`);

  storybook.on("close", (code) => {
    console.log(`📦 Storybook exited with code ${code}`);
    if (fs.existsSync(pidFile)) {
      fs.unlinkSync(pidFile);
      console.log("🧹 PID file removed.");
    }
  });
})();
