# Web scenario matrix

Generated with `node tools/build-ui-audit.mjs`. Synthetic English fixtures. Capture and assess each row; gallery coverage does not certify backend workflows.

| ID | Scenario | View |
|---|---|---|
| [changes](index.html#changes) | Changes · selection and commit | changes |
| [changes-empty](index.html#changes-empty) | Changes · clean working copy | changes |
| [changes-no-wc](index.html#changes-no-wc) | Changes · no working copy | changes |
| [changes-loading](index.html#changes-loading) | Changes · loading | changes |
| [changes-error](index.html#changes-error) | Changes · error and recovery | changes |
| [changes-behind](index.html#changes-behind) | Changes · incoming revision | changes |
| [changes-long](index.html#changes-long) | Changes · long paths and messages | changes |
| [changes-large](index.html#changes-large) | Changes · 500 files | changes |
| [ai-loading](index.html#ai-loading) | AI · generation | changes |
| [ai-error](index.html#ai-error) | AI · expired authentication | changes |
| [prereq](index.html#prereq) | Prerequisites · checklist | changes |
| [conflicts](index.html#conflicts) | Conflicts · text, property and tree | changes |
| [shelved](index.html#shelved) | Shelved · saved patches | changes |
| [recent](index.html#recent) | Commit · recent messages | changes |
| [menu-more](index.html#menu-more) | Changes · actions menu | changes |
| [menu-ai](index.html#menu-ai) | AI · options menu | changes |
| [menu-row](index.html#menu-row) | Changes · file context menu | changes |
| [shelve](index.html#shelve) | Shelve · save changes | changes |
| [shelved-menu](index.html#shelved-menu) | Shelved · restore and delete | changes |
| [wizard-1](index.html#wizard-1) | AI setup · step 1 | changes |
| [wizard-2](index.html#wizard-2) | AI setup · step 2 | changes |
| [wizard-3](index.html#wizard-3) | AI setup · step 3 | changes |
| [wizard-4](index.html#wizard-4) | AI setup · step 4 | changes |
| [wizard-model-error](index.html#wizard-model-error) | AI setup · model list unavailable | changes |
| [wizard-prereq](index.html#wizard-prereq) | Prerequisites · guided setup | changes |
| [revision-normal](index.html#revision-normal) | Update to revision · normal | changes |
| [switch-normal](index.html#switch-normal) | Switch · normal | changes |
| [revision-loading](index.html#revision-loading) | Update to revision · loading | changes |
| [switch-loading](index.html#switch-loading) | Switch · loading | changes |
| [revision-error](index.html#revision-error) | Update to revision · error | changes |
| [switch-error](index.html#switch-error) | Switch · error | changes |
| [revision-empty](index.html#revision-empty) | Update to revision · empty | changes |
| [switch-empty](index.html#switch-empty) | Switch · empty | changes |
| [switch-warning](index.html#switch-warning) | Switch · local changes | changes |
| [merge-picker](index.html#merge-picker) | Merge · source branch picker | changes |
| [switch-extended](index.html#switch-extended) | Switch · extended list | changes |
| [switch-interrupted](index.html#switch-interrupted) | Switch · interruption recovery | changes |
| [cleanup](index.html#cleanup) | Cleanup · options | changes |
| [cleanup-danger](index.html#cleanup-danger) | Cleanup · confirm destructive actions | changes |
| [commit-warning](index.html#commit-warning) | Commit All · unversioned files | changes |
| [branch](index.html#branch) | Branch/Tag · branch | changes |
| [tag](index.html#tag) | Branch/Tag · tag | changes |
| [incoming-idle](index.html#incoming-idle) | SVN Update · preview / AI idle | changes |
| [incoming-loading](index.html#incoming-loading) | SVN Update · preview / AI loading | changes |
| [incoming-done](index.html#incoming-done) | SVN Update · preview / AI done | changes |
| [incoming-error](index.html#incoming-error) | SVN Update · preview / AI error | changes |
| [progress-running](index.html#progress-running) | Operation · running | changes |
| [progress-success](index.html#progress-success) | Operation · success | changes |
| [progress-error](index.html#progress-error) | Operation · error | changes |
| [progress-cancelled](index.html#progress-cancelled) | Operation · cancelled | changes |
| [progress-conflicts](index.html#progress-conflicts) | Operation · conflicts | changes |
| [merge-interrupted](index.html#merge-interrupted) | Merge · interrupted | changes |
| [merge-continue](index.html#merge-continue) | Merge · ready to continue | changes |
| [log](index.html#log) | Log · history and details | log |
| [log-empty](index.html#log-empty) | Log · no results | log |
| [log-loading](index.html#log-loading) | Log · loading | log |
| [log-error](index.html#log-error) | Log · error | log |
| [log-compare](index.html#log-compare) | Log · revision comparison | log |
| [log-menu](index.html#log-menu) | Log · revision menu | log |
| [log-options](index.html#log-options) | Log · history options | log |
| [log-merge-normal](index.html#log-merge-normal) | Log / Merge · normal | log |
| [log-merge-blocked](index.html#log-merge-blocked) | Log / Merge · blocked | log |
| [log-merge-error](index.html#log-merge-error) | Log / Merge · error | log |
| [log-merge-interrupted](index.html#log-merge-interrupted) | Log / Merge · interrupted | log |
| [merge-result-preview](index.html#merge-result-preview) | Merge · result preview | log |
| [merge-result-merge](index.html#merge-result-merge) | Merge · result merge | log |
| [progress-other-view](index.html#progress-other-view) | Log · operation started in Changes | log |
| [diff](index.html#diff) | Web Diff · side-by-side comparison | diff |
| [diff-empty](index.html#diff-empty) | Web Diff · no text differences | diff |
| [settings-auto](index.html#settings-auto) | Settings · auto | settings |
| [settings-copilot](index.html#settings-copilot) | Settings · copilot | settings |
| [settings-claudecode](index.html#settings-claudecode) | Settings · claudecode | settings |
| [settings-claude](index.html#settings-claude) | Settings · claude | settings |
| [settings-openai](index.html#settings-openai) | Settings · openai | settings |
| [settings-gemini](index.html#settings-gemini) | Settings · gemini | settings |
