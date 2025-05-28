
import { Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const FileUpload = ({ files, onFileUpload, onRemoveFile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporting Documents</CardTitle>
        <CardDescription>
          Upload any relevant files, screenshots, or documents (Optional)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Click to upload files
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                PNG, JPG, PDF up to 10MB each
              </span>
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              onChange={onFileUpload}
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
