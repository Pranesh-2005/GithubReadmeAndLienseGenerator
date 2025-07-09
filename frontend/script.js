async function generate() {
  const repoUrl = document.getElementById('repoUrl').value;
  const username = document.getElementById('username').value;
  const licenseType = document.getElementById('licenseType').value;

  if (!repoUrl || !username) {
    alert("Please enter all fields.");
    return;
  }

  document.getElementById("readmeOutput").innerText = "Generating...";
  document.getElementById("licenseOutput").innerText = "Generating...";

  try {
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repo_url: repoUrl,
        username: username,
        license_type: licenseType
      })
    });

    const data = await response.json();
    document.getElementById("readmeOutput").innerText = data.readme;
    document.getElementById("licenseOutput").innerText = data.license;
  } catch (error) {
    document.getElementById("readmeOutput").innerText = "❌ Error generating README.";
    document.getElementById("licenseOutput").innerText = "❌ Error generating LICENSE.";
    console.error(error);
  }
}
