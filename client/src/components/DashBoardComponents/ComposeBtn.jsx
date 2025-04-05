import React from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

// Schema for validation
const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

const ComposeBtn = () => {
  const [sending, setSending] = React.useState(false);

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
        `${process.env.NEXT_PUBLIC_API_URL}/send`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Email sent successfully!");
      form.reset(); // Reset form after sending
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Compose</Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSendEmail)}
              className="space-y-5"
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