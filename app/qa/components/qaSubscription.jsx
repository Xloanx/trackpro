
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard,
  Calendar,
  TrendingUp,
  Users,
  TicketIcon,
  BarChart3,
  Star,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import QAPlanUpgrade from "./qaPlanUpgrade";

const QaSubscriptionPage = ({onPaymentMethods, onCouponRedemption}) => {
  const [currentPlan] = useState({
    name: "Professional",
    price: 89,
    validity: "2024-12-31",
    features: ["AI Routing", "Analytics", "Multi-channel Support"],
    agentLimit: 50,
    currentAgents: 24
  });
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  // Mock usage data
  const usageData = [
    { month: 'Jan', tickets: 120, satisfaction: 85, responseTime: 4.2 },
    { month: 'Feb', tickets: 145, satisfaction: 87, responseTime: 3.8 },
    { month: 'Mar', tickets: 160, satisfaction: 89, responseTime: 3.5 },
    { month: 'Apr', tickets: 180, satisfaction: 91, responseTime: 3.2 },
    { month: 'May', tickets: 195, satisfaction: 88, responseTime: 3.8 },
    { month: 'Jun', tickets: 210, satisfaction: 92, responseTime: 2.9 },
  ];

  const utilizationData = [
    { metric: 'Ticket Volume', current: 75, capacity: 100, percentage: 75 },
    { metric: 'Agent Utilization', current: 24, capacity: 50, percentage: 48 },
    { metric: 'Storage Used', current: 32, capacity: 50, percentage: 64 },
    { metric: 'API Calls', current: 8500, capacity: 10000, percentage: 85 },
  ];

  const daysUntilRenewal = Math.ceil((new Date('2024-12-31').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your organization's subscription plan</p>
        </div>

        <div className="space-y-6">
          {/* Current Plan Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Current Subscription
                    </CardTitle>
                    <CardDescription>Your active plan and billing information</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{currentPlan.name} Plan</h3>
                    <p className="text-blue-700">${currentPlan.price}/month</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentPlan.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">${currentPlan.price}</div>
                    <div className="text-sm text-blue-600">per month</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Valid Until</span>
                    </div>
                    <div className="font-medium">{currentPlan.validity}</div>
                    <div className="text-xs text-gray-500">{daysUntilRenewal} days remaining</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Agent Usage</span>
                    </div>
                    <div className="font-medium">{currentPlan.currentAgents}/{currentPlan.agentLimit}</div>
                    <div className="text-xs text-gray-500">{((currentPlan.currentAgents / currentPlan.agentLimit) * 100).toFixed(0)}% utilized</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setUpgradeDialogOpen(true)}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
                {/* <Link href="/payment-methods"> */}
                  <Button variant="outline" className="w-full"
                          onClick={onPaymentMethods} 
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                {/* </Link> */}
                {/* <Link href="/coupon-redemption"> */}
                  <Button variant="outline" className="w-full"
                          onClick={onCouponRedemption}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Redeem Coupon
                  </Button>
                {/* </Link> */}
              </CardContent>
            </Card>
          </div>

          {/* Platform Utilization Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance & Usage</CardTitle>
              <CardDescription>How well your organization is using TrackPro features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Usage Trend */}
                <div>
                  <h4 className="font-medium mb-4">Monthly Performance Trends</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="tickets" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="satisfaction" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Resource Utilization */}
                <div>
                  <h4 className="font-medium mb-4">Resource Utilization</h4>
                  <div className="space-y-4">
                    {utilizationData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.metric}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              item.percentage >= 80 ? 'bg-red-500' : 
                              item.percentage >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {typeof item.current === 'number' && item.current > 1000 
                            ? `${item.current.toLocaleString()}/${item.capacity.toLocaleString()}`
                            : `${item.current}/${item.capacity}`
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tickets This Month</p>
                    <p className="text-3xl font-bold text-blue-600">210</p>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                  <TicketIcon className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                    <p className="text-3xl font-bold text-green-600">2.9h</p>
                    <p className="text-xs text-green-600">-24% improvement</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                    <p className="text-3xl font-bold text-yellow-600">92%</p>
                    <p className="text-xs text-green-600">+4% increase</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
            {/* Plan Upgrade Dialog */}
      <QAPlanUpgrade 
        open={upgradeDialogOpen} 
        onOpenChange={setUpgradeDialogOpen}
        currentPlan={currentPlan.name}
      />
    </div>
  );
};

export default QaSubscriptionPage;
