from github import Github
from urllib.parse import urlparse
import os
from dotenv import load_dotenv

load_dotenv()

def extract_repo_name(url):
    path = urlparse(url).path.strip("/")
    return path.split("/")[-2], path.split("/")[-1]

def is_important_file(path):
    ignored_dirs = ["node_modules", "test", "__tests__", ".git", "build", ".next", ".vscode"]
    important_dirs = ["src", "components", "pages", "hooks", "controller", "service"]
    important_exts = [".py", ".js", ".ts", ".jsx", ".tsx", ".java"]

    if any(ignored in path for ignored in ignored_dirs):
        return False

    if any(dir_ in path for dir_ in important_dirs) and any(path.endswith(ext) for ext in important_exts):
        return True

    if path.count("/") <= 1 and any(path.endswith(ext) for ext in important_exts):
        return True

    return False

def get_filtered_file_contents(repo, path=""):
    contents = repo.get_contents(path)
    all_files = {}
    for content in contents:
        if content.type == "dir":
            all_files.update(get_filtered_file_contents(repo, content.path))
        else:
            if is_important_file(content.path):
                try:
                    file_data = content.decoded_content.decode("utf-8")
                    all_files[content.path] = file_data
                except Exception as e:
                    all_files[content.path] = f"Unable to read: {e}"
    return all_files

def analyze_repo(repo_url):
    g = Github(os.getenv("GITHUB_TOKEN"))
    owner, name = extract_repo_name(repo_url)
    repo = g.get_repo(f"{owner}/{name}")

    info = {
        "name": repo.name,
        "description": repo.description,
        "topics": repo.get_topics(),
        "files": get_filtered_file_contents(repo),
        "url": repo.html_url
    }
    return info
