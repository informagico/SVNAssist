# Findings and implementation backlog

P1: functional interaction inconsistency or risk. P2: localized accessibility/usability issue. P3: structural or clarity improvement requiring validation. Priorities are initial technical assessments, not user telemetry findings.

| ID | Priority | Evidence and impact | Change and acceptance criteria | Status |
|---|---|---|---|---|
| UX-001 | P2 | `branch` and `tag`: `bt-rev` had no label or accessible name; two baseline findings | Added a translated accessible name. After selecting revision as the copy source, the enabled field must be named Revision | Fixed; browser regression passed |
| UX-002 | P2 | `settings-openai` at 360x600: two narrow columns truncated the provider control | Below 520 px, stack descriptions and controls, use full-width fields and allow header wrapping. Compare the historical before image with the current capture | Fixed; browser and visual checks passed |
| UX-003 | P1 | `shelve`: locally opened dialog declared `aria-modal=true` while `.app.inert=false`; only the operation container was updated | Synchronize open/close with Changes rendering. Verify inert, initial focus, Escape, focus restoration, text/focus preservation after a state snapshot and name/keep command payload | Fixed; browser regression passed; SVN workflow and host still pending |
| UX-004 | P3 | `conflicts` at 480x900: many actions per file and internal scrolling create a dense interaction area | Group secondary actions and progressive details while preserving file identity, conflict type and primary action | Implemented; web/browser checks passed; native verification pending; see batch 2 |
| UX-005 | P3 | `wizard-4` at 360x600: final action wraps to a second footer row | Evaluate hierarchy and action order in narrow panels. Every action must remain reachable in a coherent reading order | Proposal; requires further review |
| UX-006 | P2 | Release screenshot scenes provide editorial coverage rather than a complete UI catalog; some native views are illustrations | Maintain audit fixtures and inventory separately from release assets. New surfaces must declare states and web/host verification | Infrastructure added; coverage must be maintained |
| UX-007 | P2 | First hosted snapshot mixes English controls with Italian cached backend labels | Localize first-render and cached state consistently | Fixed; regression tests passed; user confirmed IDE smoke check |
| UX-008 | P3 | Visual Studio 2026 adds a legacy Options landing page | Evaluate current settings integration or a direct settings entry | Observed; design follow-up |
| UX-009 | P2 | Native input prompt has almost no gap before actions; source lacks explicit input-label association | Add separation and verify accessible field names | Spacing and UIA association implemented; user confirmed visual check; screen reader/DPI pending |
| UX-010 | P2 | Destructive revert confirmation uses generic OK | Use an operation-specific action label and verify default focus | Fixed; regression tests passed; user confirmed IDE smoke check |
| UX-011 | P2 | Immediate Settings persistence coexists with an outer Cancel button | Clarify or align persistence and cancellation semantics | Observed/source-reviewed; design follow-up |
| UX-012 | P2 | Native merge panes use Source/Target while extension actions use mine/theirs | Make local/incoming/result attribution explicit | Extension wording and file attribution improved; native pane/workflow verification remains; see batch 2 |
| UX-013 | P3 | Generated IDE/build folders crowd the unversioned group | Evaluate grouping or suggested ignore setup without silently changing SVN rules | Observed in fixture; design follow-up |

For each fix, retain a reproducible scenario, a targeted check and before/after evidence where relevant. A command recorded by the audit bridge is not a completed backend operation. Authentication, state transitions and protection of local changes need a test repository and real host.

Systematic visual review of all 75 scenes and screen reader testing remain open. Existing contrast tests pass as part of the web suite; this is not an accessibility certification.

Native evidence, detailed acceptance criteria and limits are in [NATIVE-REPORT.md](NATIVE-REPORT.md). UX-007, UX-009 and UX-010 are covered by the [batch 1 report](batch-1/REPORT.md). Conflict presentation and extension-owned merge wording are covered by [batch 2](batch-2/REPORT.md). The [next batch proposal](NEXT-BATCH.md) retains the Settings persistence design, which remains unimplemented.
