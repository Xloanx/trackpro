
import { Badge } from "@/components/ui/badge";

// interface BillingToggleProps {
//   billingCycle: 'monthly' | 'yearly';
//   setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
// }

const BillingToggle = ({ billingCycle, setBillingCycle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
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
  );
};

export default BillingToggle;
