"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // update path to your AuthContext
import axios from "axios";

const SendEmailPage = () => {
  const { user } = useAuth(); // get logged in user
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setResponse("");

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/send`,
        form,
        {
          withCredentials: true, // required for cookie-based JWT
        }
      );
      setResponse(data.message || "Email sent successfully!");
    } catch (error) {
      setResponse(error.response?.data?.message || "Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Send Email from Your Gmail</h2>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder="Recipient Email"
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={6}
            required
            className="w-full border px-4 py-2 rounded"
          ></textarea>

          <button
            type="submit"
            disabled={sending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
        </form>
      ) : (
        <p>Please log in to send emails.</p>
      )}
      {response && (
        <div className="mt-4 text-sm text-gray-700">{response}</div>
      )}
    </div>
  );
};

export default SendEmailPage;