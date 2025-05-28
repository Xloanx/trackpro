
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


const ComplaintForm = ({ formData, onFormDataChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaint Details</CardTitle>
        <CardDescription>
          Provide specific information about your complaint
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => onFormDataChange({ category })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">Billing Issues</SelectItem>
                <SelectItem value="service">Service Quality</SelectItem>
                <SelectItem value="technical">Technical Problems</SelectItem>
                <SelectItem value="staff">Staff Behavior</SelectItem>
                <SelectItem value="policy">Policy Concerns</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priority">Priority Level</Label>
            <Select 
              value={formData.priority} 
              onValueChange={(value) => onFormDataChange({ priority})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="title">Complaint Title *</Label>
          <Input
            id="title"
            placeholder="Brief description of your complaint"
            value={formData.title}
            onChange={(e) => onFormDataChange({ title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="details">Detailed Description *</Label>
          <Textarea
            id="details"
            placeholder="Please provide detailed information about your complaint..."
            className="min-h-32"
            value={formData.details}
            onChange={(e) => onFormDataChange({ details: e.target.value })}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.details.length}/1000 characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
