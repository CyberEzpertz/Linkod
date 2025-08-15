"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LogOut,
  Languages,
  BugPlay,
  SunMoon,
  Moon,
  Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/header";

export default function SettingsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add your dark mode implementation logic here
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
            >
              <Languages className="mr-2 h-4 w-4" />
              Change Language
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
            >
              <BugPlay className="mr-2 h-4 w-4" />
              Report a Bug
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Mode
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}