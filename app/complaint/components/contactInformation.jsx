
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ContactInformation = ({ 
  contactData, 
  onContactDataChange, 
  isAnonymous, 
  onAnonymousChange 
}) => {
  return (
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
            onCheckedChange={onAnonymousChange}
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
                  value={contactData.name}
                  onChange={(e) => onContactDataChange({ name: e.target.value })}
                  required={!isAnonymous}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactData.email}
                  onChange={(e) => onContactDataChange({ email: e.target.value })}
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
                  value={contactData.phone}
                  onChange={(e) => onContactDataChange({ phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="contact-preference">Preferred Contact Method</Label>
                <Select 
                  value={contactData.contactPreference} 
                  onValueChange={(value) => onContactDataChange({ contactPreference: value })}
                >
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
  );
};

export default ContactInformation;
