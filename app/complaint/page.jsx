'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast";
import { 
  Zap, 
  Search, 
  Upload, 
  Send, 
  Building, 
  MapPin, 
  Factory,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

// interface Organization {
//   id: string;
//   name: string;
//   address: string;
//   industry: string;
// }

const ComplaintPage = () => {
  // const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showOrgResults, setShowOrgResults] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // Mock organizations data
  const organizations = [
    { id: "1", name: "TechCorp Solutions", address: "123 Tech Street, Silicon Valley", industry: "Technology" },
    { id: "2", name: "HealthCare Plus", address: "456 Medical Ave, Health City", industry: "Healthcare" },
    { id: "3", name: "EduLearn Institute", address: "789 Education Blvd, Learning Town", industry: "Education" },
    { id: "4", name: "FinanceFirst Bank", address: "321 Money Street, Finance District", industry: "Financial Services" },
  ];

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    category: "",
    priority: "medium",
    details: "",
    contactPreference: "email",
    files: [] 
  });

  const handleSearch = (value) => {
    setSearchQuery(value);
    setShowOrgResults(value.length > 0);
  };

  const selectOrganization = (org) => {
    setSelectedOrg(org);
    setSearchQuery(org.name);
    setShowOrgResults(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedOrg) {
      // toast({
      //   title: "Organization Required",
      //   description: "Please select an organization to submit your complaint to.",
      //   variant: "destructive"
      // });
      return;
    }

    if (!isAnonymous && (!formData.name || !formData.email)) {
      // toast({
      //   title: "Contact Information Required",
      //   description: "Please provide your name and email address.",
      //   variant: "destructive"
      // });
      return;
    }

    // Generate a ticket ID
    const generatedTicketId = `TC-${Date.now().toString().slice(-6)}`;
    setTicketId(generatedTicketId);
    setIsSubmitted(true);

    // toast({
    //   title: "Complaint Submitted Successfully",
    //   description: `Your ticket ID is ${generatedTicketId}. Save this for tracking.`,
    // });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Navigation */}
        <nav className="border-b bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TrackPro
                </span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Complaint Submitted Successfully!</CardTitle>
              <CardDescription>
                Your complaint has been received and is being processed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Your Ticket Reference:</p>
                <div className="text-2xl font-bold text-gray-900 mb-2">{ticketId}</div>
                <p className="text-sm text-gray-500">
                  Save this reference number to track your complaint status
                </p>
              </div>
              
              <div className="text-left space-y-2">
                <p><strong>Organization:</strong> {selectedOrg?.name}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Priority:</strong> {formData.priority}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      title: "",
                      name: "",
                      email: "",
                      phone: "",
                      category: "",
                      priority: "medium",
                      details: "",
                      contactPreference: "email",
                      files: []
                    });
                    setSelectedOrg(null);
                    setSearchQuery("");
                    setTicketId("");
                  }}
                >
                  Submit Another Complaint
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrackPro
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit a Complaint</h1>
          <p className="text-lg text-gray-600">
            Help us resolve your concerns by providing detailed information about your issue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Select Organization
              </CardTitle>
              <CardDescription>
                Search and select the organization your complaint is about
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Type organization name..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
                
                {showOrgResults && filteredOrgs.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {filteredOrgs.map((org) => (
                      <div
                        key={org.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => selectOrganization(org)}
                      >
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {org.address}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Factory className="w-3 h-3 mr-1" />
                          {org.industry}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedOrg && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-900">{selectedOrg.name}</div>
                  <div className="text-sm text-blue-700">{selectedOrg.address}</div>
                  <Badge variant="secondary" className="mt-2">{selectedOrg.industry}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Complaint Details */}
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
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
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
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.details.length}/1000 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How should we contact you regarding this complaint?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous">Submit anonymously</Label>
              </div>

              {!isAnonymous && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required={!isAnonymous}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required={!isAnonymous}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-preference">Preferred Contact Method</Label>
                      <Select value={formData.contactPreference} onValueChange={(value) => setFormData(prev => ({ ...prev, contactPreference: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* File Upload */}
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
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <Button type="submit" className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Submit Complaint
              </Button>
              <p className="text-sm text-gray-500 text-center mt-2">
                By submitting this complaint, you agree to our terms of service and privacy policy.
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;
