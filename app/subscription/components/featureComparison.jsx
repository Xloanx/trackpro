
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const FeatureComparison = () => {
  const features = [
    { feature: 'Ticket Management', starter: true, professional: true, enterprise: true },
    { feature: 'Email Integration', starter: true, professional: true, enterprise: true },
    { feature: 'Basic Reporting', starter: true, professional: true, enterprise: true },
    { feature: 'AI Routing', starter: false, professional: true, enterprise: true },
    { feature: 'Multi-channel Support', starter: false, professional: true, enterprise: true },
    { feature: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
    { feature: 'Knowledge Base', starter: false, professional: true, enterprise: true },
    { feature: 'Custom Integrations', starter: false, professional: false, enterprise: true },
    { feature: 'White-label Options', starter: false, professional: false, enterprise: true },
    { feature: 'Dedicated Support', starter: false, professional: false, enterprise: true },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.starter ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.professional ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.enterprise ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureComparison;
