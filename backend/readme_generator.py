def generate_readme(repo_info, content, license_type=None):
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(f"# {repo_info['name']}\n\n")
        f.write(content)
        if license_type:
            f.write(f"\n\n## License\nThis project is licensed under the **{license_type}** License.")
        f.write(f"\n\n---\n🔗 GitHub Repo: {repo_info['url']}")
