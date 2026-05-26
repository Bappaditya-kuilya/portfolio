"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Flower2 } from "lucide-react";

const initialFormState = { name: "", email: "", message: "" };
const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const githubUrl = "https://github.com/Bappaditya-kuilya";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formspreeEndpoint) {
      setSubmissionStatus("error");
      setStatusMessage("Contact form is not configured yet.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _replyto: formState.email,
          _subject: `Portfolio contact from ${formState.name}`,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        errors?: { message?: string }[];
      } | null;

      if (!response.ok) {
        throw new Error(result?.errors?.[0]?.message || "Message could not be sent right now.");
      }

      setFormState(initialFormState);
      setSubmissionStatus("success");
      setStatusMessage("Message sent. I will get back to you soon.");
    } catch (error) {
      setSubmissionStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Message could not be sent right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sakura/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-sakura/40" />
            <span className="font-inter text-xs text-sakura tracking-[0.3em] uppercase">
              Contact
            </span>
            <div className="h-px w-12 bg-sakura/40" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
            Let&apos;s Create <span className="text-gradient-sakura">Together</span>
          </h2>
          <p className="font-inter text-foreground-muted max-w-xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can build something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-sm p-8">
              <h3 className="font-cinzel text-2xl text-foreground mb-6">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-sakura/10 text-sakura">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-foreground-muted mb-1">Email</p>
                    <a
                      href="mailto:bappadityakuilya@gmail.com"
                      className="font-inter text-foreground hover:text-sakura transition-colors duration-300"
                    >
                      bappadityakuilya@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-sakura/10 text-sakura">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-foreground-muted mb-1">Location</p>
                    <p className="font-inter text-foreground">Kolkata, India</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-sakura/10 my-6" />

              {/* Social Links */}
              <div className="space-y-3">
                <p className="font-inter text-sm text-foreground-muted">Connect on</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: githubUrl, label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/in/bappaditya-kuilya", label: "LinkedIn" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-foreground/10 rounded-sm text-foreground-muted hover:text-sakura hover:border-sakura/30 transition-all duration-300"
                      whileHover={{ y: -3, boxShadow: "0 0 20px rgba(255,126,182,0.15)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="glass-card rounded-sm p-6 border-l-2 border-sakura/30">
              <p className="font-cormorant text-xl text-foreground-dim italic leading-relaxed">
                &ldquo;In the world of code, I don&apos;t chase perfection. I pursue clarity.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-sm p-8 space-y-6">
              <div>
                <label className="block font-inter text-xs text-foreground-muted tracking-wider uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-background-secondary/50 border border-foreground/10 rounded-sm px-4 py-3 font-inter text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-sakura/40 transition-colors duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block font-inter text-xs text-foreground-muted tracking-wider uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-background-secondary/50 border border-foreground/10 rounded-sm px-4 py-3 font-inter text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-sakura/40 transition-colors duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block font-inter text-xs text-foreground-muted tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full bg-background-secondary/50 border border-foreground/10 rounded-sm px-4 py-3 font-inter text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-sakura/40 transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-sakura/20 border border-sakura/40 rounded-sm text-sm font-inter text-foreground tracking-wider hover:bg-sakura/30 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,126,182,0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full"
                  />
                ) : submissionStatus === "success" ? (
                  <span className="text-sakura">Message Sent ✓</span>
                ) : (
                  <>
                    SEND MESSAGE
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {submissionStatus !== "idle" && (
                <p
                  role={submissionStatus === "error" ? "alert" : "status"}
                  className={`font-inter text-sm ${
                    submissionStatus === "error" ? "text-red-300" : "text-sakura"
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
