import React, { useState } from 'react';
import './FAQ.scss';
import Arrow from '@/assets/arrow.svg';
const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'How do I make a deposit?',
      answer:
        'To make a deposit, connect your wallet and make a deposit in your preferred cryptocurrency.',
    },
    {
      question: 'How its work?',
      answer:
        'Connect your wallet and make a deposit in your preferred cryptocurrency. If you win, you take your winnings, and if not, you just take your deposit back.',
    },
    {
      question: 'What is the interdependence of deposit on winnings?',
      answer:
        'The winnings are dependent on the deposit you make. The higher the deposit, the higher the potential winnings.',
    },
    {
      question: 'What is the interdependence of deposit on winnings?',
      answer:
        'The winnings are dependent on the deposit you make. The higher the deposit, the higher the potential winnings.',
    },
    {
      question: 'What is the interdependence of deposit on winnings?',
      answer:
        'The winnings are dependent on the deposit you make. The higher the deposit, the higher the potential winnings.',
    },
  ];

  return (
    <div className="FAQbox">
      <h1>We&apos;re often asked</h1>
      <div className="FAQItemBox">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="FAQItem"
            onClick={() => toggleFAQItem(index)}
          >
            <div className="FAQItemHeader">
              <h6>{item.question}</h6>
              <div
                className={`itemImgBox ${expandedIndex === index ? 'rotated' : ''}`}
              >
                <img src={Arrow} alt="" />
              </div>
            </div>
            <div
              className={`FAQItemContent ${expandedIndex === index ? 'expanded' : ''}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
