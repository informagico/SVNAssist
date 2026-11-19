# UI surface inventory

A surface is any interaction point: view, independent section, dialog, menu or IDE integration. Web states are listed separately in SCENARIOS.md. Paths below are relative to the repository root.

| ID | Surface and entry point | Main source | Coverage |
|---|---|---|---|
| V01 | SVN Changes / Extensions menu | `src/SVNAssist.UI.Web/js/changes.js`, `src/SVNAssist.Host/ToolWindows.cs` | Gallery; native docking pending |
| V02 | Log / Show Log and Solution Explorer | `src/SVNAssist.UI.Web/js/log.js`, `src/SVNAssist.Host/ToolWindows.cs` | Gallery; IDE document integration pending |
| V03 | Web Diff | `src/SVNAssist.UI.Web/js/diff.js` | Gallery; separate from native diff |
| V04 | Settings / Tools > Options > SVNAssist | `src/SVNAssist.UI.Web/js/settings.js`, `src/SVNAssist.Host/OptionsPage.cs` | Six providers; native Options container pending |
| S01 | Manual working copy and detection failure | `src/SVNAssist.UI.Web/js/changes.js` | No working copy and path input |
| S02 | File selection, tree/list, staging and filtering | `src/SVNAssist.UI.Web/js/tree.js`, `src/SVNAssist.UI.Web/js/changes.js` | Tree and 500 files; list and full workflow need review |
| S03 | Commit message, AI generation, errors and trace | `src/SVNAssist.UI.Web/js/changes.js` | Generation, recoverable error and long text |
| S04 | Recent commit messages | `src/SVNAssist.UI.Web/js/changes.js` | Nonmodal popover and local search |
| S05 | Prerequisites checklist | `src/SVNAssist.UI.Web/js/prereq.js` | Inline checklist and wizard |
| S06 | Four-step AI setup | `src/SVNAssist.UI.Web/js/prereq.js` | Provider, prerequisites, API access, models and model error; other sign-in modes need review |
| S07 | Update to revision | `src/SVNAssist.UI.Web/js/changes.js` | List, empty, loading and error |
| S08 | Switch / branch button and actions | `src/SVNAssist.UI.Web/js/changes.js` | Quick, extended, empty, loading and error |
| S09 | Switch / local changes and recovery | `src/SVNAssist.UI.Web/js/ops.js`, `src/SVNAssist.UI.Web/js/changes.js` | Warning and synthetic recovery actions |
| S10 | Branch/Tag | `src/SVNAssist.UI.Web/js/ops.js` | Branch and tag; full validation needs review |
| S11 | Cleanup | `src/SVNAssist.UI.Web/js/ops.js` | Standard and destructive options; old SVN client needs review |
| S12 | Commit All / unversioned file confirmation | `src/SVNAssist.UI.Web/js/ops.js` | Dialog with file list |
| S13 | Update / incoming revisions and AI summary | `src/SVNAssist.UI.Web/js/ops.js` | AI idle, loading, completed and error |
| S14 | Operation progress | `src/SVNAssist.UI.Web/js/ops.js` | Running, success, error, cancelled, conflicts and other-view strip |
| S15 | Merge / source and revision selection | `src/SVNAssist.UI.Web/js/changes.js`, `src/SVNAssist.UI.Web/js/log.js` | Source picker, selection, blocked state, error, preview and result |
| S16 | Interrupted merge / continue or undo | `src/SVNAssist.UI.Web/js/ops.js`, `src/SVNAssist.UI.Web/js/log.js` | Changes banner and Log panel |
| S17 | Text, property and tree conflicts | `src/SVNAssist.UI.Web/js/changes.js` | Three conflict types; bulk actions and large sets need review |
| S18 | Shelve dialog and Shelved archive | `src/SVNAssist.UI.Web/js/ops.js`, `src/SVNAssist.UI.Web/js/changes.js` | Dialog, archive and Unshelve menu |
| S19 | Changes action, AI and row menus | `src/SVNAssist.UI.Web/js/ctxmenu.js`, `src/SVNAssist.UI.Web/js/changes.js` | Gallery; section and multiselection menus need review |
| S20 | Log filters, options, comparison and revision menu | `src/SVNAssist.UI.Web/js/log.js` | Gallery; file menu and folder context need review |
| N01 | Extensions menu and language selection | `src/SVNAssist.Host/SVNAssist.vsct`, `src/SVNAssist.Host/SVNAssistPackage.cs` | Source inventory; native capture pending |
| N02 | Solution Explorer menu and SVN glyphs | `src/SVNAssist.Host/SVNAssist.vsct`, `src/SVNAssist.Host/SvnSccService.cs` | Native file/folder/project checks pending |
| N03 | Generic prompts and confirmations | `src/SVNAssist.Host/PromptDialog.cs`, `src/SVNAssist.Host/HostService.cs` | Message/button variants; native checks pending |
| N04 | Text input prompt | `src/SVNAssist.Host/PromptDialog.cs` | Revision/message variants; native checks pending |
| N05 | SVN credentials | `src/SVNAssist.Host/PromptDialog.cs` | User, password and Remember; synthetic data only |
| N06 | Create/Apply Patch and Save patch file pickers | `src/SVNAssist.Host/HostService.cs` | Native Open/Save dialogs pending |
| N07 | Difference viewer and three-way merge editor | `src/SVNAssist.Host/HostService.cs` | Native checks pending; historical illustrations are not runtime evidence |
| N08 | Revert block/selection and diff navigation | `src/SVNAssist.Host/RevertMargin.cs`, `src/SVNAssist.Host/SVNAssistPackage.cs` | Margin, editor menu and shortcuts pending |
| N09 | Document conflict InfoBar | `src/SVNAssist.Host/ConflictInfoBar.cs` | Native checks pending |
| N10 | Missing WebView2 or initialization error | `src/SVNAssist.Host/WebViewHost.cs` | Requires a dedicated environment or injected failure |
| N11 | Backend startup/runtime and information messages | `src/SVNAssist.Host/BackendProcess.cs`, `src/SVNAssist.Host/SVNAssistPackage.cs` | Native prompts pending |

Shared styling: `src/SVNAssist.UI.Web/css/tokens.css` and `panel.css`. Host theming: `src/SVNAssist.Host/ThemeBridge.cs`. Protocol and schemas: `docs/ui-protocol.md` and `src/SVNAssist.UI.Web/contract/`. Historical release images are references, not evidence of the current version.

## Runtime evidence update

The first native pass captured N01-N04 and N06-N09 entry points in the real host, plus hosted Switch, Shelve and conflicts. See [NATIVE-REPORT.md](NATIVE-REPORT.md) for exact coverage. N05 authentication and N10-N11 failure variants remain source-only. Observed entry points do not certify every listed interaction variant.
