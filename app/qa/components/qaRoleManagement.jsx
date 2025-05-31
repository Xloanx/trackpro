
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Users,
  Settings
} from "lucide-react";

// interface Role {
//   id: string;
//   name: string;
//   description: string;
//   permissions: string[];
//   memberCount: number;
//   isDefault: boolean;
// }

// interface RoleManagementProps {
//   onRoleCreated?: (role: Role) => void;
// }

export const RoleManagement = ({ onRoleCreated }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] 
  });

  const [roles, setRoles] = useState([
    {
      id: "role-001",
      name: "Support Manager",
      description: "Manages support team and has access to all tickets",
      permissions: ["view_all_tickets", "assign_tickets", "manage_team", "view_reports"],
      memberCount: 2,
      isDefault: false
    },
    {
      id: "role-002", 
      name: "Senior Support Specialist",
      description: "Experienced support agent with elevated permissions",
      permissions: ["view_assigned_tickets", "escalate_tickets", "mentor_junior"],
      memberCount: 3,
      isDefault: false
    },
    {
      id: "role-003",
      name: "Support Specialist", 
      description: "Standard support agent role",
      permissions: ["view_assigned_tickets", "respond_to_tickets"],
      memberCount: 8,
      isDefault: true
    },
    {
      id: "role-004",
      name: "Junior Support Specialist",
      description: "Entry-level support role with basic permissions",
      permissions: ["view_assigned_tickets"],
      memberCount: 4,
      isDefault: false
    }
  ]);

  const availablePermissions = [
    { id: "view_all_tickets", name: "View All Tickets", description: "Can view all tickets in organization" },
    { id: "view_assigned_tickets", name: "View Assigned Tickets", description: "Can view only assigned tickets" },
    { id: "assign_tickets", name: "Assign Tickets", description: "Can assign tickets to team members" },
    { id: "escalate_tickets", name: "Escalate Tickets", description: "Can escalate tickets to higher levels" },
    { id: "manage_team", name: "Manage Team", description: "Can add/remove team members" },
    { id: "view_reports", name: "View Reports", description: "Can access reporting dashboard" },
    { id: "respond_to_tickets", name: "Respond to Tickets", description: "Can respond to customer tickets" },
    { id: "mentor_junior", name: "Mentor Junior Staff", description: "Can provide guidance to junior team members" }
  ];

  const handleAddRole = () => {
    if (!newRole.name.trim()) return;
    
    const role = {
      id: `role-${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      memberCount: 0,
      isDefault: false
    };
    
    setRoles([...roles, role]);
    onRoleCreated?.(role);
    setNewRole({ name: "", description: "", permissions: [] });
    setShowAddForm(false);
  };

  const togglePermission = (permissionId) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Role Management</h3>
          <p className="text-sm text-gray-600">Define roles and permissions for your organization</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Role</CardTitle>
            <CardDescription>Define a new role with specific permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                placeholder="Enter role name"
              />
            </div>
            <div>
              <Label htmlFor="roleDescription">Description</Label>
              <Textarea
                id="roleDescription"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                placeholder="Describe this role's responsibilities"
              />
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {availablePermissions.map((permission) => (
                  <div 
                    key={permission.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      newRole.permissions.includes(permission.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => togglePermission(permission.id)}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`w-4 h-4 mt-0.5 rounded border-2 ${
                        newRole.permissions.includes(permission.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {newRole.permissions.includes(permission.id) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{permission.name}</h4>
                        <p className="text-xs text-gray-600">{permission.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRole}>
                Create Role
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium">{role.name}</h4>
                    {role.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Badge variant="outline">
                      <Users className="w-3 h-3 mr-1" />
                      {role.memberCount} members
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permissionId) => {
                      const permission = availablePermissions.find(p => p.id === permissionId);
                      return permission ? (
                        <Badge key={permissionId} variant="outline" className="text-xs">
                          {permission.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {!role.isDefault && (
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
