
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  CreditCard,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  Building,
  MoreHorizontal,
  Eye,
  Edit,
  Download
} from "lucide-react";

const AppSubscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const subscriptions = [
    {
      id: "SUB-001",
      organization: "TechCorp Solutions",
      plan: "Enterprise",
      status: "active",
      amount: "$2,400",
      billing: "monthly",
      nextBilling: "2024-04-15",
      created: "2024-01-15",
      users: 24,
      features: ["AI Routing", "Analytics", "API Access"]
    },
    {
      id: "SUB-002", 
      organization: "RetailMax Inc",
      plan: "Professional",
      status: "active",
      amount: "$1,200",
      billing: "monthly",
      nextBilling: "2024-04-20",
      created: "2024-02-20",
      users: 12,
      features: ["AI Routing", "Analytics"]
    },
    {
      id: "SUB-003",
      organization: "DataFlow Corp",
      plan: "Basic", 
      status: "trial",
      amount: "$0",
      billing: "trial",
      nextBilling: "2024-04-10",
      created: "2024-03-10",
      users: 8,
      features: ["Basic Support"]
    },
    {
      id: "SUB-004",
      organization: "ServiceHub Ltd",
      plan: "Professional",
      status: "past_due",
      amount: "$1,200",
      billing: "monthly", 
      nextBilling: "2024-03-28",
      created: "2024-01-28",
      users: 18,
      features: ["AI Routing", "Analytics"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Professional': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600 mt-1">Monitor billing and subscription management</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,800</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">42</div>
            <p className="text-xs text-muted-foreground">93% retention rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Accounts</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Converting this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+15%</div>
            <p className="text-xs text-muted-foreground">Month over month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subscriptions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>Manage billing and subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-gray-900">{sub.organization}</span>
                    <Badge className={getPlanColor(sub.plan)}>{sub.plan}</Badge>
                    <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {sub.amount}/{sub.billing}
                    </span>
                    <span>•</span>
                    <span>{sub.users} users</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Next billing: {sub.nextBilling}
                    </span>
                    <span>•</span>
                    <span>{sub.features.join(", ")}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppSubscriptionsPage;
