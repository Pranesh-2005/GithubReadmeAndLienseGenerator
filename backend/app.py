import gradio as gr
from github_analyzer import analyze_repo
from readme_generator import generate_readme
from azure_ai import enhance_with_ai
from license_generator import generate_license

def generate(repo_url, username, license_type):
    repo_info = analyze_repo(repo_url)
    ai_summary = enhance_with_ai(repo_info)
    selected_license = generate_license(license_type, username)
    generate_readme(repo_info, ai_summary, license_type=selected_license)

    with open("readme.md", "r", encoding="utf-8") as f:
        readme_content = f.read()
    with open("LICENSE", "r", encoding="utf-8") as f:
        license_content = f.read()

    return readme_content, license_content

iface = gr.Interface(
    fn=generate,
    inputs=[
        gr.Textbox(label="Repository URL"),
        gr.Textbox(label="Username"),
        gr.Dropdown(["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"], label="License Type")
    ],
    outputs=[
        gr.Textbox(label="Generated README", lines=20),
        gr.Textbox(label="Generated LICENSE", lines=20)
    ],
    title="Auto README & License Generator",
    description="Enter a GitHub repo, username, and choose a license to auto-generate README and LICENSE files."
)

if __name__ == "__main__":
    iface.launch()
