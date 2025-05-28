'use client'
import { useState } from "react";
import { Search, MapPin, Factory } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const OrganizationSearch = ({ selectedOrg, onSelectOrg }) => {
  const [searchQuery, setSearchQuery] = useState(selectedOrg?.name || "");
  const [showOrgResults, setShowOrgResults] = useState(false);

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

  const handleSearch = (value) => {
    setSearchQuery(value);
    setShowOrgResults(value.length > 0);
  };

  const selectOrganization = (org) => {
    onSelectOrg(org);
    setSearchQuery(org.name);
    setShowOrgResults(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Factory className="w-5 h-5 mr-2" />
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
  );
};

export default OrganizationSearch;
