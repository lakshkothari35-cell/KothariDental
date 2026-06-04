/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  title: string;
  degrees: string;
  specialties: string[];
  image: string;
  experience: string;
  schedule: string;
  satisfaction: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  iconName: string;
  duration?: string;
  benefit?: string;
  approxPrice?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  type: string;
  quote: string;
  rating: number;
  image: string;
}

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  isEmergency: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}
