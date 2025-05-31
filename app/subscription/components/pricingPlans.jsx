
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

// interface Plan {
//   name: string;
//   description: string;
//   price: { monthly: number; yearly: number };
//   agents: string;
//   popular: boolean;
//   features: string[];
// }

// interface PricingPlansProps {
//   billingCycle: 'monthly' | 'yearly';
// }

const PricingPlans = ({ billingCycle }) => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small support teams",
      price: { monthly: 29, yearly: 290 },
      agents: "1-10 agents",
      popular: false,
      features: [
        "Basic ticket management",
        "Email integration", 
        "Basic reporting",
        "Standard response times",
        "5GB storage",
        "Email support"
      ]
    },
    {
      name: "Professional",
      description: "For growing businesses",
      price: { monthly: 89, yearly: 890 },
      agents: "11-50 agents",
      popular: true,
      features: [
        "Everything in Starter",
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-600 text-white px-4 py-1">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
          )}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
            <CardDescription className="text-gray-600">{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                ${plan.price[billingCycle]}
              </span>
              <span className="text-gray-600">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{plan.agents}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              variant={plan.popular ? 'default' : 'outline'}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PricingPlans;
