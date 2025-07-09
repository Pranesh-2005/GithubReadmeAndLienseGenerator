import os
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

client = AzureOpenAI(
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_KEY")
)

def enhance_with_ai(repo_info):
    file_summaries = "\n".join([
        f"### {name}\n```{content[:300]}```"
        for name, content in list(repo_info['files'].items())[:10]
    ])

    prompt = f"""
    Create a professional README.md for a GitHub project named "{repo_info['name']}".

    Description: {repo_info['description']}
    Topics: {', '.join(repo_info['topics'])}

    The project includes the following files:
    {file_summaries}

    README must include: Introduction, Features, Installation, Usage, Contributing, and License.
    """

    response = client.chat.completions.create(
        model=os.getenv("AZURE_DEPLOYMENT_NAME"),
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates GitHub READMEs. You must follow the provided structure and include all necessary sections. Use necessary emojies and markdown formatting."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )

    return response.choices[0].message.content
