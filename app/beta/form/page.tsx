/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9Lpq2XRkgtg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF Files</CardTitle>
          <CardDescription>Drag and drop your PDF files or click the button to select them.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col items-center justify-center space-y-4 py-12 px-6 border-2 border-gray-300 border-dashed rounded-md transition-colors hover:border-gray-400 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
              <UploadIcon className="h-12 w-12 text-gray-400" />
              <div className="font-medium text-gray-900 dark:text-gray-50">Drop files here or click to upload</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">PDF files only</p>
            </div>
            <input type="file" accept=".pdf" multiple className="sr-only" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Upload</Button>
          </div>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        
      </div>
    </div>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}