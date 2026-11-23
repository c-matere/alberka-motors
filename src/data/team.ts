export type TeamDeskIcon = 'sourcing' | 'inspection' | 'workshop' | 'handover';

export interface TeamDesk {
  id: string;
  index: string;
  icon: TeamDeskIcon;
  eyebrow: string;
  title: string;
  description: string;
  responsibilities: string[];
  /** Add a verified name when supplied; the card falls back to the desk title. */
  name?: string;
  /** Path to a portrait, e.g. /team/jane-doe.jpg. Falls back to the desk icon. */
  photo?: string;
}

/**
 * The About page presents the four desks that handle a vehicle from Tokyo
 * auction to Kenyan handover. These are functions, not named individuals —
 * replace with verified names and portraits when they are supplied.
 */
export const TEAM_DESKS: TeamDesk[] = [
  {
    id: 'tokyo-sourcing',
    index: '01',
    icon: 'sourcing',
    eyebrow: 'TOKYO · YOKOHAMA · NAGOYA',
    title: 'Japanese Sourcing Desk',
    description:
      'Our buying desk works the wholesale auction lanes directly, with no broker between Alberka and the Japanese seller.',
    responsibilities: [
      'Licensed bidding accounts at USS, TAA and CAA auctions',
      'Grade 4.5 minimum with factory paint-depth checks',
      'Pre-bid structural rail and electronics inspection',
    ],
  },
  {
    id: 'provenance-inspection',
    index: '02',
    icon: 'inspection',
    eyebrow: 'DOCUMENTS · CERTIFICATION',
    title: 'Provenance & Inspection Desk',
    description:
      'This desk verifies the paper trail before payment and keeps the original Japanese records with the vehicle for life.',
    responsibilities: [
      'QISJ and JEVIC genuine-mileage certification',
      'Original auction sheet translated and archived',
      'Export certificate and Massha-sho dossier retention',
    ],
  },
  {
    id: 'mombasa-workshop',
    index: '03',
    icon: 'workshop',
    eyebrow: 'GANJONI · MOMBASA',
    title: 'Technical Workshop',
    description:
      'Once a unit is cleared, our Mombasa technicians turn a Japanese auction purchase into a road-ready Kenyan vehicle.',
    responsibilities: [
      '100-point brake, steering and suspension audit',
      'Hybrid battery and OBD telemetry diagnostics',
      'Coastal rust sealing and full fluid renewal',
    ],
  },
  {
    id: 'client-handover',
    index: '04',
    icon: 'handover',
    eyebrow: 'CLIENT SERVICES · MOMBASA',
    title: 'Client Handover Desk',
    description:
      'One desk owns your file from reservation to logbook collection, so you never have to chase a different department.',
    responsibilities: [
      'KRA clearance, duty assessment and logbook processing',
      'SACCO and bank finance documentation support',
      'Nationwide carrier and collection coordination',
    ],
  },
];
