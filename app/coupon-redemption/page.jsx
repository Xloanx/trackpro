'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  Menu,
  Bell,
  Settings,
  LogOut,
  Gift,
  Percent,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

const CouponRedemptionPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [validationStatus, setValidationStatus] = useState('none');


  const activeCoupons = [
    {
      id: "SAVE20",
      description: "20% off for 3 months",
      discount: "20%",
      validUntil: "2024-06-30",
      status: "active"
    },
    {
      id: "WELCOME50",
      description: "$50 off first month",
      discount: "$50",
      validUntil: "2024-05-15",
      status: "used"
    }
  ];

  const handleValidateCoupon = () => {
    // Mock validation logic
    if (couponCode === "SAVE30") {
      setValidationStatus('valid');
    } else if (couponCode === "EXPIRED") {
      setValidationStatus('expired');
    } else if (couponCode.length > 0) {
      setValidationStatus('invalid');
    } else {
      setValidationStatus('none');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coupon Redemption</h1>
            <p className="text-gray-600 mt-1">Apply discount codes and promotional offers to your subscription</p>
          </div>

          {/* Redeem New Coupon */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                Redeem Coupon Code
              </CardTitle>
              <CardDescription>Enter your promotional code to apply discounts to your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setValidationStatus('none');
                    }}
                    className="text-center font-mono text-lg"
                  />
                </div>
                <Button onClick={handleValidateCoupon} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Validate
                </Button>
              </div>

              {/* Validation Status */}
              {validationStatus === 'valid' && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Valid Coupon!</p>
                    <p className="text-sm text-green-700">30% off for the next 6 months</p>
                  </div>
                </div>
              )}

              {validationStatus === 'invalid' && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-red-900">Invalid Coupon</p>
                    <p className="text-sm text-red-700">This coupon code is not valid or does not exist</p>
                  </div>
                </div>
              )}

              {validationStatus === 'expired' && (
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <Clock className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-900">Expired Coupon</p>
                    <p className="text-sm text-yellow-700">This coupon code has expired</p>
                  </div>
                </div>
              )}

              {validationStatus === 'valid' && (
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Apply Coupon
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Active Coupons */}
          <Card>
            <CardHeader>
              <CardTitle>Your Active Coupons</CardTitle>
              <CardDescription>Currently applied discount codes and promotional offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCoupons.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Percent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium font-mono">{coupon.id}</span>
                          <Badge className={coupon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {coupon.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                        <p className="text-xs text-gray-500">Valid until: {coupon.validUntil}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{coupon.discount}</div>
                      {coupon.status === 'active' && (
                        <Button variant="outline" size="sm" className="mt-2">
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Promotions */}
          <Card>
            <CardHeader>
              <CardTitle>Available Promotions</CardTitle>
              <CardDescription>Special offers and discount codes you can use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                  <h3 className="font-medium text-blue-900">First Month Free</h3>
                  <p className="text-sm text-blue-700 mt-1">New customers get their first month free</p>
                  <code className="block mt-2 text-sm font-mono bg-white px-2 py-1 rounded">WELCOME2024</code>
                </div>
                <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <h3 className="font-medium text-green-900">Annual Discount</h3>
                  <p className="text-sm text-green-700 mt-1">Save 20% when you pay annually</p>
                  <code className="block mt-2 text-sm font-mono bg-white px-2 py-1 rounded">ANNUAL20</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default CouponRedemptionPage;