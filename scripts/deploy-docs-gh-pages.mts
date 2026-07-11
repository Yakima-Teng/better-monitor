import { execSync } from "node:child_process";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { logInfo } from "nsuite";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);
const repoRoot: string = join(__dirname, "..");

// 1. Find the version directory under docs/
logInfo("[1/2] Preparing deployment files...");
const sourceDir: string = join(repoRoot, "docs");

const tmpDir: string = await mkdtemp(join(tmpdir(), "gh-pages-"));
await cp(sourceDir, tmpDir, { recursive: true });

// 2. Init git, commit, force push to gh-pages
logInfo("[2/2] Force pushing to gh-pages branch...");
execSync("git init", { cwd: tmpDir, stdio: "pipe" });
execSync("git add -A", { cwd: tmpDir, stdio: "pipe" });
execSync('git commit -m "docs: update API documentation"', {
  cwd: tmpDir,
  stdio: "pipe",
});

const remoteUrl: string = execSync("git remote get-url origin", {
  cwd: repoRoot,
  encoding: "utf8",
}).trim();

execSync(`git remote add origin ${JSON.stringify(remoteUrl)}`, {
  cwd: tmpDir,
  stdio: "pipe",
});
execSync("git push --force origin HEAD:gh-pages", {
  cwd: tmpDir,
  stdio: "inherit",
});

// Cleanup
await rm(tmpDir, { force: true, recursive: true });
logInfo("Done! Docs deployed to gh-pages branch.");
