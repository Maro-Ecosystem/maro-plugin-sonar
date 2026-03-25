import { Command } from "@maro/maro";
import ScanCommand from "./scan";

const AppCommands: Command = {
  name: "app",
  subcommands: [
    ScanCommand
  ]
};

export default AppCommands
