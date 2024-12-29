import { types } from "@algo-builder/algob";

// We typically name the function "run" or "default"
export default async function run(
  runtimeEnv: types.RuntimeEnv,
  deployer: types.Deployer
): Promise<void> {
  const mainAccount = deployer.accountsByName.get("main");
  if (!mainAccount) {
    throw new Error("Main account not found. Check your accounts file.");
  }

  const approvalProgram = "contract_approval.py";
  const clearProgram = "contract_clear.py";

  // Deploy the stateful app
  const appInfo = await deployer.deployApp(
    approvalProgram,
    clearProgram,
    {
      sender: mainAccount,
      localInts: 0,
      localBytes: 0,
      globalInts: 0,
      globalBytes: 0
    },
    {}
  );
  console.log("App deployed with ID:", appInfo.appID);
}
