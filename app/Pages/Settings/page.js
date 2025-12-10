// app/settings/page.js
"use client";

import { useState } from "react";
import InstitutionSelector from "@/components/Settings Page Components/Institution/page"; // Import Institution Selector component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import card and subcomponents for the content wrapper

// Define navigation items with an ID and Title
const navItems = [
  { id: "profile", title: "My Profile" },
  { id: "institution", title: "Institution Selection" },
  { id: "billing", title: "Subscription & Billing" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("institution"); // Default to Institution settings

  // Helper function to render the correct component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "institution":
        return <InstitutionSelector />;
      case "profile":
        return (
          <PlaceholderCard
            title="Profile Details"
            content="Profile settings UI goes here."
          />
        );
      case "billing":
        return (
          <PlaceholderCard
            title="Subscription Plan"
            content="Billing settings UI goes here."
          />
        );
      default:
        return null;
    }
  };

  // Placeholder component for future tabs (you can replace these files later)
  function PlaceholderCard({ title, content }) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl mt-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Main Layout Container: Flexbox with a fixed-width sidebar */}
      <div className="flex gap-8">
        {/* Left Column (Sidebar/Nav List) */}
        <div className="flex flex-col w-64 space-y-2">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              // Apply styling typical of a Windows settings list item
              className={`
                p-3 rounded-lg cursor-pointer transition-colors 
                ${
                  activeTab === item.id
                    ? "bg-blue-500 text-white shadow-md" // Active state
                    : "text-gray-700 hover:bg-gray-100" // Inactive state
                }
              `}
            >
              {item.title}
            </div>
          ))}
        </div>

        {/* Right Column (Content Area) */}
        <div className="flex-1 min-w-0">{renderContent()}</div>
      </div>
    </div>
  );
}
