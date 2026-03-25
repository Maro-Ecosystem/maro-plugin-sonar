import chalk from "chalk";

import { AppRepo, Command, Effect, If, PromptPaths, Table, Workflow } from "@maro/maro";
import { AppScan } from "../../steps/AppScan";
import { SonarProject } from "../../lib/project";

const ScanCommand: Command = {
  name: "scan",
  description: "Run sonar scan",
  aliases: [],
  run: async ({ ctx }) => {
    await new Workflow([
      new PromptPaths({
        paths: ["frontend", "backend"],
        transform: ({ path }) => ({ app_repo: new AppRepo(path) })
      }),
      new Table({
        head: async ({ app_repo }) => {
          const { name } = await app_repo.getInfo();
          return [name, "Value", "", "Limit"];
        },
        map: ({ key, value, comparator, threshold, ok }) => {
          const color = ok ? chalk.green : chalk.red;
          return [key, color(value), color(comparator), color(threshold)];
        },
        key: "scan",
        style: { compact: true },
        step: new AppScan()
      }),
      new If({
        condition: () => ctx.ui.confirm({ message: "Open report in browser?" }),
        then: new Effect({
          effect: ({ project }: { project: SonarProject }) => project.openInBrowser()
        })
      })
    ]).run(ctx);
  }
};

export default ScanCommand;

