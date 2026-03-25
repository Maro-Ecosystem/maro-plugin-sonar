import { PluginExport } from "../../../dist/lib";
import AppCommands from "./commands/app";

const plugin: PluginExport = {
  name: "maro-plugin-sonar",
  commands: [
    AppCommands
  ]
};

export default plugin;
