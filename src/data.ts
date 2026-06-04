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
    name: "Dr. Eleanor Vance",
    degrees: "DDS, MDS — Harvard",
    title: "Cosmetic Dentist",
    specialties: ["Cosmetic Dentistry", "Veneers"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6XQ1UcXBN4GDbfYNQ8iWO57hxtgvJbUDfm9HdKzKePlWsQMMSSmuN-22TLxva6Wj6hWnEMVRMJutV6MA5GS7rT3t4TA8c0T1MuQAhECxC5CPQLIhk9qrh5gbR90pdRNO_I5VRlvhmFEg4Fr_rqz1MctGdhqOhSghGLTqEKZK9fXQQK0SHKFGJP0WqILgNO7lu-KB0wrsMzH3BNZRIBni2cGAyI6v9qX2C8pR8y3C2JEDvSXgXVBQmDAQU5B2RxQVXPC-FJEjVrKt",
    experience: "15+ Years Experience",
    schedule: "MON - THU: 9AM - 5PM",
    satisfaction: "99% Patient Satisfaction"
  },
  {
    id: "thorne",
    name: "Dr. Julian Thorne",
    degrees: "MDS, Ph.D. — Stanford",
    title: "Orthodontist Specialist",
    specialties: ["Orthodontics", "Invisalign"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOyyczUddeJsSCORkhXGnrCvnm8ohND8xJzE_mNK7_ZvLTCpWfNFMDqOGH9mOgFqNThQbbi_61fjubPiI4WSWR1JiOeO9xWHdq1DuLjB4yoYUJoZgWFG1mcMnYxu3NQTFrcP-uiVA6pWkJjbwjW3V7cWH1Ga6iBwMo9eqsk-VCaxArv9Aul3S9n-_EET0S5AcLha9hbtD6egY7rgTjLSxzUdCMhAfudpjtRvADHDO0uFI-oWt8Dw8-1ven-8rVsihwrn40hfX3q1Lr",
    experience: "12+ Years Experience",
    schedule: "TUE - FRI: 10AM - 6PM",
    satisfaction: "96% Align Perfect Rate"
  },
  {
    id: "jenkins",
    name: "Dr. Sarah Jenkins",
    degrees: "DDS, MS — Johns Hopkins",
    title: "Oral Surgeon",
    specialties: ["Implantology", "Oral Surgery"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQT3zWKT-0RTVLothR6PuCRYAtR4rdHLdNw6k3RCwPTFDJjofvNeptyMHpf9j6OSjGIdfNUXrCsA_LhSC2qj58kZctrojWIPjhvkz44l6wpHqh2e_QluODdstvVspxF1sxgoAC7-IbqN4QpR0Uj5GBJs9z-HHpq4MCYaMQSwiofGaC5S-e0lCT0VClgXJPL_AJ5uXpQvqaM-zC43l3sPlTrxnTmowWTylP4mAGtKegjA8eywLyctuWHNnXjUmTcfdN89eh4e8Xjeuh",
    experience: "18+ Years Experience",
    schedule: "MON - WED: 8AM - 4PM",
    satisfaction: "99.4% Flawless Record"
  },
  {
    id: "sterling",
    name: "Dr. Alexander Sterling",
    degrees: "DDS — Cambridge University",
    title: "Chief Cosmetic Surgeon",
    specialties: ["Implants", "Smile Reconstruction"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxbI0d0S7K6WbBLEwaPnhkfKAX_rD5CNvAiCNk8WsVVSOC6efM5eSHMIDQGr7Wkur-_G4h0aX9XDXyiG7i22K0RylSfZdkjF59dzN6iC5w0JmkdSOPTX0VQ1JjLScUhuzHNJ4A1Ekdsz02WWMSn5Mh5aphv9xDF0CgNmRM4Tld5UtMOOkwfn085TbFlbK_NoBW6HbIQMmVCoRdj1qWx5kEeg2jV4B9scHJ_38KQ7WovyFcVQN-7c007GOmLpzPulSgBC6ybK2ITz8f",
    experience: "20+ Years Experience",
    schedule: "MON - FRI: 9AM - 6PM",
    satisfaction: "98% SATISFACTION"
  },
  {
    id: "rossetti",
    name: "Dr. Elena Rossetti",
    degrees: "DDS, MS — Milan Institute",
    title: "Orthodontic Specialist",
    specialties: ["Aligners & Braces", "Pediatric Ortho"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdHc4P9hXUg565kZ5fHulZq2m5NBOLnHlqB5SrGhx4t-h7SnCPL8IUN95tMDL-jktOBKaralCo1q0YCuuAopouxv7fyafyyghao9_hESNhJrFX9AD0ypTjUlWdOzzI2HU0WdDh4fOR6eySXTRGq_oDNnET0l8lvxGCSminlo459RlEBunFbazEE7RYBjo2Gui4h9DFTDxuwLSby6q0GryQ71Ls0J6VAooQoeMI2DUkqwv709edopH0hrtz-EstaaMmIwGFW_PoBhGG",
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
