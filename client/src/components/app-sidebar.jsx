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

export function AppSidebar({ token }) {
  const [activeItem, setActiveItem] = React.useState(navItems[0]);
  const [mails, setMails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { setOpen } = useSidebar();

  const fetchEmails = async (label) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/emails?labelId=${label}`,
        {
          withCredentials: true, // send cookies
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
      {/* Icon Sidebar */}
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

      {/* Main content */}
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
              {loading && (
                <div className="p-4 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-[60px] w-full rounded-md" />
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
                  <a
                    href="#"
                    key={mail.id}
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                  >
                    <div className="flex w-full items-center gap-2">
                      <span>{mail.from}</span>
                      <span className="ml-auto text-xs">{mail.date}</span>
                    </div>
                    <span className="font-medium">{mail.subject}</span>
                    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                      {mail.snippet}
                    </span>
                  </a>
                ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
