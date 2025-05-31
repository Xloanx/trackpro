
import { Button } from "@/components/ui/button";
import { CreditCard, Gift } from "lucide-react";
import Link from "next/link";

const AdditionalActions = () => {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      <Link href="/payment-methods">
        <Button variant="outline">
          <CreditCard className="w-4 h-4 mr-2" />
          Payment Methods
        </Button>
      </Link>
      <Link href="/coupon-redemption">
        <Button variant="outline">
          <Gift className="w-4 h-4 mr-2" />
          Redeem Coupon
        </Button>
      </Link>
    </div>
  );
};

export default AdditionalActions;
