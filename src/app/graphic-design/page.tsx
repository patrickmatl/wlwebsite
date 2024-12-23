'use client';

import { motion } from 'framer-motion';

const GraphicDesignPage = () => {
  const commonFeatures = [
    "Final Artwork Supplied In Open File Format",
    "Logo Colour Palettes, Codes & Fonts Supplied With Final Handover",
    "2 X Free Design Revision Rounds Included In Price",
    "Custom Unique Designs To Choose From (We Do Not Use Templates)",
    "Project Manager Assigned To Your Project To Guide You",
    "Professional & Certified Team Working On Your Designs",
    "Experts Working On Your Project With 19 Years Design Experience",
    "Quality Control Throughout The Process"
  ];

  const corporateIdentityPacks = [
    {
      name: "Corporate Identity Pack 1",
      price: "R4,160.00",
      features: [
        "X2 Unique Options",
        "X1 Final Logo Design",
        "Business Card Design",
        "Letterhead Design",
        "Email Signature Design",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Corporate Identity Pack 2",
      price: "R5,080.00",
      features: [
        "X4 Unique Options",
        "X1 Final Logo Design",
        "Business Card Design",
        "Letterhead Design",
        "Email Signature Design",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Corporate Identity Pack 3",
      price: "R6,410.00",
      features: [
        "X6 Unique Options",
        "X1 Final Logo Design",
        "Business Card Design",
        "Letterhead Design",
        "Email Signature Design",
        "2 Revision Rounds"
      ]
    }
  ];

  const logoDesigns = [
    {
      name: "Logo Design (2 x Options)",
      price: "R2,080.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Logo Design (4 x Options)",
      price: "R3,120.00",
      features: [
        "X4 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Logo Design (6 x Options)",
      price: "R4,160.00",
      features: [
        "X6 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Logo Redraw",
      price: "R1,040.00",
      features: [
        "Existing Logo Redraw",
        "X1 Final Concept",
        "Printable Files Supplied"
      ]
    }
  ];

  const businessEssentials = [
    {
      name: "Business Card Design",
      price: "R1,040.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "90 x 50mm",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Letterhead Design",
      price: "R1,290.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Email Signature | Static",
      price: "R1,040.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Signature is a static image",
        "Only clickable to 1 link"
      ]
    },
    {
      name: "HTML Email Signature | Interactive",
      price: "R1,560.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Signature is HTML coded",
        "Clickable to many links",
        "Needs hosting to run"
      ]
    }
  ];

  const printDigitalMedia = [
    {
      name: "Company Folder",
      price: "R3,230.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Poster Design A4-A0",
      price: "R1,560.00",
      startingFrom: true,
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Signage / Advertising Board Design",
      price: "R1,560.00",
      startingFrom: true,
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds",
        "Prices vary on size"
      ]
    },
    {
      name: "Excel Invoice / Quote Design",
      price: "R1,560.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "210 x 297mm",
        "Covert to MS Excel Template"
      ]
    },
    {
      name: "Brochure (Z-Fold)",
      price: "R2,590.00",
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Flyer Design A6-A4",
      price: "R780.00",
      startingFrom: true,
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "PowerPoint Presentation Concept Pack",
      price: "R3,230.00",
      features: [
        "Create Unique PowerPoint",
        "X1 Final Concept",
        "X5 Template Slides",
        "Additional pages can be added",
        "X2 Revision rounds"
      ]
    },
    {
      name: "Digital Flyer Mailer Design",
      price: "R1,040.00",
      features: [
        "Perfect for Digital Ads",
        "X2 Unique Options",
        "X1 Final Concept",
        "Supplied in Digital format",
        "For Digital Use Only"
      ]
    },
    {
      name: "Company Profile",
      price: "R780.00",
      startingFrom: true,
      perPage: true,
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "Printable Files Supplied",
        "2 Revision Rounds"
      ]
    },
    {
      name: "Publication & Media Adverts",
      price: "R960.00",
      startingFrom: true,
      features: [
        "X2 Unique Options",
        "X1 Final Concept",
        "For Print & Digital Media",
        "2 Revision Rounds"
      ]
    },
    {
      name: "WhatsApp / Digital Flyer Design",
      price: "R1,040.00",
      features: [
        "Perfect for Digital Ads",
        "X2 Unique Options",
        "X1 Final Concept",
        "Supplied in Digital format",
        "For Digital Use Only"
      ]
    }
  ];

  const extraServices = [
    {
      name: "Extra Design Revisions",
      price: "R520.00",
      features: [
        "Buy an Extra Revision",
        "Graphic Design Fees Per Hour",
        "Add more revisions",
        "No limit on paid revisions"
      ]
    }
  ];

  const renderPackage = (pkg: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
    >
      <h3 className="text-[#FFD700] text-xl font-bold mb-4">{pkg.name}</h3>
      <p className="text-2xl font-bold mb-6">
        {pkg.startingFrom && "Starting from:"} {pkg.price}
        {pkg.perPage && " per page"}
      </p>
      <ul className="space-y-2 text-sm text-gray-300 mb-6">
        {pkg.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start">
            <span className="text-[#FFD700] mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full py-2 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
        More Info
      </button>
    </motion.div>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          GRAPHIC DESIGN PRICING
        </h1>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">OUR GRAPHIC DESIGNS INCLUDE THE FOLLOWING FOR FREE</h2>
          <ul className="text-gray-300 space-y-2">
            {commonFeatures.map((feature, index) => (
              <li key={index} className="flex items-center justify-center">
                <span className="text-[#FFD700] mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Corporate Identity Packs */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-8 text-center">Corporate Identity Packs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporateIdentityPacks.map(pkg => renderPackage(pkg))}
        </div>
      </div>

      {/* Logo Designs */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-8 text-center">Logo Designs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {logoDesigns.map(pkg => renderPackage(pkg))}
        </div>
      </div>

      {/* Business Essentials */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-8 text-center">Business Essentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessEssentials.map(pkg => renderPackage(pkg))}
        </div>
      </div>

      {/* Print & Digital Media */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-8 text-center">Print & Digital Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {printDigitalMedia.map(pkg => renderPackage(pkg))}
        </div>
      </div>

      {/* Extra Services */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-8 text-center">Extra Services</h2>
        <div className="max-w-md mx-auto">
          {extraServices.map(pkg => renderPackage(pkg))}
        </div>
      </div>
    </div>
  );
};

export default GraphicDesignPage;
