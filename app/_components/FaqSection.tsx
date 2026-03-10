export function FaqSection() {
  return (
    <section className="kl-faq" id="faq">
      <div className="kl-faq-title">FAQ</div>
      <dl className="kl-faq-list">
        <div className="kl-faq-item">
          <dt>How do I add a CLI?</dt>
          <dd>
            Open a pull request on the{" "}
            <a
              href="https://github.com/AgentlyHQ/cookbooks-registry"
              target="_blank"
              rel="noopener noreferrer"
            >
              cookbooks-registry
            </a>{" "}
            repo. Add your entry to <code>clis.json</code> following the existing format — include a <code>slug</code>, <code>name</code>, <code>description</code>, <code>github</code>, and an <code>install</code> block (<code>npm</code>, <code>pip</code>, <code>brew</code>, or <code>cargo</code>).
          </dd>
        </div>

        <div className="kl-faq-item">
          <dt>What qualifies for the registry?</dt>
          <dd>
            Any CLI tool designed to work with agentic workflows — tools that an LLM or agent might invoke to interact with external services, APIs, or local systems. It should be publicly available and installable.
          </dd>
        </div>

        <div className="kl-faq-item">
          <dt>What are Workflows?</dt>
          <dd>
            Workflows are coming soon — curated sequences of CLI tools and prompts for common agentic tasks. If you have ideas, open an issue on the registry repo.
          </dd>
        </div>

        <div className="kl-faq-item">
          <dt>Is this affiliated with Agently?</dt>
          <dd>
            Yes — cookbooks is maintained by{" "}
            <a href="https://use-agently.com" target="_blank" rel="noopener noreferrer">
              Agently
            </a>
            , a platform for building and running agentic workflows.
          </dd>
        </div>
      </dl>
    </section>
  );
}
