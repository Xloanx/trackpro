
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings, BarChart3, HelpCircle } from "lucide-react";

// interface OrganizationQuickActionsProps {
//   onCreateOrganization?: () => void;
//   onViewAnalytics?: () => void;
//   onOpenSettings?: () => void;
//   onGetHelp?: () => void;
// }

export const QAOrganizationQuickActions = ({
  onCreateOrganization,
  onViewAnalytics,
  onOpenSettings,
  onGetHelp
}) => {
  const actions = [
    {
      title: "Create Organization",
      description: "Set up a new organization to manage",
      icon: <Plus className="w-5 h-5 text-blue-600" />,
      onClick: onCreateOrganization,
      variant: "default" 
    },
    {
      title: "View Analytics",
      description: "See performance across all organizations",
      icon: <BarChart3 className="w-5 h-5 text-green-600" />,
      onClick: onViewAnalytics,
      variant: "outline" 
    },
    {
      title: "Settings",
      description: "Manage your account preferences",
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      onClick: onOpenSettings,
      variant: "outline" 
    },
    {
      title: "Get Help",
      description: "Access support and documentation",
      icon: <HelpCircle className="w-5 h-5 text-purple-600" />,
      onClick: onGetHelp,
      variant: "outline"
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center space-y-2 text-center"
              onClick={action.onClick}
            >
              {action.icon}
              <div>
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs opacity-70">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
