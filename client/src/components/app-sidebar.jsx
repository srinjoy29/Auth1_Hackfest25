"use client";

import * as React from "react";
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const navItems = [
  { title: "Inbox", label: "INBOX", icon: Inbox },
  { title: "Drafts", label: "DRAFT", icon: File },
  { title: "Sent", label: "SENT", icon: Send },
  { title: "Junk", label: "SPAM", icon: ArchiveX },
  { title: "Trash", label: "TRASH", icon: Trash2 },
];

export function AppSidebar({ token,onMailClick }) {
  const [activeItem, setActiveItem] = React.useState(navItems[0]);
  const [mails, setMails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { setOpen } = useSidebar();
  console.log(mails);

  const fetchEmails = async (label) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/emails?labelId=${label}`,
        {
          withCredentials: true, // Ensure session cookie is sent
        }
      );
      setMails(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEmails(activeItem.label);
  }, [activeItem]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      {/* Sidebar Icons */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{ children: item.title }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavUser
            user={{
              name: "shadcn",
              email: "m@example.com",
              avatar: "/avatars/shadcn.jpg",
            }}
          />
        </SidebarFooter>
      </Sidebar>

      {/* Main Panel */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {loading && (
                  <div className="p-4 space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <Skeleton key={i} className="h-25 w-full rounded-md" />
                    ))}
                  </div>
                )}

                {error && (
                  <div className="p-4 text-destructive text-sm">
                    ⚠️ Error: {error}
                  </div>
                )}

                {!loading && !error && mails.length === 0 && (
                  <div className="p-4 text-muted-foreground text-sm">
                    No emails found for "{activeItem.title}".
                  </div>
                )}

                {!loading &&
                  !error &&
                  mails.map((mail) => (
                    <SidebarMenuItem key={mail.id} className="p-1.5">
                      <SidebarMenuButton
                        onClick={() => onMailClick(mail.id)} // <== Trigger click
                        className="h-25 flex flex-col items-start"
                      >
                        <div className="text-1 line-clamp-1">{mail.from}</div>
                        <div className="text-[.7rem]">{mail.date}</div>
                        <div className="font-medium">{mail.subject}</div>
                        <p className="line-clamp-2 text-xs">{mail.snippet}</p>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
