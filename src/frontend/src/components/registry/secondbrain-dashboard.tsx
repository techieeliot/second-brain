"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronRight,
  Command,
  FileCode2,
  Folder,
  Hash,
  List,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CommandName = "new" | "list" | "show";

const commandDetails: Record<
  CommandName,
  { description: string; output: string; tag?: string; color: string }
> = {
  new: {
    description: "Save a fresh thought as a plain Markdown file.",
    output: '$ secondbrain new "My brilliant idea"\nSaved: ~/second_brain/my-brilliant-idea.md',
    tag: "TEXT",
    color: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  },
  list: {
    description: "See the storage path and a numbered list of notes.",
    output:
      "$ secondbrain list\nNotes: /Users/you/second_brain\n1. my-brilliant-idea.md\n2. learnings.md",
    color: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  },
  show: {
    description: "Print a note directly in your terminal.",
    output:
      "$ secondbrain show 1\nMy brilliant idea\n\nA tiny thought, ready to find later.",
    tag: "NUMBER",
    color: "border-slate-400/30 bg-slate-400/10 text-slate-200",
  },
};

const files = [
  { name: "app.py", kind: "Python CLI entry point", icon: FileCode2 },
  { name: "__main__.py", kind: "python -m launcher", icon: FileCode2 },
  { name: "__init__.py", kind: "Package marker", icon: FileCode2 },
];

