/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Service, Testimonial } from "./types";

export const SERVICES: Service[] = [
  {
    id: "clean",
    name: "Teeth Cleaning",
    description: "Advanced prophylaxis treatment focusing on plaque removal and gum health optimization using gentle airflow technology.",
    iconName: "Droplets",
    duration: "45 - 60 mins",
    benefit: "Prevents Periodontal Disease",
    approxPrice: "$120 - $250"
  },
  {
    id: "root-canal",
    name: "Root Canal",
    description: "Painless endodontic therapy utilizing microscopic precision to save damaged teeth and eliminate underlying infections.",
    iconName: "Shield",
    duration: "1 - 2 Visits",
    benefit: "Saves Natural Tooth Structure",
    approxPrice: "$800 - $1,400"
  },
  {
    id: "braces",
    name: "Braces & Aligners",
    description: "Modern orthodontic solutions including Invisalign® and ceramic braces for discreet and efficient alignment.",
    iconName: "Layers",
    duration: "12 - 24 Months",
    benefit: "Corrects Complex Malocclusions",
    approxPrice: "$3,200 - $5,800"
  },
  {
    id: "implants",
    name: "Dental Implants",
    description: "Premium titanium implants that replicate the natural tooth root, providing a permanent and aesthetic restoration.",
    iconName: "Anchor",
    duration: "3 - 6 Months Process",
    benefit: "Life-long Durability",
    approxPrice: "$2,500 - $4,500"
  },
  {
    id: "whitening",
    name: "Pro Whitening",
    description: "Laser-accelerated whitening that lifts deep stains safely, brightening your smile by up to 8 shades in one session.",
    iconName: "Sparkles",
    duration: "60 - 90 mins",
    benefit: "Instant Visual Results",
    approxPrice: "$350 - $650"
  },
  {
    id: "makeover",
    name: "Smile Makeover",
    description: "A bespoke combination of veneers, contouring, and alignment designed to harmonize with your unique facial features.",
    iconName: "Smile",
    duration: "Custom Timeline",
    benefit: "Complete Aesthetic Rebirth",
    approxPrice: "$4,000 - $12,000"
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry",
    description: "Specialized, gentle care for our youngest patients in an environment designed to be engaging and anxiety-free.",
    iconName: "Baby",
    duration: "30 - 45 mins",
    benefit: "Fear-Free Environment",
    approxPrice: "$90 - $180"
  },
  {
    id: "surgery",
    name: "Oral Surgery",
    description: "Expert surgical procedures including extractions, corrective jaw surgery, and dental implants in a completely painless environment.",
    iconName: "Activity",
    duration: "1 - 2 Hours",
    benefit: "Surgical Excellence",
    approxPrice: "$500 - $1,800"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "vance",
    name: "Dr. Anjali Sharma",
    degrees: "MDS (Orthodontics) — AIIMS New Delhi",
    title: "Chief Cosmetic Dentist",
    specialties: ["Cosmetic Dentistry", "Veneers & Smile Design"],
    image: "/src/assets/images/dr_anjali_sharma_1780666279397.png",
    experience: "15+ Years Experience",
    schedule: "MON - THU: 9AM - 5PM",
    satisfaction: "99% Patient Satisfaction"
  },
  {
    id: "thorne",
    name: "Dr. Vikram Malhotra",
    degrees: "MDS, Ph.D. — King George's Medical University",
    title: "Senior Orthodontist Specialist",
    specialties: ["Orthodontics", "Invisalign® Aligners"],
    image: "/src/assets/images/dr_vikram_malhotra_1780666297392.png",
    experience: "12+ Years Experience",
    schedule: "TUE - FRI: 10AM - 6PM",
    satisfaction: "96% Align Perfect Rate"
  },
  {
    id: "jenkins",
    name: "Dr. Priyanka Nair",
    degrees: "MDS — Maulana Azad Dental College, New Delhi",
    title: "Maxillofacial Surgeon",
    specialties: ["Implantology", "Oral & Reconstruction Surgery"],
    image: "/src/assets/images/dr_priyanka_nair_1780666310721.png",
    experience: "18+ Years Experience",
    schedule: "MON - WED: 8AM - 4PM",
    satisfaction: "99.4% Flawless Record"
  },
  {
    id: "sterling",
    name: "Dr. Amit Kothari",
    degrees: "MDS — Manipal College of Dental Sciences",
    title: "Chief Prosthodontic Surgeon",
    specialties: ["Premium Implants", "Full Mouth Smile Reconstruction"],
    image: "/src/assets/images/dr_amit_kothari_1780666325748.png",
    experience: "20+ Years Experience",
    schedule: "MON - FRI: 9AM - 6PM",
    satisfaction: "98% SATISFACTION"
  },
  {
    id: "rossetti",
    name: "Dr. Rajesh Iyer",
    degrees: "MDS — Government Dental College & Hospital, Mumbai",
    title: "Senior Pediatric Consultant",
    specialties: ["Aligners & Braces", "Preventive Pediatric Care"],
    image: "/src/assets/images/dr_rajesh_iyer_1780666339755.png",
    experience: "14+ Years Experience",
    schedule: "TUE - SAT: 10AM - 5PM",
    satisfaction: "HIGHLY RATED"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "wilson",
    name: "James Wilson",
    type: "Restorative Patient",
    quote: "The technology at Kothari is truly next-level. I had a painless implant procedure and the results are life-changing. Truly the best in the city!",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTsPmrGprJY7m81exvZex9X5NtOz6j5jxUTXEgEWDJ2s6-O5WJfQu7IsPvNCNtL-DPpb5zk1Q_OkHGMfEWMTX9_ZXYT2wEubDbmamFPSrtETU0VrHWn__h6y8zLK5G9jwl4-c1HgS8j_BvOG3Sz6tMvbbDNFTpL-5A2rXaIly2kt0o34jrXnWteBSKidfBUo2acKhyvSGEaiySxVzmF26yO6MdsluhtEnd6lpdGEeSf3K2YMXSxArbj0Z13RiF0zw3Z7q-CymAaalA"
  },
  {
    id: "martinez",
    name: "Sophia Martinez",
    type: "Invisalign Patient",
    quote: "Invisalign treatment was so seamless here. The doctors are incredibly attentive and the clinic feels like a 5-star spa rather than a dental office.",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEj_euvcCJ_iyCqSqGFHU-9dXjXHToae1pnvq21AiBFj30NTpcjYzaTPBcQpepnVjaPZILq2zid1L4HZif-1n3H0od9wabO2RPl2QPZ-oVfX9CG7Q5w4zGyvliGpF1gc8a-xn-XHBH7_Q9VPGgnUr-E8UOMVZzIX-jhq1tt51HeR8jrvtRGr98NhggkYG6ojrr3d9vD-YjAeYsiCcjBzV9-5OVzwEzsTSaHmp5QlupvT7Y4FAq-XivoCHUSBMLtKtD5ULNr4cBlQXQ"
  },
  {
    id: "chen",
    name: "Robert Chen",
    type: "Emergency Care",
    quote: "The emergency care team saved me on a Sunday evening. Fast response, professional care, and zero pain. I can't recommend them enough.",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApeNGtRgyYS4ORkV518MpzQptMOPeWTneCNnSEkZXSAbKul08snJXzvzPuYAlMQ1PV47Ph6LWRYO8i0TnHJyNKxJOjblPc6N5CMUa_Rh1PEaBSvpOS4jx-ujuvH1M66j8bU1we6DCTkp9BefPJnGB-9THDxu3fuaXdTxwUbFOFsMTOmdm1lcmGLi6RQ7cAsoC4traRNyeZET2yOlDw4ZdvyYS2yH_tpKxNWqvxN96RUv1u_cr_PxRfJGx9dbHTFlYfUdRqfYEWkQob"
  }
];
