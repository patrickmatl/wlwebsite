import { generateServiceSchema, generateFAQSchema } from '@/lib/schema';

const serviceSchema = generateServiceSchema(
  'Packaging Design Services',
  'Professional packaging design services to make your products stand out. Custom packaging solutions for brands of all sizes.',
  [
    {
      name: 'Basic Package',
      description: 'Essential packaging design for small products',
      price: '1499'
    },
    {
      name: 'Standard Package',
      description: 'Comprehensive packaging design for medium-sized products',
      price: '2499'
    },
    {
      name: 'Premium Package',
      description: 'Advanced packaging design for complex product lines',
      price: '3999'
    }
  ]
);

const faqSchema = generateFAQSchema([
  {
    question: "What file formats will I receive for my packaging design?",
    answer: "You'll receive your packaging design in multiple formats including AI (Adobe Illustrator), PDF, EPS, and JPG. Print-ready files will be provided with proper bleeds, crop marks, and color specifications (CMYK)."
  },
  {
    question: "How long does the packaging design process take?",
    answer: "The timeline varies based on the package selected and project complexity. Basic packages typically take 5-7 days, while Premium Collection projects may take 2-3 days with priority service. This includes concept development, revisions, and final file preparation."
  },
  {
    question: "Do you provide printing services for packaging?",
    answer: "While we don't handle printing directly, we can recommend trusted printing partners and prepare your files according to their specifications. We ensure all files meet industry standards for professional printing."
  },
  {
    question: "Can you work with specific packaging dimensions and requirements?",
    answer: "Yes, we can work with any specific dimensions, materials, or technical requirements for your packaging. We'll ensure the design complies with industry standards and your manufacturer's specifications."
  },
  {
    question: "Do you offer eco-friendly packaging design options?",
    answer: "Yes, we can design for sustainable materials and incorporate eco-friendly elements into your packaging design. We stay current with environmental regulations and sustainable packaging trends."
  }
]);

export const metadata = {
  title: 'Packaging Design Services - WL Creationx',
  description: 'Professional packaging design services to make your products stand out. Custom packaging solutions for brands of all sizes.',
  openGraph: {
    title: 'Packaging Design Services - WL Creationx',
    description: 'Professional packaging design services to make your products stand out. Custom packaging solutions for brands of all sizes.',
    images: ['/images/services/packaging-design.jpg'],
  },
  schema: [serviceSchema, faqSchema],
};
