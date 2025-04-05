import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle, // ✅ Import DialogTitle
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// ✅ Schema for validation
const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

const ComposeBtn = () => {
  const [sending, setSending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      to: "",
      subject: "",
      body: "",
    },
  });

  const handleSendEmail = async (data) => {
    setSending(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/send",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Email sent successfully!");
      form.reset();
      setPrompt("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!prompt) {
      toast.warning("Please enter a prompt.");
      return;
    }

    setGenerating(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/openai/generate-email",
        { prompt },
        { withCredentials: true }
      );
      form.setValue("body", res.data?.message || "");
    } catch (err) {
      toast.error("Failed to generate email.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Compose</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogTitle>Compose Email</DialogTitle> {/* ✅ Required for accessibility */}
        <div className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSendEmail)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Recipient's email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>AI Prompt (Optional)</FormLabel>
                <Textarea
                  placeholder="Describe what the email should be about..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={generating}
                  className="w-full"
                  variant="outline"
                >
                  {generating ? "Generating..." : "Generate with AI"}
                </Button>
              </div>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message..."
                        {...field}
                        className="min-h-60 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeBtn;
