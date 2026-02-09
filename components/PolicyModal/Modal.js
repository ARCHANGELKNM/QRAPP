"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PolicyModal({ open, onClose, profile }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Privacy & Permissions Policy</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* ACCESS */}
          <div>
            <h2 className="font-semibold">Your Access Level</h2>
            {profile?.error ? (
              <Badge variant="destructive">Unauthenticated</Badge>
            ) : (
              <div className="space-y-1 text-sm">
                <p>
                  <strong>User:</strong> {profile?.name} {profile?.surname}
                </p>
                <p>
                  <strong>Institution:</strong>{" "}
                  {profile?.institutionName || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {profile?.approved ? (
                    <Badge className="bg-green-600">Approved</Badge>
                  ) : (
                    <Badge variant="destructive">Pending</Badge>
                  )}
                </p>

                {profile?.role === "subadmin" && (
                  <Badge className="bg-blue-600">Subadmin</Badge>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* PRIVACY */}
          <div>
            <h2 className="font-semibold">Privacy Policy</h2>
            <ul className="list-disc ml-6 text-sm mt-2 space-y-1 text-muted-foreground">
              <li>Your name and surname</li>
              <li>Your institution data</li>
              <li>Your approval status</li>
              <li>Your generated QR code content</li>
            </ul>
          </div>

          <Separator />

          {/* PERMISSIONS */}
          <div>
            <h2 className="font-semibold">Permissions</h2>
            <ul className="list-disc ml-6 text-sm mt-2 space-y-1 text-muted-foreground">
              <li>Guests cannot use the system.</li>
              <li>Staff must be approved before generating QR codes.</li>
              <li>
                Subadmins may approve/revoke staff (same institution only).
              </li>
              <li>No cross-institution access.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
