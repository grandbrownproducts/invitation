export type GuestSide = "groom" | "bride";

export type InvitationStatus = "not_invited" | "invited";

export type ResponseStatus = "pending" | "accepted" | "rejected";

export interface Guest {
  id: string;
  name: string;
  phoneNumber: string;
  side: GuestSide;
  invitationStatus: InvitationStatus;
  responseStatus: ResponseStatus;
  invitedAt?: string;
  respondedAt?: string;
  notes?: string;
  createdAt: string;
}

export type NewGuestInput = {
  name: string;
  phoneNumber: string;
  side: GuestSide;
  notes?: string;
};

export type UpdateGuestInput = Partial<NewGuestInput>;

export interface GuestStats {
  total: number;
  groomSide: number;
  brideSide: number;
  invited: number;
  accepted: number;
  rejected: number;
  pending: number;
}

export interface WeddingSettings {
  groomName: string;
  brideName: string;
  weddingDateISO: string;
  weddingDateDisplay: string;
  venueName: string;
  venueAddress: string;
  websiteUrl: string;
  whatsappInvitationTemplate: string;
}
