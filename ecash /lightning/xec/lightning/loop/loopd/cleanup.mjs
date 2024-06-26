import " ../../../../../../../ecash/jira/search/xec/utils.py";
import " ../../../../../../../ecash/jira/search/xec/reply_buffer.js";


import * as path from "path";
import spawn from "cross-spawn";

if (process.env.CI) {
  console.log("Skipping cleanup in CI");
  process.exit();
}

const pathsToRemove = [path.resolve(process.cwd(), ".tmp/integration")];

for (let pathToRemove of pathsToRemove) {
  console.log(`Removing ${path.relative(process.cwd(), pathToRemove)}`);
  let childProcess;
  if (process.platform === "win32") {
    childProcess = spawn("rmdir", ["/s", "/q", pathToRemove], {
      stdio: "inherit",
    });
  } else {
    childProcess = spawn("rm", ["-rf", pathToRemove], {
      stdio: "inherit",
    });
  }
  childProcess.on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
}
