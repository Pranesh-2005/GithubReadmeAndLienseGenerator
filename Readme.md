# 🚀 GithubReadmeAndLienseGenerator

Auto-generate professional `README.md` and `LICENSE` files for your repositories in seconds.

---

## 📖 Introduction

**GithubReadmeAndLienseGenerator** is a powerful CLI and web-based tool that streamlines project setup for developers. With just a repository URL and a couple of inputs, it analyzes your codebase, leverages Azure AI for content enhancement, and instantly creates high-quality README and LICENSE files tailored to your project. Perfect for open-source maintainers, contributors, and anyone wishing to improve their repo documentation effortlessly!

---

## ✨ Features

- **Automatic README.md Generation**: Analyzes your repo’s structure and summarizes it using AI.
- **License Creation**: Supports multiple license templates with customization for author and year.
- **GitHub Integration**: Parses repositories directly via URL.
- **AI Enhancement**: Uses Azure OpenAI for improved summaries and content.
- **Modern Frontend**: Built with React, TailwindCSS, and shadcn/ui for a sleek user experience.
- **CLI & GUI**: Use it from the command line or a web interface.
- **Open Source**: Fully extensible and easy to contribute to!

---

## 🛠️ Installation

### Prerequisites

- Python 3.8+
- Node.js & npm (for frontend)
- [Azure OpenAI API](https://azure.microsoft.com/en-us/products/openai/) credentials
- GitHub Personal Access Token (recommended)

### Backend Setup

```bash
git clone https://github.com/Pranesh-2005/GithubReadmeAndLienseGenerator.git
cd GithubReadmeAndLienseGenerator/backend

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create a .env file with your Azure and GitHub keys
cp .env.example .env
# Edit .env with your credentials
```

### Frontend Setup

```bash
cd ../front
npm install
npm run dev
```

---

## 🚦 Usage

### CLI (Python)

```bash
python app.py
# Follow the prompts for repo URL, username, and license type
```

### Web Interface

1. Start backend and frontend as described above.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Enter the repository URL, your username, and select a license.
4. Click "Generate" to instantly receive your README.md and LICENSE files!

### Example

```python
from backend.app import generate

readme, license = generate(
    repo_url="https://github.com/your-username/your-repo",
    username="your-username",
    license_type="MIT"
)
```

---

## 🤝 Contributing

We welcome contributions of all kinds!

1. Fork the repo and create your branch:
    ```bash
    git checkout -b feature/my-awesome-feature
    ```
2. Commit your changes and push:
    ```bash
    git commit -am 'Add some feature'
    git push origin feature/my-awesome-feature
    ```
3. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## 🏷️ Topics

`automation` `cli-tool` `developer-tools` `documentation` `github-readme` `license-generator`  
`open-source-project` `project-setup` `readme-builder` `readme-creator` `readme-generator`  
`readme-md` `readme-template` `repo-setup` `project-readme` `repo-readme`

---

> Made with ❤️ by the open source community.


## License
This project is licensed under the **MIT** License.

---
🔗 GitHub Repo: https://github.com/Pranesh-2005/GithubReadmeAndLienseGenerator