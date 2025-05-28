
import Link from "next/link";
import { CheckCircle, ArrowLeft, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const SubmissionSuccess = ({ 
  ticketId, 
  selectedOrg, 
  formData, 
  onSubmitAnother,
  onShowLiveChat 
}) => {
  return (
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
              onClick={onSubmitAnother}
            >
              Submit Another Complaint
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onShowLiveChat}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionSuccess;
