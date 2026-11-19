# Audit evidence privacy

Native Visual Studio screenshots can contain personal directory names and machine paths. Keep their originals on this computer. They are not part of the shareable audit package.

The audit's .gitignore excludes the native directory, machine-specific environment JSON files, batch screenshot images and the local directory. These files were untracked when the exclusions were added. No Git history rewrite was needed. Ignored originals remain available for local review; they have not been deleted or anonymized.

Shareable material consists of the English findings, implementation reports, source changes and synthetic web gallery. Capture numbers in the native report identify local evidence; the corresponding image files are intentionally absent from Git.

The default gallery build links to the textual native assessment and does not generate the private native gallery. To rebuild that ignored local gallery explicitly:

```powershell
node tools/build-ui-audit.mjs --include-local-native
```

Git exclusions prevent ordinary staging, not manual uploads, folder copies or forced staging. Do not publish a ZIP of the whole working directory or upload the private files separately. If native images are needed for external review, prepare separate redacted copies and inspect every visible path before sharing them. Never replace the local originals with redacted evidence.
