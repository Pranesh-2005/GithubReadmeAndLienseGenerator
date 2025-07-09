"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Github, FileText, Scale, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReadmeGenerator() {
  const [repoUrl, setRepoUrl] = useState("")
  const [username, setUsername] = useState("")
  const [licenseType, setLicenseType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [readmeContent, setReadmeContent] = useState("")
  const [licenseContent, setLicenseContent] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()

  const licenseOptions = [
    { value: "MIT", label: "MIT License" },
    { value: "Apache-2.0", label: "Apache License 2.0" },
    { value: "GPL-3.0", label: "GNU GPL v3.0" },
  ]

  async function generate() {
    if (!repoUrl || !username) {
      setError("Please enter all required fields.")
      return
    }

    setError("")
    setIsGenerating(true)
    setReadmeContent("")
    setLicenseContent("")

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_url: repoUrl,
          username: username,
          license_type: licenseType || "MIT",
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setReadmeContent(data.readme)
      setLicenseContent(data.license)

      toast({
        title: "Generation Complete!",
        description: "Your README and LICENSE files have been generated successfully.",
      })
    } catch (error) {
      console.error(error)
      setError("Failed to generate files. Please check your connection and try again.")
      toast({
        title: "Generation Failed",
        description: "There was an error generating your files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: `${type} content copied to clipboard.`,
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download Started",
      description: `${filename} is being downloaded.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Github className="h-8 w-8 text-blue-600" />
            <FileText className="h-8 w-8 text-green-600" />
            <Scale className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            README & LICENSE Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate professional README and LICENSE files for your GitHub repositories automatically
          </p>
        </div>

        {/* Input Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Repository Information
            </CardTitle>
            <CardDescription>Enter your repository details to generate documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="repoUrl" className="text-sm font-medium">
                  Repository URL *
                </Label>
                <Input
                  id="repoUrl"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Name *
                </Label>
                <Input
                  id="username"
                  placeholder="your-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseType" className="text-sm font-medium">
                License Type
              </Label>
              <Select value={licenseType} onValueChange={setLicenseType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a license (default: MIT)" />
                </SelectTrigger>
                <SelectContent>
                  {licenseOptions.map((license) => (
                    <SelectItem key={license.value} value={license.value}>
                      {license.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={generate}
              disabled={isGenerating}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Files...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Generate Files
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        {(readmeContent || licenseContent || isGenerating) && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Generated Files
              </CardTitle>
              <CardDescription>Your README and LICENSE files are ready</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="readme" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="readme" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    README.md
                    {readmeContent && (
                      <Badge variant="secondary" className="ml-2">
                        Ready
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="license" className="flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    LICENSE
                    {licenseContent && (
                      <Badge variant="secondary" className="ml-2">
                        Ready
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="readme" className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(readmeContent, "README")}
                      disabled={!readmeContent}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(readmeContent, "README.md")}
                      disabled={!readmeContent}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <Textarea
                    value={isGenerating && !readmeContent ? "Generating README..." : readmeContent}
                    readOnly
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Your generated README will appear here..."
                  />
                </TabsContent>

                <TabsContent value="license" className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(licenseContent, "LICENSE")}
                      disabled={!licenseContent}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(licenseContent, "LICENSE")}
                      disabled={!licenseContent}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <Textarea
                    value={isGenerating && !licenseContent ? "Generating LICENSE..." : licenseContent}
                    readOnly
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Your generated LICENSE will appear here..."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>Generate professional documentation for your GitHub repositories</p>
        </div>
      </div>
    </div>
  )
}
