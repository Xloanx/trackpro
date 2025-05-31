
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, CreditCard, Calendar } from "lucide-react";

// interface Plan {
//   name: string;
//   description: string;
//   price: { monthly: number; yearly: number };
//   agents: string;
//   popular: boolean;
//   features: string[];
// }

// interface PlanUpgradeProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   currentPlan?: string;
// }

const QAPlanUpgrade = ({ open, onOpenChange, currentPlan = "Professional" }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans= [
    {
      name: "Professional",
      description: "For growing businesses",
      price: { monthly: 89, yearly: 890 },
      agents: "11-50 agents",
      popular: true,
      features: [
        "Advanced AI routing",
        "Multi-channel support", 
        "Analytics & insights",
        "Knowledge base",
        "Priority support",
        "50GB storage",
        "Custom workflows"
      ]
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: { monthly: 199, yearly: 1990 },
      agents: "51+ agents",
      popular: false,
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Advanced automation",
        "White-label options",
        "Dedicated success manager",
        "Custom SLA management",
        "Unlimited storage",
        "Advanced security",
        "Phone support"
      ]
    }
  ];

  const handleUpgrade = (planName) => {
    console.log(`Upgrading to ${planName} plan with ${billingCycle} billing`);
    // Here you would typically integrate with payment processing
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Upgrade Your Plan</DialogTitle>
          <DialogDescription className="text-center">
            Choose the plan that best fits your organization's needs
          </DialogDescription>
        </DialogHeader>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 my-6">
          <span className={billingCycle === 'monthly' ? 'text-blue-600 font-medium' : 'text-gray-600'}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={billingCycle === 'yearly' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
            Yearly <Badge className="bg-green-100 text-green-800 ml-2">Save 17%</Badge>
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = plan.name === currentPlan;
            const isDowngrade = currentPlan === "Enterprise" && plan.name === "Professional";
            
            return (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''} ${isCurrentPlan ? 'opacity-60' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-green-600 text-white px-3 py-1">Current Plan</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.agents}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={isCurrentPlan}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {isCurrentPlan ? (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Current Plan
                      </>
                    ) : isDowngrade ? (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Downgrade
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your new plan will be activated immediately</li>
            <li>• You'll be prorated for the current billing period</li>
            <li>• All new features will be available instantly</li>
            <li>• Your next billing date remains the same</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QAPlanUpgrade;