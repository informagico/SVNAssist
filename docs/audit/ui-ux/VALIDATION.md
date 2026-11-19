# Validation record

19 November 2026.

| Check | Result | Limits |
|---|---|---|
| Existing web suite | 192 tests passed, 0 failed | Covers existing UI logic, contracts and contrast assertions |
| English web gallery | 75 unique scenarios generated | Synthetic English data; product localization selector retained |
| Browser capture | 97 current captures; 0 rendering failures | Targeted profiles rather than every theme/size/language combination |
| Automated layout checks | No document overflow or modal outside the viewport in captured profiles | Internal scrolling and readability require visual review |
| Accessible-name heuristic | No unnamed visible controls in captured profiles | Not a screen reader or full accessibility-tree certification |
| Shelve browser regression | Passed | Inert background, initial focus, text/focus after state update, Escape, return focus and command payload/closing |
| Branch/Tag browser regression | Passed | Enabled revision input has the English accessible name after choosing revision source |
| Backend publish | Succeeded for .NET 10 | Existing nullable/platform warnings reported |
| VSIX build | Succeeded for version 0.6.1 | Existing threading/analyzer warnings reported; package hash recorded separately |
| Native runtime | 17 actual captures | Includes hosted views, native dialogs/menus, diff/merge and conflict InfoBar; see native report |
| Patch export | 1,907-byte patch generated from fixture file | Only the synthetic repository was used |
| Cancelled operations | Lock and revert prompts cancelled; Switch and Shelve closed | No lock, revert, merge acceptance or conflict resolution performed |
| Conflict preservation | Conflict markers remained on disk during the original capture | User subsequently closed the original instance; its unsaved result buffer is no longer available |
| Batch 1 targeted regressions | 112 passed; web suite 192 passed | Initial language, localized action labels and confirmation outcomes; see batch 1 report |
| Batch 1 IDE smoke checks | User reported all three checks looked correct | English startup, Lock prompt spacing and Revert confirmation/focus; no after screenshots or screen reader verification |
| Debouncer isolated rerun | 12 passed | First full .NET run had one timing timeout; complete rerun result is recorded in the batch 1 report |
| Complete .NET rerun | 962 passed, 0 failed, 0 skipped | Initial debouncer timeout did not reproduce; root cause remains unconfirmed |
| Batch 2 regressions | 192 web and 69 targeted .NET tests passed | Conflict menus, version identity, localization and confirmation behavior; no new full-suite run |
| Batch 2 browser capture | 97 captures, 0 rendering failures; conflict behavior checks passed in 3 profiles | Before/after comparison retained; native runtime verification pending |

Shareable machine-readable evidence: [capture-report.json](capture-report.json) and [manifest.json](manifest.json). Native evidence and environment records stay locally and are excluded from Git; see [PRIVACY.md](PRIVACY.md). The historical web baseline retains initial diagnostic metrics; only two original web before screenshots were preserved.
