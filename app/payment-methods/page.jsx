'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  Menu,
  Bell,
  Settings,
  LogOut,
  CreditCard,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Shield
} from "lucide-react";
import Link from "next/link";

const PaymentMethodsPage = () => {

  const paymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiry: "12/2025",
      isDefault: true
    },
    {
      id: "pm_2", 
      type: "card",
      brand: "mastercard",
      last4: "5555",
      expiry: "08/2024",
      isDefault: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
              <p className="text-gray-600 mt-1">Manage your payment methods and billing information</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          {/* Security Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium text-blue-900">Secure Payments</h3>
                  <p className="text-sm text-blue-700">Your payment information is encrypted and secure. We never store your full card details.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>Manage cards and other payment methods for your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium capitalize">{method.brand}</span>
                          <span className="text-gray-600">•••• {method.last4}</span>
                          {method.isDefault && (
                            <Badge className="bg-green-100 text-green-800">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
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

          {/* Add New Payment Method Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Payment Method</CardTitle>
              <CardDescription>Add a new card or payment method to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                  <Input placeholder="123" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="default" className="rounded" />
                <label htmlFor="default" className="text-sm text-gray-700">Set as default payment method</label>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default PaymentMethodsPage;