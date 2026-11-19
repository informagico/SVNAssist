using System.Text.Json;
using SVNAssist.Hosting;
using SVNAssist.Models;
using SVNAssist.Services;
using SVNAssist.Stores;

namespace SVNAssist.Tests;

[Collection("Loc")]
public sealed class UiAuditRegressionTests : IDisposable
{
    public UiAuditRegressionTests() => Loc.Lang = "it";
    public void Dispose() => Loc.Lang = "it";

    private static BackendServer Server(FakeHost host, StubSettings settings, FakeSvnService? svn = null)
        => new(host, new BackendServices
        {
            Settings = settings,
            Svn = svn ?? new FakeSvnService(),
            Ai = new FakeAiFactory(),
            AiSetupPrompt = new NoopAiPrompt(),
            Dialogs = new HostDialogs(host),
            Probes = new PrerequisiteProbes(),
            PrerequisiteActions = new PrerequisiteActions(),
        });

    [Fact]
    public void InitialLabelsUseTheLanguageAtSnapshotTime()
    {
        using var server = Server(new FakeHost(), new StubSettings());
        Loc.Lang = "en";
        var state = (ChangesState)server.Changes.GetSnapshot();
        Assert.Equal("Loading...", state.Status.Msg);
        Assert.Equal("Prerequisites", state.Prereq.Summary);

        const string userText = "Keep this exact user text.";
        server.Changes.SetStatusMessage(userText);
        Loc.Lang = "it";
        Assert.Equal(userText, ((ChangesState)server.Changes.GetSnapshot()).Status.Msg);
    }

    [Theory]
    [InlineData("solution")]
    [InlineData("scc")]
    [InlineData("path")]
    [InlineData("command")]
    public async Task HostEntryPointsApplyLanguageBeforeStartingWork(string entryPoint)
    {
        var host = new FakeHost();
        using var server = Server(host, new StubSettings { UiLanguage = "en" });
        switch (entryPoint)
        {
            case "solution": await server.SolutionChangedAsync(null); break;
            case "scc": await server.GetSccStatesAsync(); break;
            case "path": await server.RunPathCommandAsync("log", []); break;
            case "command":
                await server.DispatchAsync("changes", """{"v":1,"type":"cmd","id":1,"name":"setCommitText","args":{"text":"English audit message"}}""");
                break;
        }
        Assert.Equal("en", Loc.Lang);
        Assert.StartsWith("Prerequisites", ((ChangesState)server.Changes.GetSnapshot()).Prereq.Summary);
    }

    [Theory]
    [InlineData(0, true)]
    [InlineData(1, false)]
    [InlineData(-1, false)]
    public async Task RevertNamesTheActionAndCancellationDoesNotChangeFiles(int answer, bool shouldRevert)
    {
        Loc.Lang = "en";
        var host = new FakeHost { DefaultAnswer = answer };
        var svn = new FakeSvnService();
        svn.Statuses.Add(new SvnFileStatus("audit.cs", SvnStatusKind.Modified, false));
        using var server = Server(host, new StubSettings { UiLanguage = "en" }, svn);
        server.Changes.WorkingCopyPath = Path.Combine(Path.GetTempPath(), "SVNAssist_Audit_Fake");
        await server.Changes.RefreshAsync(CancellationToken.None);
        using var args = JsonDocument.Parse("""{"op":"revert","key":"changes:audit.cs"}""");
        await server.Changes.DispatchAsync("rowOp", args.RootElement, CancellationToken.None);

        Assert.Equal(new[] { "Revert changes", "Cancel" }, Assert.Single(host.Prompts).Buttons);
        Assert.Equal(shouldRevert ? 1 : 0, svn.Reverted.Count);
    }

    [Theory]
    [InlineData("it", "Annulla modifiche", "Annulla")]
    [InlineData("en", "Revert changes", "Cancel")]
    public async Task ExplicitConfirmationLabelsRemainLocalized(string language, string action, string cancel)
    {
        Loc.Lang = language;
        var host = new FakeHost { DefaultAnswer = 1 };
        var dialogs = new HostDialogs(host);
        Assert.False(await dialogs.ConfirmAsync("Fixture-only confirmation", Loc.T("Annulla modifiche"), CancellationToken.None));
        Assert.Equal(new[] { action, cancel }, Assert.Single(host.Prompts).Buttons);
    }

    [Theory]
    [InlineData("mine", "Use local version", SvnConflictChoice.MineFull, 0)]
    [InlineData("theirs", "Use incoming version", SvnConflictChoice.TheirsFull, 0)]
    [InlineData("mine", "Use local version", SvnConflictChoice.MineFull, 1)]
    [InlineData("theirs", "Use incoming version", SvnConflictChoice.TheirsFull, -1)]
    public async Task ConflictActionsKeepTheirSvnChoiceAndExplicitConfirmation(string op, string label, SvnConflictChoice choice, int answer)
    {
        Loc.Lang = "en";
        var host = new FakeHost { DefaultAnswer = answer };
        var svn = new FakeSvnService();
        svn.Statuses.Add(new SvnFileStatus("audit.cs", SvnStatusKind.Conflicted));
        using var server = Server(host, new StubSettings { UiLanguage = "en" }, svn);
        server.Changes.WorkingCopyPath = Path.Combine(Path.GetTempPath(), "SVNAssist_Audit_Fake");
        await server.Changes.RefreshAsync(CancellationToken.None);
        using var args = JsonDocument.Parse(JsonSerializer.Serialize(new { op, key = "changes:audit.cs" }));
        await server.Changes.DispatchAsync("conflictOp", args.RootElement, CancellationToken.None);

        var prompt = Assert.Single(host.Prompts);
        Assert.Contains("audit.cs", prompt.Message);
        Assert.Equal(new[] { label, "Cancel" }, prompt.Buttons);
        if (answer == 0) Assert.Equal(choice, Assert.Single(svn.Resolved).Choice);
        else Assert.Empty(svn.Resolved);
    }
}
