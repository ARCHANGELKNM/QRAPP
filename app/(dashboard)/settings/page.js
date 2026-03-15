"use client";
import { react } from "react";
import LoadingAnimation from "@components/LoadingAnimation/Loading";
import { useAccessControl } from "@/hooks/useAccessControl";
import AccessRequestor from "@components/Settings/RequestAccess/RequestAccess";
import { ErrorCreateAccount } from "@components/Errors/Create Account/Error";
import PolicyCard from "@components/Settings/PolicyCard/Card";
import OtherSettings from "@components/Settings/Coming Soon/Components";
import Account from "@components/Settings/Account/Account";

export default function SettingsPage() {
  const access = useAccessControl();
  if (access.state === "loading") return <LoadingAnimation />;
  if (access.state === "unauthenticated") return <ErrorCreateAccount />;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      {/* User's Account */}

      <Account />

      {/* Institution Selector Component */}
      <AccessRequestor />

      {/* Privacy Policy */}
      <PolicyCard />

      {/* Other Actions */}
      <OtherSettings />
    </div>
  );
}
