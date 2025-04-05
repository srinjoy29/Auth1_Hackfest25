"use client";
import { useState } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar";
import ComposeBtn from "@/components/DashBoardComponents/ComposeBtn";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { user } = useAuth();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  const handleMailClick = async (id) => {
    setSelectedEmail(null);
    setLoadingEmail(true);
    setError(null);
    setSummary("");

    try {
      const res = await axios.get(`http://localhost:8000/api/emails/${id}`, {
        withCredentials: true,
      });

      if (!res.data || !res.data.subject) {
        throw new Error("Invalid email data received");
      }

      setSelectedEmail(res.data);
    } catch (err) {
      console.error("Error loading email:", err);
      setError("Failed to load email. Please try again.");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleSummarize = async () => {
    if (!selectedEmail?.body) return;

    setSummarizing(true);
    setSummary("");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/summarize",
        { text: selectedEmail.body },
        { withCredentials: true }
      );
      setSummary(res.data.summary || "No summary returned.");
    } catch (err) {
      console.error("Error summarizing email:", err);
      setSummary("Failed to summarize email.");
    } finally {
      setSummarizing(false);
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
        {/* Header */}
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
  
        {/* Main Email Display */}
        <div className="p-6 w-full overflow-x-hidden">
          {loadingEmail && (
            <p className="text-sm text-muted-foreground">Loading email...</p>
          )}
  
          {error && <p className="text-sm text-red-500">{error}</p>}
  
          {!loadingEmail && !selectedEmail && !error && (
            <p className="text-sm text-muted-foreground">
              Select an email to view its content.
            </p>
          )}
  
          {!loadingEmail && selectedEmail && (
            <div className="space-y-6 max-w-full">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {selectedEmail.date}
                </div>
                <h1 className="text-xl font-semibold break-words">
                  {selectedEmail.subject}
                </h1>
                <p className="text-sm break-words">
                  <strong>From:</strong> {selectedEmail.from}
                </p>
                <p className="text-sm break-words">
                  <strong>To:</strong> {selectedEmail.to}
                </p>
                <div className="mt-4 text-sm whitespace-pre-wrap break-words w-full overflow-x-hidden">
                  {selectedEmail.body}
                </div>
              </div>
  
              {/* Summarization UI */}
              <div className="space-y-3 border border-border/40 backdrop-blur-md bg-white/5 p-4 rounded-xl shadow-sm">
                <button
                  onClick={handleSummarize}
                  disabled={summarizing}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-60 transition"
                >
                  {summarizing ? "Summarizing..." : "Summarize Email"}
                </button>
  
                <textarea
                  className="w-full p-4 border border-gray-300/40 rounded-lg text-sm resize-none min-h-[120px] bg-transparent text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 break-words overflow-x-hidden"
                  placeholder="Summary will appear here..."
                  value={summary}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
  
}
