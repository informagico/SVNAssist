# Batch 1: initial language and native prompts

Date: 19 November 2026. Findings: UX-007, UX-009 and UX-010.

The updated package was built and installed into the separate `SvnAuditFix20261119` experimental instance with `AuditFix.sln`. Its package SHA-256 is `165C70AF0BD0331B8A61FB8B61B4F91D76BD79ABC1646CF440B237B469AE0DF0`. The machine-specific environment record stays locally and is excluded from Git.

| Finding | Implemented behavior | Verification |
|---|---|---|
| UX-007 | Apply the configured language before host entry points start backend work. Derive initial loading and prerequisite summary labels in the active language rather than retaining constructor-time translations | Regression tests cover solution, SCC, path and command entry points, initial snapshots and preservation of explicit status text. User reported the requested English startup check looked correct |
| UX-009 | Add 12 device-independent pixels between prompt fields and actions. Associate each input with its visible label through UI Automation name and LabeledBy | Host build passed. User reported the requested Lock prompt spacing check looked correct. Screen reader and multiple-DPI checks remain open |
| UX-010 | Use operation labels for revert, delete and undo-merge confirmations. Generic confirmations initially focus Cancel; text prompts retain input focus | Regression tests verify English/Italian revert labels and accepted/cancelled/dismissed responses. User reported the requested Revert changes/Cancel and initial Cancel focus checks looked correct |

The user completed the three requested IDE checks and reported that everything appeared correct. This is user-reported manual verification, not an independently recorded accessibility or keyboard test. No after screenshots were captured. The original baseline remains available only in the ignored local native gallery: captures 02/03 for language, 10 for the text prompt and 11 for revert. See [the evidence privacy policy](../PRIVACY.md).

## Validation

- Targeted backend/localization/path tests: 112 passed.
- Web suite: 192 passed.
- Backend publish and Host/VSIX rebuild: succeeded with existing warnings.
- First complete .NET run: 961 passed, 1 failed out of 962. `RefreshDebouncerTests.UnRefreshCheFallisce_NonFermaIlCiclo` timed out. The test uses a fixed delay before requesting the second refresh; timing/coalescing under load is a possible cause, not a confirmed diagnosis.
- Isolated debouncer rerun: all 12 tests passed.
- Complete suite rerun: all 962 tests passed, 0 failed, 0 skipped (3 minutes 51 seconds). The original timeout did not reproduce; its root cause remains unconfirmed. TRX records are in `TestResults/ui-audit-batch1/ui-audit-batch1.trx` and `TestResults/ui-audit-batch1/ui-audit-batch1-rerun.trx` in the local workspace.

The original merge audit instance was closed by the user. The unsaved merge result can no longer be inspected in that editor; the retained baseline screenshot remains valid historical evidence. No merge acceptance or result save was performed by the agent.

## Remaining work

Check screen reader output and keyboard behavior independently, exercise native prompts at supported DPI levels, and retain matching after screenshots in a future capture session. User confirmation closes the requested visual smoke checks, not the full accessibility assessment or complete SVN workflows.
