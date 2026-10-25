export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ClinicInfo {
  address: string;
  phone: string;
  email: string;
  hours: string[];
}
