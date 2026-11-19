# Batch 2: conflict actions and version attribution

19 November 2026. Scope: UX-004 and the extension-owned wording in UX-012.

Browse the [before/after comparison](index.html). The three profiles use identical synthetic conflict fixtures and viewport sizes: dark 480x900, light 360x600 and blue 800x900. Baseline images were preserved before rebuilding the gallery; the current web gallery and demo include the changes.

## Implemented behavior

- Text conflict cards retain Open merge editor and a file-specific Resolve conflict menu. Property conflicts expose their applicable resolution menu without a text-editor or Use both action. Tree conflicts retain their separate explanation and mark-as-resolved workflow.
- Resolution menus preserve the existing operation names, keys and backend confirmations. Bulk text actions use a separate menu after the individual conflicts and tree group.
- File identity, conflict type and Unresolved state precede actions. Relative paths wrap. SVN helper files and the local/incoming guide are expandable; their open state survives state snapshots.
- Menus expose expanded state, support keyboard selection and restore focus on Escape. An open resolution menu closes when conflict data changes or the view becomes busy.
- English choices consistently name local and incoming versions in web menus and the native InfoBar. Local/incoming single-file confirmations use the corresponding action label rather than OK. Existing Italian localization keys remain the product's translation convention.
- After opening a merge editor, status identifies the actual local helper filename, incoming helper filename and repository-relative result path. The native InfoBar explains local/incoming and the save/mark-as-resolved sequence.

The argument order passed to the merge engine is unchanged. Source and Target headings belong to Visual Studio and have not been renamed. The status describes file identities derived from the existing Base/Mine/Theirs/Merged mapping rather than assuming a fixed meaning for native pane headings.

## Verification

| Check | Result | Limits |
|---|---|---|
| Web unit suite | 192 passed | Updated conflict assertions check the menu structure and retain payload/schema validation |
| .NET targeted suite | 69 passed | Conflict operations, real SVN fixture tests in the selected suite, localization and UI audit regressions; the full .NET suite was not rerun for this batch |
| Browser gallery | 97 captures; 0 rendering failures | Synthetic data and mock bridge; commands are recorded without execution |
| Conflict browser regressions | Passed in dark 480x900, light 360x600 and blue 800x900 | Keyboard open/select/Escape, focus restoration, expanded state, exact per-file/bulk payloads, property/tree restrictions, long paths, helper disclosure persistence and busy-state menu closure |
| Visual review | Final light 360x600 and dark 480x900 images inspected | Internal scrolling remains; all conflict variants and accessibility behavior are not exhaustively reviewed |
| Backend publish and VSIX rebuild | Succeeded | Existing compiler/platform/threading warnings remain |
| Native runtime | Pending | Updated VSIX built but not installed or exercised in the IDE during this batch |

The package hash, changed tracked source hashes and browser results are recorded in [evidence.json](evidence.json). Local command logs are in `TestResults/ui-audit-batch2-*`.

## Remaining checks

- In the IDE, verify the docked card layout, keyboard/focus behavior, InfoBar text and merge status against an actual conflicted file. Do not mark this passed based on browser evidence.
- Confirm native pane attribution for both update and merge conflicts and inspect the resulting file before resolution. This batch does not certify every caller/pane mapping.
- Binary conflict classification is unchanged. The current schema exposes text/property/tree; these fixtures do not establish native binary-editor support.
- Screen reader behavior, native DPI variants and complete resolution/commit workflows remain open.
- Settings persistence (UX-011) and its host lifecycle remain the next separate implementation task.
