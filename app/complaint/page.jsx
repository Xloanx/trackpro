'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import { ToastContainer, toast } from 'react-toastify';
import { 
  Zap, 
  Send, 
  ArrowLeft,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import LiveChat from "@/components/liveChat";
import OrganizationSearch from "./components/organizationSearch";
import ComplaintForm from "./components/complaintForm";
import ContactInformation from "./components/contactInformation";
import FileUpload from "./components/fileUpload";
import SubmissionSuccess from "./components/submissionSuccess";

const ComplaintPage = () => {
  // const { toast } = useToast();
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [showLiveChat, setShowLiveChat] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "medium",
    details: "",
  });

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    contactPreference: "email",
  });

  const [files, setFiles] = useState([]);

  const handleFormDataChange = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleContactDataChange = (data) => {
    setContactData(prev => ({ ...prev, ...data }));
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnonymousChange = (checked) => {
    setIsAnonymous(checked === true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedOrg) {
      toast({
        title: "Organization Required",
        description: "Please select an organization to submit your complaint to.",
        variant: "destructive"
      });
      return;
    }

    if (!isAnonymous && (!contactData.name || !contactData.email)) {
      toast({
        title: "Contact Information Required",
        description: "Please provide your name and email address.",
        variant: "destructive"
      });
      return;
    }

    // Generate a ticket ID
    const generatedTicketId = `TC-${Date.now().toString().slice(-6)}`;
    setTicketId(generatedTicketId);
    setIsSubmitted(true);

    toast({
      title: "Complaint Submitted Successfully",
      description: `Your ticket ID is ${generatedTicketId}. Save this for tracking.`,
    });
  };

  const handleSubmitAnother = () => {
    setIsSubmitted(false);
    setFormData({
      title: "",
      category: "",
      priority: "medium",
      details: "",
    });
    setContactData({
      name: "",
      email: "",
      phone: "",
      contactPreference: "email",
    });
    setFiles([]);
    setSelectedOrg(null);
    setTicketId("");
    setIsAnonymous(false);
  };

  if (isSubmitted) {
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
            </div>
          </div>
        </nav>

        <SubmissionSuccess 
          ticketId={ticketId}
          selectedOrg={selectedOrg}
          formData={formData}
          onSubmitAnother={handleSubmitAnother}
          onShowLiveChat={() => setShowLiveChat(true)}
        />

        <LiveChat 
          isOpen={showLiveChat}
          onClose={() => setShowLiveChat(false)}
          ticketId={ticketId}
        />
        
        {!showLiveChat && (
          <Button
            className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
            onClick={() => setShowLiveChat(true)}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        )}
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
              <div className="w-8 h-8 bg-gradient-href-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
          <OrganizationSearch 
            selectedOrg={selectedOrg}
            onSelectOrg={setSelectedOrg}
          />

          <ComplaintForm 
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />

          <ContactInformation 
            contactData={contactData}
            onContactDataChange={handleContactDataChange}
            isAnonymous={isAnonymous}
            onAnonymousChange={handleAnonymousChange}
          />

          <FileUpload 
            files={files}
            onFileUpload={handleFileUpload}
            onRemoveFile={removeFile}
          />

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

      <LiveChat 
        isOpen={showLiveChat}
        onClose={() => setShowLiveChat(false)}
      />
      
      {!showLiveChat && (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
          onClick={() => setShowLiveChat(true)}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
      <ToastContainer />
    </div>
  );
};

export default ComplaintPage;
