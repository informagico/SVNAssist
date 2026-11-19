# Visual Studio host verification

The initial installation was incomplete and not launchable. After the user completed the update on 19 November 2026, `vswhere` reports `isComplete=true`, `isLaunchable=true` and Visual Studio Community 2026 version 18.12.1. The agent did not install or repair Visual Studio.

## Preparation

- [x] Recheck Visual Studio, MSBuild, .NET 10 runtime and SVN CLI availability.
- [x] Publish the backend and compile a version 0.6.1 VSIX containing backend and web UI assets.
- [x] Initialize the dedicated `SvnAudit20261119` experimental instance and record its environment.
- [x] Prepare a new dedicated SVN fixture without replacing existing simulations.
- [x] Verify WebView2 in the actual host: Changes, Log and Settings render successfully.
- [x] Use fixture-only content in saved evidence; no credentials were entered.

`collaudo-mirato.ps1` may reset existing simulation and application data; it is not used wholesale for this audit. `setup-sim.ps1` is used only with a fresh, verified temporary root, without `-Force`. Its internal temporary checkout paths must remain within that root.

## Native surfaces

| Surface | Checks | Status |
|---|---|---|
| Docked Changes | Narrow docked view observed; close/reopen, resize and complete focus regression remain | Capture 02; partial |
| Log document | Working-copy document, revision detail and native diff observed; other contexts remain | Captures 03-05; partial |
| Options | New Options landing and legacy modal observed; persistence/wizard transitions need regression | Captures 06-07; partial |
| Extensions menu | Command menu observed; all enablement and language variants remain | Capture 01; partial |
| Solution Explorer | Standard glyphs and versioned file menu observed; other contexts remain | Capture 16; partial |
| Generic prompts | File-specific revert confirmation observed and cancelled; variants remain | Capture 11; partial |
| Text input prompt | Lock message prompt observed and cancelled; keyboard/accessibility/long input remain | Capture 10; partial |
| SVN credentials | Masking, Tab order, Remember, invalid input and cancel | Pending; do not automate actual authentication |
| Patch file pickers | Save dialog observed; fixture patch exported and checked (1,907 bytes); Open/error variants remain | Capture 13; partial |
| Native diff | Actual text comparison and editor commands observed; binary/revert workflows remain | Captures 05 and 17; partial |
| Three-way merge | Native source/target/result panes opened; no result accepted or saved | Capture 15; partial |
| Conflict InfoBar | Displayed on the actual conflicted merge document; resolution/removal remain | Capture 15; partial |
| Runtime errors | Missing WebView2 and backend startup recovery | Dedicated failure environment required |

## Complete workflows

- [ ] First run without a working copy, select path, inspect prerequisites, configure provider and return to Changes. Real AI calls need an existing account and the product's privacy confirmation.
- [ ] Select files, enter message and commit; Commit All with unversioned files; cancel and SVN error.
- [ ] Normal Switch, local changes warning, cancel/continue, interruption and recovery in the fixture repository.
- [ ] Merge source/revisions, preview, apply, conflicts, editor, resolution, continue and commit.
- [ ] Shelve, switch context and Unshelve; patch conflict, keep and delete cases.
- [ ] Create/Apply Patch and selected revert; inspect exactly which fixture files changed.

Record actual screenshots, steps, expected/observed behavior and relevant source. Run theme smoke checks, keyboard navigation, context menus, narrow panels and 100/150/200% scaling. Screen reader verification must inspect the host accessibility tree, names, roles and progress/error announcements. Pending rows must not be treated as passed.

See [NATIVE-REPORT.md](NATIVE-REPORT.md) for findings, evidence and runtime limits. Authentication and missing-runtime scenarios were not exercised.
