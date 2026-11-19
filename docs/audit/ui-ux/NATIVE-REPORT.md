# Native Visual Studio audit

First runtime assessment on 19 November 2026. The 17 native captures stay locally and are excluded from Git because they contain machine paths. Capture IDs below refer to that private evidence. See [PRIVACY.md](PRIVACY.md). This report complements the 75 web scenarios and 97 browser captures; it does not certify every workflow or accessibility variant.

## Environment and isolation

- Visual Studio Community 2026, version 18.12.1; installer state complete and launchable after the user's update.
- .NET 10 runtime available; backend published with the installed .NET 11 SDK targeting .NET 10.
- SVN and svnadmin provided by the installed TortoiseSVN command-line tools.
- Extension version 0.6.1 built from the current working tree. The original capture package SHA-256 is `C54D82C25CE8C769A071CDDA1FFF123398ACF0BDC46C4731888FBC32685C283F`.
- Dedicated experimental instance: `SvnAudit20261119`. Machine-specific environment details stay locally and are excluded from Git.
- Fresh local SVN repository with separate working copies for existing changes, clean operations and conflicts. One text conflict and two tree conflicts were prepared in the additional `wc-conflicts` working copy.
- No AI requests, credential entry, conflict resolution, revert or remote repository changes were performed. A 1,907-byte patch was exported from a fixture file to the fixture root. The text conflict markers remain on disk.

The merge editor creates an unsaved result buffer when opened. That buffer was neither accepted nor saved. The user subsequently closed that IDE instance. Generated fixture data is separate from the user's projects.

## Runtime evidence

| Capture | Surface and result |
|---|---|
| 01 (local only) | Extensions > SVNAssist command menu is present after startup and solution loading |
| 02 (local only) | Changes opens docked; toolbar and commit controls adapt to the narrow panel |
| 03 (local only) | Log opens as an editor document while Changes remains docked |
| 04 (local only) | Revision selection shows changed paths and the embedded web diff |
| 05 (local only) | Changed-path action opens Visual Studio's actual side-by-side difference viewer |
| 06 (local only) | New Visual Studio Options page adds an intermediate link to legacy settings |
| 07 (local only) | Legacy modal hosts the Settings web view; narrow stacked layout is active |
| 08 (local only) | Actual branch picker loads local repository branches/tags; Escape closes it |
| 09 (local only) | Hosted file menu exposes diff, staging, revert, lock, patch and Shelve actions |
| 10 (local only) | Native lock-message input prompt opens; cancelled without acquiring a lock |
| 11 (local only) | Native confirmation lists the affected file and consequences; cancelled without reverting |
| 12 (local only) | Hosted Shelve selects the name and dims the background; Escape closes it |
| 13 (local only) | Actual Save dialog is navigated to the fixture folder; patch export succeeds |
| 14 (local only) | Changes displays text and tree conflicts; dense content requires internal scrolling |
| 15 (local only) | Native merge document and conflict InfoBar appear together |
| 16 (local only) | Standard SVN glyphs and the file-level Show Log entry are visible in Solution Explorer |
| 17 (local only) | Native editor menu exposes selected-change revert and difference navigation |

Repository commit messages and fixture file contents in the captures originate from the existing simulation script and retain their original language. They are user-content equivalents, not translation defects. Product labels that remain Italian in an otherwise English UI are recorded separately below.

## Findings requiring targeted follow-up

| ID | Priority | Observed evidence | Proposed acceptance criterion |
|---|---|---|---|
| UX-007 | P2 | On the first Changes snapshot, backend status and the prerequisite label remain Italian while controls are English. Later operation status is English. Captures 02 and 03 | First render and language changes must localize cached backend labels as well as newly generated messages. Investigate initialization order and cached strings; preserve repository content verbatim |
| UX-008 | P3 | Visual Studio 2026 inserts a legacy Options landing page before the actual extension settings. Capture 06 | Evaluate migration to the current settings experience or a direct, clearly named extension settings entry; document the supported VS versions |
| UX-009 | P2 | Native text input has virtually no vertical gap from the button row. The source creates a sibling TextBlock without explicitly associating its label with the input. Capture 10 and `PromptDialog.Field` | Separate fields from actions and verify field names in UI Automation and a screen reader at supported DPI levels |
| UX-010 | P2 | Destructive revert confirmation uses generic OK rather than the operation name. Capture 11 | Use an explicit action label such as Revert changes and an unambiguous cancel action; verify default focus and keyboard behavior |
| UX-011 | P2 | Settings says changes apply immediately while the outer legacy modal offers Cancel. Capture 07; immediate persistence is confirmed by source behavior, not by changing a setting during this run | Make Cancel semantics clear, or buffer edits until confirmation. Include provider/secret changes and navigation to the wizard in the design |
| UX-012 | P2 | Merge pane headings use Source/Target and helper filenames, while extension actions use mine/theirs. Capture 15 | Make the mapping of local, incoming and result explicit without changing the merge engine's ordering |
| UX-013 | P3 | Fresh IDE build folders and `.vs` appear beside actual unversioned work in the fixture. Capture 02 | Evaluate a separate generated-artifact grouping or suggested ignore setup; do not silently change SVN ignore rules or the commit selection |

UX-004's density observation is reproduced in the real host (capture 14). The three existing targeted fixes remain in place; this pass adds evidence and proposed changes rather than silently redesigning native workflows.

## Remaining verification

Follow-up: UX-007, UX-009 and UX-010 were implemented after these baseline captures. The user reported that the three requested IDE smoke checks looked correct. See [batch 1](batch-1/REPORT.md) for tests and remaining accessibility limits; no after screenshots were captured. The user subsequently closed the original merge instance, so its unsaved result buffer is no longer available for inspection.

- Authentication dialogs: source inventory only. The computer-use guidance prohibits automating user authentication dialogs; a user-led session is required for runtime evidence. No account or credentials are needed for the existing local fixture captures.
- Missing WebView2, missing .NET and repeated backend failure: dedicated failure environment required. Do not uninstall or disable the user's working runtimes for an audit.
- Complete commit, switch/recovery, merge/resume/undo, Unshelve and patch-application workflows; this pass verifies entry points and selected cancellations/export, not all state transitions.
- Complete keyboard and screen reader testing, multiple native DPI configurations, all theme variants, and large/long-content native dialogs.

Some owned-modal focus and accessibility snapshots were inconsistent in the automation helper. Native keyboard/accessibility results must therefore be confirmed independently. Browser regressions provide stronger automated evidence for Shelve focus/inert behavior; native captures confirm its visual integration and Escape closure.

## Reproduction notes

Build the backend and VSIX as described in `docs/host.md`, install into a dedicated root suffix, and prepare a fresh fixture root without `-Force`. Record package and source hashes. When logging a Visual Studio launch, always provide an explicit log filename:

```powershell
& 'C:/Program Files/Microsoft Visual Studio/18/Community/Common7/IDE/devenv.exe' `
  "$fixtureRoot/wc/Shop.sln" /RootSuffix SvnAudit20261119 `
  /Log "$fixtureRoot/ActivityLog.xml"
```

Do not place `/Log` directly before a solution path without a log filename: Visual Studio interprets that path as the log destination. The initial audit launch hit this setup issue; the synthetic solution was restored from its local SVN repository before runtime captures. This was a test setup mistake, not a product finding.
