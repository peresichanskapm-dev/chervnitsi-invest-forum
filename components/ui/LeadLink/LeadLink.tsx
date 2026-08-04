"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { setLeadSource } from "@/lib/leadSource";

type LeadLinkProps = {
  href: string;
  formSource: string;
  ticketTitle?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

/** keeps CTA sections server-rendered — only the click handler needs to run on the client */
export function LeadLink({ href, formSource, ticketTitle, children, ...rest }: LeadLinkProps) {
  return (
    <a href={href} onClick={() => setLeadSource({ formSource, ticketTitle })} {...rest}>
      {children}
    </a>
  );
}
