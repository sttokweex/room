import React from 'react';
import './BottomSection.scss';
import FAQ from '../FAQSection/FAQ';
import Footer from '../footer/Footer';

const BottomSection: React.FC = () => {
  return (
    <div className="bottomSectionContainer">
      <div className="FAQ">
        <FAQ />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default BottomSection;
