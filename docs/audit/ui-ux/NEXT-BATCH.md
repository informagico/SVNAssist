# Proposed next UI/UX batch

The conflict-card presentation and extension-owned merge wording have been implemented in [batch 2](batch-2/REPORT.md); native runtime verification remains open. The Settings persistence design below remains a proposal. Compare subsequent changes against the retained scenarios.

## Conflicts and merge attribution: UX-004 and UX-012

Each conflict card should show the repository-relative path, conflict type and resolution state first. Keep Open merge editor visible for text conflicts. Group destructive choices under a clearly named Resolve menu: Use local version and Use incoming version. Keep tree-conflict explanations and applicable actions specific to that conflict type; do not offer a text merge editor for unsupported files.

In the native merge entry point and InfoBar, explain which input is the local working copy, which is incoming repository content and which output will be written. Derive the mapping from the actual merge arguments for each workflow. Do not infer that Source always means incoming or change pane ordering to match a label. Preserve repository paths and revision identifiers verbatim.

Source anchors: `src/SVNAssist.Backend/Services/MergeEditor.cs` defines Base/Mine/Theirs/Merged and passes Theirs, Mine, Base, Merged to Visual Studio. `src/SVNAssist.Host/ConflictInfoBar.cs` maps existing choices to mine/theirs. These establish argument identity, but do not by themselves verify every native pane heading or every caller's conflict-file mapping.

Acceptance checks:

- Single text conflict, multiple conflicts, tree conflict, binary file and long paths remain identifiable at 360/480/800 px.
- Primary action and resolution state remain visible; secondary actions are reachable by keyboard and have explicit accessible names.
- Cancel leaves files and conflict state unchanged. Choosing a version names the affected file and action in its confirmation.
- Local/incoming/result attribution agrees between the web card, InfoBar, editor inputs and saved output for update and merge conflicts.
- Before/after evidence uses the same fixture and viewport. Existing conflict resolution payloads and merge ordering are preserved.

## Settings persistence: UX-008 and UX-011

The current web page persists changes immediately inside a Visual Studio Options host that supplies Cancel. A text-only notice improves disclosure but does not make Cancel revert edits.

Recommended behavior for the Options page: stage edits in a page session, apply them through the host's Apply/OK lifecycle, and discard staged edits on Cancel. Keep wizard navigation explicit about whether it saves independently. Treat provider changes and secret storage as part of the same persistence design; never copy stored secret values into ordinary UI state or logs.

Before implementation, trace settings commands, host lifecycle and provider wizard writes together. A partial buffer that still writes secrets or provider selections immediately would retain the inconsistency. Add meaningful integration tests for edit/cancel, edit/apply/cancel, validation failure, language/theme preview rollback and wizard navigation.

Source anchors: `src/SVNAssist.UI.Web/js/settings.js` sends settingsSet on control changes and settingsSecret on explicit secret actions. `src/SVNAssist.Host/OptionsPage.cs` hosts that web view through UIElementDialogPage. The current page does not implement an edit-session contract.

A direct Settings entry could remove the extra legacy landing page, but it needs a defined window lifecycle and persistence model. Evaluate this after the persistence contract is settled; the audit does not establish support for a newer Visual Studio settings API.

## Ordering

1. Build and compare a conflict-card proposal using existing English gallery fixtures.
2. Verify local/incoming/result mappings in source and fixture workflows before changing merge copy.
3. Implement the conflict presentation in a small batch with keyboard and command-payload regressions.
4. Complete the Settings lifecycle design, then implement persistence as a separate batch.

Generated-artifact grouping (UX-013) remains separate: presentation must not silently alter SVN ignore rules, hide selected files or change commit selection.
