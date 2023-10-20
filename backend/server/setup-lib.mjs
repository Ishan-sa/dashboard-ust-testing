import fs from "node:fs/promises";
import path from "node:path";

const target_path = "../../frontend/src/lib";
const link_path = "./";
const link_name = "lib";

try {
  // check if target ( the folder we want to link to ) exists
  // -- throws if does not exist
  await fs.access(target_path, fs.constants.F_OK | fs.constants.R_OK);

  try {
    // check if link ( the resulting symbolic link folder ) exists
    // -- throws if does not exist
    await fs.access(path.join(link_path, link_name), fs.constants.F_OK | fs.constants.R_OK);

    const dirEntries = await fs.readdir(link_path, { withFileTypes: true });
    if (dirEntries.find((entry) => entry.name === link_name)?.isSymbolicLink() === true) {
      console.log("OK: Symbolic Link Already Exists");
    } else {
      console.log("FAILURE: Pre-existing file or folder exists.");
    }
  } catch {
    try {
      // attempt to create the symbolic link
      await fs.symlink(path.relative(link_path, target_path), path.join(link_path, link_name), "dir");

      // check if link ( the resulting symbolic link folder ) exists
      // -- throws if does not exist
      await fs.access(path.join(link_path, link_name), fs.constants.F_OK | fs.constants.R_OK);
      console.log("SUCCESS: Symbolic Link Created");
    } catch {
      console.log("FAILURE: Could not Create Symbolic Link");
    }
  }
} catch {
  console.log("FAILURE: Reference Target Does Not Exist");
}
