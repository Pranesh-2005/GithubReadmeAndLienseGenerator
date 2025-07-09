from flask import Flask, request, jsonify
from github_analyzer import analyze_repo
from readme_generator import generate_readme
from azure_ai import enhance_with_ai
from license_generator import generate_license
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    repo_url = data['repo_url']
    username = data['username']
    license_type = data['license_type']

    repo_info = analyze_repo(repo_url)
    ai_summary = enhance_with_ai(repo_info)
    selected_license = generate_license(license_type, username)
    generate_readme(repo_info, ai_summary, license_type=selected_license)

    with open("README.md", "r", encoding="utf-8") as f:
        readme_content = f.read()
    with open("LICENSE", "r", encoding="utf-8") as f:
        license_content = f.read()

    return jsonify({"readme": readme_content, "license": license_content})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
