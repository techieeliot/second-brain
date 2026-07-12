# Application Flowcharts

These diagrams show how the package is connected, how its entry points route
arguments, and how a user moves from an idea to a saved Markdown note.

## Documentation filename rule

All authored pages in `docs/` use the pattern `[TYPE]-###-slug.md`, where
`TYPE` identifies the page's purpose, `###` is its sequence number, and `slug`
is a short lowercase description. For example, this page is
`ARCH-001-app-flowcharts.md`. The reserved `index.md` file is the MkDocs home
page and is the only navigation entry-point exception.

## 1. Package overview

```mermaid
flowchart LR
    subgraph Package["src/second_brain/"]
        direction LR
        subgraph Entry["Entry points"]
            Init["__init__.py<br/>package marker"]
            MainModule["__main__.py<br/>python -m"]
        end

        subgraph AppFile["app.py"]
            direction LR
            subgraph CLI["CLI commands"]
                MainFn["main()<br/>Click group"]
                NewFn["new(thought)"]
                ListFn["list_notes()"]
                ShowFn["show(number)"]
            end

            subgraph Storage["Note storage"]
                DirFn["_notes_directory()"]
                FilesFn["_note_files()"]
                SlugFn["_slugify(text)"]
                WriteFn["_write_note()"]
            end

            subgraph Logging["Logging"]
                LogFn["configure_logging()"]
                FormatFn["_compact_log_format()"]
            end
        end
    end

    MainModule -->|imports and calls| MainFn
    MainFn --> NewFn
    MainFn --> ListFn
    MainFn --> ShowFn
    NewFn --> DirFn
    NewFn --> SlugFn
    NewFn --> WriteFn
    ListFn --> DirFn
    ListFn --> FilesFn
    ShowFn --> FilesFn
    WriteFn -->|creates .md| Notes[("Markdown notes")]
    FilesFn -->|sorts *.md| Notes
    LogFn --> FormatFn

    Init -.->|package marker| AppFile
    Click[("Click")] -.->|decorates| MainFn
    Dotenv[("python-dotenv")] -.->|loads .env| MainFn
    Loguru[("Loguru")] -.->|sinks| LogFn
    Stdlib[("stdlib<br/>re · pathlib · datetime · sys")] -.-> AppFile
```

## 2. Entry points and arguments

```mermaid
flowchart LR
    Console["second_brain"] --> Script["pyproject.toml<br/>entry point"]
    Module["python -m second_brain"] --> MainModule["__main__.py"]
    MainModule --> Group["main()<br/>Click group"]
    Script --> Group

    Group --> Help["--help<br/>show commands"]
    Group --> New["new THOUGHT"]
    Group --> List["list<br/>no arguments"]
    Group --> Show["show NUMBER"]

    New --> NewFn["new(thought)<br/>write note"]
    List --> ListFn["list_notes()<br/>print path + numbering"]
    Show --> ShowFn["show(number)<br/>print note content"]

    Env[".env<br/>SECOND_BRAIN_NOTES_DIR"] --> Config["_notes_directory()"]
    Config --> NewFn
    Config --> ListFn
    Config --> ShowFn
```

## 3. Example user flow

```mermaid
flowchart LR
    Thought["💭 thought"] --> NewCmd["new<br/>&quot;My idea&quot;"]
    NewCmd --> LoadEnv["Load .env<br/>resolve notes directory"]
    LoadEnv --> Create["timestamped .md file<br/>plain Markdown"]
    Create --> Saved[("~/second_brain/<br/>note.md")]

    Saved --> ListCmd["second_brain list"]
    ListCmd --> Index["Print full path<br/>1. note.md"]
    Index --> Choice["User chooses NUMBER"]
    Choice --> ShowCmd["second_brain show 1"]
    ShowCmd --> Read["Read UTF-8 Markdown<br/>from the same sorted list"]
    Read --> Terminal["Print note content<br/>to the terminal"]
```
