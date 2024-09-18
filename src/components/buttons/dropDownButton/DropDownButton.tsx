import React, { useState } from 'react';
import dropDown from '@/assets/dropDownDefault.svg';
import './DropDownButton.scss';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const TooltipCustome = styled(
  ({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'relative',
    top: '-10px',
    right: '-30px',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    color: '#E0FF25',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15.6px',
    border: 'none',
  },
  [`& .${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: '0px',
    },
}));

const DropDown: React.FC<{ onDropDownClick: () => void }> = ({
  onDropDownClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsOpen(!isOpen);
    onDropDownClick();
  };

  return (
    <div className="dropDown" onClick={handleDropDownClick}>
      <img
        src={dropDown}
        alt="dropDown"
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}
      />
    </div>
  );
};

export default DropDown;
