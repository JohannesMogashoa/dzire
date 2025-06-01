export const sampleDzires: Dzire[] = [
  {
    id: 1,
    title: 'Tech Gadgets Wishlist',
    description: "A list of tech gadgets I'd love to receive for my birthday.",
    endDate: new Date('2025-07-15'),
    createDate: new Date('2025-06-01'),
    items: [
      {
        title: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones.',
        satisfied: false,
      },
      {
        title: 'Smartwatch',
        description: 'A fitness-focused smartwatch.',
        satisfied: false,
      },
      {
        title: 'Portable Charger',
        description: 'High-capacity power bank.',
        satisfied: false,
      },
    ],
    iconUrl: 'https://example.com/icons/gadgets.png',
  },
  {
    id: 2,
    title: 'Books I Want',
    description: "A collection of books I'd love to read this year.",
    endDate: new Date('2025-07-15'),
    createDate: new Date('2025-06-01'),
    items: [
      {
        title: 'The Pragmatic Programmer',
        description: 'Classic software engineering book.',
        satisfied: false,
      },
      {
        title: 'Atomic Habits',
        description: 'Book on building good habits.',
        satisfied: false,
      },
    ],
    iconUrl: 'https://example.com/icons/books.png',
  },
  {
    id: 3,
    title: 'Birthday Experience Gifts',
    description: "Experiences I'd love to try for my birthday.",
    endDate: new Date('2025-07-15'),
    createDate: new Date('2025-06-01'),
    items: [
      {
        title: 'Hot Air Balloon Ride',
        description: 'A sunrise balloon ride over the city.',
        satisfied: false,
      },
      {
        title: 'Cooking Class',
        description: 'Learn to cook Italian cuisine.',
        satisfied: false,
      },
    ],
    iconUrl: 'https://example.com/icons/experience.png',
  },
  {
    id: 4,
    title: 'Fashion Wishlist',
    description: "Clothing and accessories I'd like for my birthday.",
    endDate: new Date('2025-07-15'),
    createDate: new Date('2025-06-01'),
    items: [
      {
        title: 'Leather Wallet',
        description: 'A slim, brown leather wallet.',
        satisfied: false,
      },
      {
        title: 'Sneakers',
        description: 'Comfortable running shoes.',
        satisfied: false,
      },
    ],
    iconUrl: 'https://example.com/icons/fashion.png',
  },
  {
    id: 5,
    title: 'Home & Decor',
    description: "Home items and decor I'd love to receive.",
    endDate: new Date('2025-07-15'),
    createDate: new Date('2025-06-01'),
    items: [
      {
        title: 'Aromatic Candles',
        description: 'Set of lavender-scented candles.',
        satisfied: false,
      },
      {
        title: 'Wall Art',
        description: 'Modern abstract painting.',
        satisfied: false,
      },
    ],
    iconUrl: 'https://example.com/icons/home.png',
  },
  {
    id: 6,
    title: 'Charity & Giving',
    description: "Charitable donations I'd appreciate in my name.",
    endDate: new Date('2025-07-15'),
    createDate: new Date('2025-06-01'),
    items: [
      {
        title: 'Animal Shelter Donation',
        description: 'Support for local animal shelter.',
        satisfied: false,
      },
      {
        title: 'Tree Planting',
        description: 'Donation to plant trees.',
        satisfied: false,
      },
    ],
    iconUrl: 'https://example.com/icons/charity.png',
  },
];

export type Dzire = {
  id: number;
  title: string;
  description: string;
  endDate: Date;
  createDate: Date;
  items: DzireItem[];
  iconUrl?: string;
};

export type DzireItem = {
  id?: number;
  title: string;
  description: string;
  satisfied: boolean;
  satisfiedDate?: Date;
};
