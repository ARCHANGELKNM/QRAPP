'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@node_modules/next/navigation";

export default function PolicyPage() {
  const route = useRouter(); 
  return (
    <div className="w-full flex justify-center py-10 px-4">
      <Card className="max-w-3xl w-full shadow-xl border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            QRA Policy & Permissions Agreement
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[65vh] w-full  pr-4 text-sm leading-6">
            {/* --- INTRO --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">1. Introduction</h2>
              <p>
                This Privacy Policy and Permissions Agreement (“Agreement”)
                governs the use of the QRA Application (“the Application”). By
                accessing or using any feature within the Application, you
                acknowledge that you have read, understood, and agree to be
                bound by the terms outlined in this Agreement.
              </p>
            </section>

            {/* --- DEFINITIONS --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>“Application”</strong> refers to the QRA system
                  including the dashboard, QR code generator, QR scanner, and
                  related services.
                </li>
                <li>
                  <strong>“User”</strong> refers to any individual accessing or
                  interacting with the Application.
                </li>
                <li>
                  <strong>“Institution”</strong> refers to the organization
                  managing or implementing the Application.
                </li>
                <li>
                  <strong>“Data”</strong> refers to non-personal operational
                  information processed within the Application.
                </li>
              </ul>
            </section>

            {/* --- PURPOSE --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">
                3. Purpose of the Application
              </h2>
              <p>
                The Application serves as an institutional tool for generating
                QR codes, scanning QR codes, maintaining attendance logs, and
                supporting administrative functions. It is not intended for
                personal or recreational use.
              </p>
            </section>

            {/* --- PERMISSIONS --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">
                4. Permissions Required
              </h2>
              <p className="mb-3">
                The Application may require the following permissions to operate
                correctly:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Network Access</strong> — Used for server
                  communication, validation, and syncing.
                </li>
                <li>
                  <strong>Camera Access</strong> — Required exclusively for QR
                  code scanning. The Application does not record or store video.
                </li>
                <li>
                  <strong>Role-Based Access</strong> — Administrators,
                  Sub-admins, and Staff may have different levels of access.
                </li>
              </ul>
            </section>

            {/* --- DATA HANDLING --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">
                5. Data Handling & Storage
              </h2>
              <p>
                The Application processes only operational data and does not
                collect or store personal identifiers beyond staff-submitted
                entries. All data remains the property of the Institution.
              </p>
            </section>

            {/* --- SECURITY --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">
                6. Security Practices
              </h2>
              <p>
                The Application uses authentication, authorization, and secure
                access controls. Users must not bypass security, use false
                credentials, or attempt unauthorized modifications.
              </p>
            </section>

            {/* --- USER RESPONSIBILITY --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">
                7. User Responsibilities
              </h2>
              <p>
                Users must access tools only with proper authorization, keep
                institutional information confidential, and report issues to
                administrators. Reverse engineering or tampering is prohibited.
              </p>
            </section>

            {/* --- LIMITATIONS --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">
                8. Limitations of Liability
              </h2>
              <p>
                The Application is provided “as is.” The developers and
                Institution are not responsible for network failures, misuse, or
                operational disruptions.
              </p>
            </section>

            {/* --- UPDATES --- */}
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2">9. Policy Updates</h2>
              <p>
                Policy terms may be updated occasionally. Continued use of the
                Application implies acceptance of any revised terms.
              </p>
            </section>

            {/* --- ACCEPTANCE --- */}
            <section className="mb-10">
              <h2 className="font-semibold text-lg mb-2">
                10. Acceptance of Terms
              </h2>
              <p>
                By using the Generator, Scanner, or any administrative tools,
                you acknowledge your acceptance of this Agreement.
              </p>

              <div className="flex justify-end gap-3">
                <button
                 onClick={ () => route.push('/')}
                 className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    alert("Policy accepted!");
                    route.push("/Pages/Generator");
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Accept & Continue
                </button>
              </div>
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
