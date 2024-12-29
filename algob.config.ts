import { types } from "@algo-builder/algob";
import { mkAccounts } from "@algo-builder/algob";

// We will load the "sandbox" accounts from YAML file
import { loadAccountsFromFileSync } from "@algo-builder/algob";
const sandboxAcc = loadAccountsFromFileSync("assets/accounts_sandbox.yaml");

const defaultNetwork = "sandbox";

export default {
  networks: {
    [defaultNetwork]: {
      host: "http://localhost",
      port: 4001,
      token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      accounts: sandboxAcc
    }
  }
} as types.Config;
