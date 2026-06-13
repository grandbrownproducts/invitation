// Central configuration for the wedding invitation site.
// Edit the values here to update content across the whole site.

export const siteConfig = {
  groomName: "විහඟ",
  brideName: "සඳලි",
  coupleNamesEn: "Vihanga & Sandali",

  groomParents: "සරත් ජයවර්ධන මහතාගේ සහ එම මැතිණියගේ ආදරණීය පුතු",
  brideParents: "ජගත් විජේසූරිය සහ එම මැතිණියගේ ආදරණීය දියණිය",

  weddingDateISO: "2026-08-29T11:00:00+05:30",
  weddingDateDisplay: "2026 අගෝස්තු මස 29 වන දින",
  weddingTimeDisplay: "පෙ.ව. 11.00 සිට",

  venueName: "කොළඹ ගෝල්ෆේස් හෝටලය",
  venueNameEn: "Galle Face Hotel, Colombo",
  venueAddress: "2 Galle Rd, Colombo 00300, Sri Lanka",
  venuePhone: "+94770474617",
  venuePhoneDisplay: "+94 77 047 4617",
  venueMapsQuery: "Galle Face Hotel, Colombo",
  venueMapsUrl: "https://maps.google.com/?q=Galle+Face+Hotel+Colombo",

  // WhatsApp number that RSVP messages should be sent to (international format, no +/spaces)
  whatsappNumber: "94770474617",

  invitationLine1: "ශ්‍රී සුබ මංගලම්!",
  invitationLine2: "ආරාධනාවයි!",
  invitationClosing:
    "සමග අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන් ඔබට කෙරෙන ගෞරවණීය ඇරයුමයි",

  whatsappAcceptMessage:
    "ආරාධනයට බොහෝම ස්තුතියි. එය සතුටින් පිළිගනිමි. ඔබ දෙපළට අපගේ හදපිරි සුබ පැතුම්!",
  whatsappDeclinePrefix:
    "Thank you for the invitation. Unfortunately, I am unable to attend the wedding.",
  whatsappDeclineSuffix: "Best wishes to both of you and your families.",
} as const;

export const declineReasons = [
  "විදේශගතව සිටීම",
  "රැකියා කටයුතු හේතුවෙන්",
  "සෞඛ්‍ය හේතු මත",
  "වෙනත් හේතුවක්",
] as const;

export const declineOtherReason = "වෙනත් හේතුවක්";
