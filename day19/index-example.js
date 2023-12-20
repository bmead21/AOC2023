function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [_workflows, parts] = input.split("\n\n");
  const workflows = {};
  input
    .split("\n\n")[0]
    .split("\n")
    .forEach((workflow) => {
      let [, key, process] = workflow.match(/(.+){(.+)}/);
      process = process.split(",").map((p) => {
        const match = p.match(/(?<cat>.)(?<op>[<>])(?<limit>\d+):(?<to>.+)/);
        if (!match) return p;
        const { cat, op, limit, to } = match.groups;
        return { cat, op, limit: +limit, to };
      });
      workflows[key] = process;
    });
  parts = input
    .split("\n\n")[1]
    .split("\n")
    .map((part) => [...part.matchAll(/(\d+)/g)])
    .map((part) => part.map(([num]) => +num))
    .map(([x, m, a, s]) => ({ x, m, a, s }));
  return [workflows, parts];
}

function process([workflows, parts]) {
  const accepted = [];
  main: for (const part of parts) {
    let w = "in";

    while (true) {
      if (w === "A") {
        accepted.push(part);
        continue main;
      }
      if (w === "R") continue main;
      for (const cond of workflows[w]) {
        if (typeof cond === "string") {
          w = cond;
          break;
        }
        const { cat, op, limit, to } = cond;
        if (op === ">" && part[cat] > limit) {
          w = to;
          break;
        }
        if (op === "<" && part[cat] < limit) {
          w = to;
          break;
        }
      }
    }
  }

  return accepted.reduce((acc, { x, m, a, s }) => acc + x + m + a + s, 0);
}
