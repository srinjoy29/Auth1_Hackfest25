"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ComposeBtn from "@/components/DashBoardComponents/ComposeBtn";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const { user } = useAuth();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const handleMailClick = async (id) => {
    setSelectedEmail(null);
    setLoadingEmail(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/emails/${id}`, {
        withCredentials: true,
      });
      setSelectedEmail(res.data);
    } catch (err) {
      console.error("Error loading email:", err);
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      }}
    >
      <AppSidebar onMailClick={handleMailClick} />

      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <ComposeBtn />
          </div>
        </header>

        {/* 📨 Display full email here */}
        <div className="p-6">
          {loadingEmail && <p>Loading email...</p>}
          {!loadingEmail && selectedEmail && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">{selectedEmail.date}</div>
              <h1 className="text-xl font-semibold">{selectedEmail.subject}</h1>
              <p className="text-sm">
                <strong>From:</strong> {selectedEmail.from}
              </p>
              <p className="text-sm">
                <strong>To:</strong> {selectedEmail.to}
              </p>
              <div className="mt-4 whitespace-pre-line text-sm">
                {selectedEmail.body}
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}