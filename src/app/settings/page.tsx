"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BugPlay, Languages, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      <div className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
        <h1 className="mb-6 inline-flex items-center gap-2 text-2xl font-bold">
          <Settings className="size-6" />
          Settings
        </h1>
        <Card className="mb-6 gap-2 p-2">
          <Button
            variant="ghost"
            size="lg"
            className="border-border w-full justify-start rounded-none border-b text-left"
          >
            <BugPlay className="h-4 w-4" />
            Report a Bug
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="border-border w-full justify-start rounded-none border-b text-left"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start rounded-none text-left"
          >
            <Languages className="h-4 w-4" />
            Change Language
          </Button>
        </Card>
        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
