# SVNAssist UI/UX audit

Started on 19 November 2026. This package contains the surface inventory, reproducible web gallery, evidence, findings and implementation backlog. All audit documentation, gallery navigation and synthetic fixtures are in English. The product language selector remains available for localization checks; historical screenshots retain their original product language.

## Browse the evidence

- Open [index.html](index.html): 75 scenarios with dark/light/blue themes, English product UI by default, optional Italian localization, widths of 360/480/800/1200 px and heights of 600/900 px. URL fragments identify the scenario and profile.
- Read [SCENARIOS.md](SCENARIOS.md), [INVENTORY.md](INVENTORY.md), [BACKLOG.md](BACKLOG.md), [NATIVE-REPORT.md](NATIVE-REPORT.md) and [IDE-CHECKLIST.md](IDE-CHECKLIST.md). Native screenshots stay locally and are excluded from Git; see [PRIVACY.md](PRIVACY.md).
- Read the [batch 1 implementation and verification report](batch-1/REPORT.md) and [next batch proposals](NEXT-BATCH.md).
- Compare the conflict layout [before and after batch 2](batch-2/index.html) and read its [verification limits](batch-2/REPORT.md).
- [scenarios.json](scenarios.json) contains synthetic English view states. [manifest.json](manifest.json) records the starting commit and working tree source hashes.
- [capture-report.json](capture-report.json) records browser checks and screenshot paths. [baseline-report.json](baseline-report.json) and [before/](before/) preserve initial diagnostic metrics and two original screenshots before the fixes.
- Machine-specific environment records stay locally and are excluded from Git. The first native runtime pass is complete; remaining variants are listed explicitly in the native report.

The gallery embeds production HTML, CSS and JavaScript. Its offline artifact removes CSP only to allow resource inlining; the extension retains its CSP. The audit bridge records commands without executing SVN, AI or host operations. Local fields, menus and focus use production handlers. Host/backend transitions require the interactive demo or actual IDE.

Synthetic fixtures exercise rendering branches; they are not a full recording of backend states. Fixture messages remain in English when switching the product UI to Italian. Do not report this deliberate combination as a product translation defect. The web Diff view is distinct from Visual Studio's native difference viewer.

## Reproduce

From the repository root:

```powershell
node tools/build-ui-audit.mjs
node tools/capture-ui-audit.mjs
node --test tests/ui-web/*.test.mjs
```

Capture requires an existing Playwright installation and Microsoft Edge. The script installs neither. To use a separate Playwright package:

```powershell
node tools/capture-ui-audit.mjs --playwright 'C:/path/to/node_modules/playwright'
```

Each scenario is captured in dark/English at 480x900 for Changes or 1200x900 for Log/Diff/Settings. Eleven representative scenarios also use light/English at 360x600 and blue/English at 800x900. This is targeted coverage, not every combination. Capture replaces matching report entries and images; preserve a baseline before further changes.

## Progress

| Operation | Status | Evidence and limits |
|---|---|---|
| Source inventory | Completed for discovered surfaces | Entry points and responsible source files |
| Web scenario matrix | 75 scenarios | Normal, loading, error and recovery states; combinations are not exhaustive |
| Offline gallery | Implemented | Production rendering, direct links and downloadable fixtures |
| Browser capture | 97 captures in English | No rendering failures or anomalies in the automated checks performed |
| Visual review | Initial sample inspected | Narrow Changes, conflicts, model wizard, Settings, merge result, extended Switch and Shelved; systematic review remains open |
| Targeted fixes | Six findings addressed | Branch/Tag revision name, narrow Settings layout, Shelve modality/focus, initial backend language, native prompt spacing/naming and explicit confirmation actions; see batch 1 limits |
| Existing web tests | 192 passed | Existing web suite rerun after the documentation and fixture migration |
| Browser regressions | Passed in English | Shelve modality/focus/state update/command payload; enabled and named Branch/Tag revision input |
| Native verification | First runtime pass completed; 17 captures | Changes, Log, Options, diff/merge, InfoBar, menus, prompts and patch export; authentication/failure environments and complete workflows remain open |

Accessible-name checks are heuristic and do not replace an accessibility tree or screen reader test. No document overflow does not guarantee readable controls or absence of internal scrolling.

## Next steps

1. Review the entire catalog and link each finding to a scenario, screenshot and source.
2. Verify the corrected Shelve behavior in the host.
3. Complete the native checklist in the dedicated experimental instance.
4. Exercise first run, commit, switch/recovery, merge/conflicts/commit and Shelve/Unshelve workflows.
5. Implement structural changes in small groups, comparing identical scenarios before and after.
