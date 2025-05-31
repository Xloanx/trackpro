'use client'
import { useState } from "react";
import TopNavigation from "./components/topNavigation";
// import SidebarNavigation from "@/components/subscription/sidebarNavigation";
import BillingToggle from "./components/billingToggle";
import PricingPlans from "./components/pricingPlans";
import FeatureComparison from "./components/featureComparison";
import AdditionalActions from "./components/additionalActions";

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation  />

      <div className="flex">
        {/* <SidebarNavigation sidebarOpen={sidebarOpen} /> */}

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 mb-8">Scale your support operations with the right plan for your team</p>
            
            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
          </div>

          <PricingPlans billingCycle={billingCycle} />

          <FeatureComparison />

          <AdditionalActions />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
