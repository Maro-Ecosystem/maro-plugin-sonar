import { ConfigRegistry, PluginExport } from "@maro/maro";
import AppCommands from "./commands/app";
import { SonarConfig } from "./config";

const plugin: PluginExport = {
  name: "maro-plugin-sonar",
  onLoad() {
    ConfigRegistry.register(new SonarConfig())
  },
  commands: [
    AppCommands
  ]
};

export default plugin;
