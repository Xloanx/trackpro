
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building, ChevronDown } from "lucide-react";

// interface Organization {
//   id: string;
//   name: string;
//   type: string;
//   status: 'active' | 'inactive' | 'suspended';
//   memberCount: number;
//   ticketCount: number;
// }

// interface OrganizationSwitcherProps {
//   currentOrganization?: Organization;
//   onOrganizationChange: (organizationId: string) => void;
// }

export const QAOrganizationSwitcher = ({ 
  currentOrganization, 
  onOrganizationChange 
}) => {
  // Mock data - will be replaced with real data from backend
  const organizations = [
    {
      id: "org-001",
      name: "TechCorp Solutions",
      type: "Technology",
      status: "active",
      memberCount: 25,
      ticketCount: 156
    },
    {
      id: "org-002", 
      name: "RetailMax Inc",
      type: "Retail",
      status: "active",
      memberCount: 18,
      ticketCount: 89
    },
    {
      id: "org-003",
      name: "HealthFirst Medical",
      type: "Healthcare", 
      status: "active",
      memberCount: 32,
      ticketCount: 204
    },
    {
      id: "org-004",
      name: "EduLearn Academy",
      type: "Education",
      status: "inactive",
      memberCount: 12,
      ticketCount: 45
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Building className="w-5 h-5 text-gray-600" />
      <Select 
        value={currentOrganization?.id} 
        onValueChange={onOrganizationChange}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select organization">
            {currentOrganization && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">{currentOrganization.name}</span>
                <Badge className={getStatusColor(currentOrganization.status)}>
                  {currentOrganization.status}
                </Badge>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              <div className="flex flex-col space-y-1 py-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{org.name}</span>
                  <Badge className={getStatusColor(org.status)}>
                    {org.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {org.memberCount} members • {org.ticketCount} tickets • {org.type}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
