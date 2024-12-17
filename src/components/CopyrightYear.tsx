'use client';

const CopyrightYear = () => {
  const currentYear = new Date().getFullYear();
  return <span>{currentYear}</span>;
};

export default CopyrightYear;