export function SecondbrainDashboard() {
  const [activeCommand, setActiveCommand] = useState<CommandName>("new");
  const [selectedFile, setSelectedFile] = useState("app.py");
  const [isExplorerOpen, setExplorerOpen] = useState(true);
  const [isExplanationOpen, setExplanationOpen] = useState(false);
  const command = commandDetails[activeCommand];

  function runCommand(name: CommandName) {
    setActiveCommand(name);
    toast.success(`secondbrain ${name} executed`, {
      description: `Mock ${name} action completed successfully.`,
    });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-6 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 p-6 shadow-2xl shadow-blue-950/30 sm:p-10">
          <div className="absolute -right-20 -top-24 size-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="relative space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-950/50 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.18em] text-blue-200">
              ✦ TINY CLI · LASTING THOUGHTS
            </div>
            <div className="max-w-3xl space-y-3">
              <p className="font-mono text-sm text-blue-200/75">your ideas, in plain sight</p>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                Catch a thought. Find it later.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300">
                A tiny command-line companion that turns fleeting thoughts into
                durable, readable Markdown.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-blue-100">
              {["your thought", "secondbrain", "Markdown files"].map((step, index) => (
                <div className="flex items-center gap-2" key={step}>
                  <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2">
                    {step}
                  </span>
                  {index < 2 ? <span className="text-blue-300">→</span> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <SectionLabel number="01" title="PLAYGROUND" subtitle="Control board" />
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="border-white/10 bg-[#121212]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Command className="size-4 text-violet-300" />
                  Choose a command
                </CardTitle>
                <CardDescription>Click a block to preview the terminal action.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {(Object.keys(commandDetails) as CommandName[]).map((name) => {
                  const item = commandDetails[name];
                  const active = activeCommand === name;
                  return (
                    <Button
                      className={cn(
                        "h-auto w-full justify-between border px-3 py-3 text-left",
                        active ? item.color : "border-white/10 bg-[#161616] text-slate-300",
                      )}
                      key={name}
                      onClick={() => runCommand(name)}
                      variant="outline"
                    >
                      <span className="flex items-center gap-3">
                        {name === "new" ? <Sparkles className="size-4" /> : null}
                        {name === "list" ? <List className="size-4" /> : null}
                        {name === "show" ? <Hash className="size-4" /> : null}
                        <span>
                          <span className="block font-mono text-sm font-bold">{name}</span>
                          <span className="block text-xs font-normal opacity-70">{item.description}</span>
                        </span>
                      </span>
                      {item.tag ? (
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <span className="rounded border border-current/25 px-1.5 py-0.5 font-mono text-[10px]" />
                            }
                          >
                            {item.tag}
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.tag === "TEXT"
                              ? "The thought to save as Markdown."
                              : "The numbered note to print."}
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </Button>
                  );
                })}
                <Collapsible open={isExplanationOpen} onOpenChange={setExplanationOpen}>
                  <CollapsibleTrigger className="mt-3 flex w-full items-center justify-between rounded-lg border border-dashed border-white/15 px-3 py-2 text-left text-xs text-slate-400 hover:bg-white/5">
                    How the command works
                    {isExplanationOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pt-3 text-xs leading-5 text-slate-400">
                    Click a command to change the example. The real CLI reads your
                    configured notes directory, performs one small operation, and
                    keeps the result as ordinary Markdown.
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            <TerminalWindow command={activeCommand} output={command.output} />
          </div>
        </section>

        <section className="space-y-4">
          <SectionLabel number="02" title="PLAYGROUND" subtitle="Under the hood" />
          <Card className="border-white/10 bg-[#121212]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Folder className="size-4 text-amber-300" />
                A small package with a clear job
              </CardTitle>
              <CardDescription>
                Select a file to see how the terminal command is assembled.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <Collapsible open={isExplorerOpen} onOpenChange={setExplorerOpen}>
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-mono text-sm text-slate-200 hover:bg-white/5">
                  {isExplorerOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  <Folder className="size-4 text-amber-300" />
                  src/secondbrain/
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-3 border-l border-white/10 pl-3">
                  {files.map((file) => {
                    const Icon = file.icon;
                    const active = selectedFile === file.name;
                    return (
                      <button
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-mono text-sm transition-colors",
                          active ? "bg-blue-500/15 text-blue-200" : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                        )}
                        key={file.name}
                        onClick={() => setSelectedFile(file.name)}
                        type="button"
                      >
                        <Icon className="size-4" />
                        {file.name}
                      </button>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
              <FileMetadata fileName={selectedFile} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function SectionLabel({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-end gap-3">
      <span className="font-mono text-xs text-blue-300">{number}</span>
      <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-slate-200">{title}</h2>
      <span className="text-sm text-slate-500">/ {subtitle}</span>
    </div>
  );
}

function TerminalWindow({ command, output }: { command: CommandName; output: string }) {
  return (
    <Card className="overflow-hidden border-white/10 bg-[#0d0d0d] py-0">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#161616] px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
        <Terminal className="ml-2 size-3 text-slate-500" />
        <span className="font-mono text-[11px] text-slate-500">secondbrain — terminal</span>
      </div>
      <pre className="min-h-64 whitespace-pre-wrap p-5 font-mono text-xs leading-6 text-emerald-300 sm:text-sm">
        <span className="text-slate-500"># a thought, one command away{"\n"}</span>
        {output}
        <span className="animate-pulse text-white">{"\n"}▌</span>
      </pre>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3 font-mono text-[10px] text-slate-500">
        <Tooltip>
          <TooltipTrigger
            render={<span className="rounded bg-white/5 px-2 py-1 text-slate-300" />}
          >
            {command}
          </TooltipTrigger>
          <TooltipContent>CLI command selected in the control board.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<span className="rounded bg-white/5 px-2 py-1" />}>
            ~/second_brain
          </TooltipTrigger>
          <TooltipContent>Default directory where Markdown notes are saved.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<span className="rounded bg-white/5 px-2 py-1" />}>
            SECOND_BRAIN_NOTES_DIR
          </TooltipTrigger>
          <TooltipContent>Optional environment variable for changing note storage.</TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
}

function FileMetadata({ fileName }: { fileName: string }) {
  const isApp = fileName === "app.py";
  return (
    <div className="animate-in fade-in-50 rounded-xl border border-white/10 bg-[#161616] p-5 duration-300">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm text-blue-200">
            <FileCode2 className="size-4" /> src/secondbrain/{fileName}
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {isApp ? "The Click group where the CLI commands meet." : files.find((file) => file.name === fileName)?.kind}
          </p>
        </div>
        <Button aria-label="Run file preview" size="icon-sm" variant="outline">
          <Play className="size-3" />
        </Button>
      </div>
      {isApp ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <Metadata label="Framework" value="Click 8.1+" />
          <Metadata label="Input" value="thought: str" />
          <Metadata label="Storage" value="SECOND_BRAIN_NOTES_DIR" />
          <Metadata label="Output" value="Markdown + path" />
        </div>
      ) : (
        <p className="rounded-lg border border-white/10 bg-[#121212] p-3 font-mono text-xs text-slate-400">
          This small module keeps package startup predictable and easy to inspect.
        </p>
      )}
    </div>
  );
}

function Metadata({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#121212] p-3">
      <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{label}</div>
          <Tooltip>
            <TooltipTrigger
              render={<span className="mt-1 block cursor-help font-mono text-xs text-slate-200" />}
            >
              {value}
            </TooltipTrigger>
            <TooltipContent>
              {label === "Storage"
                ? "Set this variable in .env to override the default notes directory."
                : `${label} used by the Python CLI.`}
            </TooltipContent>
          </Tooltip>
    </div>
  );
}
