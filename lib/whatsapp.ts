import { siteConfig } from "@/data/site";

function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildAcceptUrl(): string {
  return whatsappUrl(siteConfig.whatsappAcceptMessage);
}

export function buildDeclineUrl(reason: string): string {
  const message = `${siteConfig.whatsappDeclinePrefix}\n\nReason: ${reason}\n\n${siteConfig.whatsappDeclineSuffix}`;
  return whatsappUrl(message);
}
