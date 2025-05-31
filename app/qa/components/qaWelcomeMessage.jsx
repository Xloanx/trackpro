
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, TrendingUp, Users } from "lucide-react";

// interface WelcomeMessageProps {
//   userName?: string;
//   isFirstTime?: boolean;
//   organizationCount: number;
// }

export const QAWelcomeMessage = ({ 
  userName = "there", 
  isFirstTime = false, 
  organizationCount 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      title: "Track Performance",
      description: "Monitor health scores and growth metrics for each organization"
    },
    {
      icon: <Users className="w-5 h-5 text-green-600" />,
      title: "Manage Teams",
      description: "Efficiently coordinate team members across multiple organizations"
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
      title: "Quick Switch",
      description: "Use the organization switcher in the dashboard to move between accounts"
    }
  ];

  useEffect(() => {
    if (!isFirstTime) return;
    
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFirstTime, tips.length]);

  if (!isVisible) return null;

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Welcome back, {userName}! 👋
            </h2>
            <p className="text-gray-600 mb-4">
              {isFirstTime 
                ? `You're managing ${organizationCount} organization${organizationCount > 1 ? 's' : ''}. Here are some tips to get you started:`
                : `Ready to dive into your ${organizationCount} organization${organizationCount > 1 ? 's' : ''}? Select one below to continue.`
              }
            </p>
            
            {isFirstTime && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                {tips[currentTip].icon}
                <div>
                  <h3 className="font-medium text-sm text-gray-900">
                    {tips[currentTip].title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {tips[currentTip].description}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
