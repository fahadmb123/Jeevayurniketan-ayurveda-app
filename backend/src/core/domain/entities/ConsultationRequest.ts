import { DomainException } from '../exceptions/DomainException.js';

export type ConsultationStatus = 'pending' | 'accepted' | 'rejected';
export type ConsultationMode = 'In-Person' | 'Video Call' | 'Phone';
export type PatientGender = 'Male' | 'Female' | 'Other';

export interface ConsultationRequestProps {
  id: string;
  patientName: string;
  age: number;
  gender: PatientGender;
  phone: string;
  email: string;
  city?: string;
  service: string;
  mode: ConsultationMode;
  preferredDate: string;
  preferredTimeSlot: string;
  primaryConcern: string;
  symptoms: string[];
  notes?: string;
  requestedAt: string;
  status: ConsultationStatus;
  rejectionReason?: string;
  acceptedAt?: string;
}

export class ConsultationRequest {
  private readonly props: ConsultationRequestProps;

  constructor(props: ConsultationRequestProps) {
    this.validate(props);
    this.props = { ...props };
  }

  private validate(props: ConsultationRequestProps): void {
    if (!props.id || props.id.trim().length === 0) {
      throw new DomainException('Consultation request ID cannot be empty');
    }
    if (!props.patientName || props.patientName.trim().length === 0) {
      throw new DomainException('Patient name cannot be empty');
    }
    if (props.age < 0 || props.age > 130) {
      throw new DomainException('Invalid patient age');
    }
  }

  public get id(): string {
    return this.props.id;
  }

  public get patientName(): string {
    return this.props.patientName;
  }

  public get age(): number {
    return this.props.age;
  }

  public get gender(): PatientGender {
    return this.props.gender;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get email(): string {
    return this.props.email;
  }

  public get city(): string | undefined {
    return this.props.city;
  }

  public get service(): string {
    return this.props.service;
  }

  public get mode(): ConsultationMode {
    return this.props.mode;
  }

  public get preferredDate(): string {
    return this.props.preferredDate;
  }

  public get preferredTimeSlot(): string {
    return this.props.preferredTimeSlot;
  }

  public get primaryConcern(): string {
    return this.props.primaryConcern;
  }

  public get symptoms(): string[] {
    return [...this.props.symptoms];
  }

  public get notes(): string | undefined {
    return this.props.notes;
  }

  public get requestedAt(): string {
    return this.props.requestedAt;
  }

  public get status(): ConsultationStatus {
    return this.props.status;
  }

  public get rejectionReason(): string | undefined {
    return this.props.rejectionReason;
  }

  public get acceptedAt(): string | undefined {
    return this.props.acceptedAt;
  }

  public accept(): void {
    if (this.props.status !== 'pending') {
      throw new DomainException(`Cannot accept a consultation request that is already ${this.props.status}`);
    }
    this.props.status = 'accepted';
    this.props.acceptedAt = new Date().toISOString();
  }

  public reject(reason: string): void {
    if (this.props.status !== 'pending') {
      throw new DomainException(`Cannot reject a consultation request that is already ${this.props.status}`);
    }
    if (!reason || reason.trim().length === 0) {
      throw new DomainException('Rejection reason is required');
    }
    this.props.status = 'rejected';
    this.props.rejectionReason = reason.trim();
  }

  public toJSON(): ConsultationRequestProps {
    return {
      id: this.props.id,
      patientName: this.props.patientName,
      age: this.props.age,
      gender: this.props.gender,
      phone: this.props.phone,
      email: this.props.email,
      city: this.props.city,
      service: this.props.service,
      mode: this.props.mode,
      preferredDate: this.props.preferredDate,
      preferredTimeSlot: this.props.preferredTimeSlot,
      primaryConcern: this.props.primaryConcern,
      symptoms: [...this.props.symptoms],
      notes: this.props.notes,
      requestedAt: this.props.requestedAt,
      status: this.props.status,
      rejectionReason: this.props.rejectionReason,
      acceptedAt: this.props.acceptedAt,
    };
  }
}
