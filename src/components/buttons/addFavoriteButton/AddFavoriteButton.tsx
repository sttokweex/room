import React from 'react';
import './AddFavoriteButton.scss';
const AddFavoriteButton: React.FC<{
  addFavorite: () => void;
  isFavorite: boolean;
  onRemoveFromFavorites: () => void;
}> = ({ addFavorite, isFavorite, onRemoveFromFavorites }) => {
  return (
    <div
      className="addFavorite"
      onClick={() => {
        addFavorite();
        if (isFavorite) {
          onRemoveFromFavorites();
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
      >
        <path
          d="M9.96199 0.596006L11.904 4.513C12.05 4.808 12.332 5.01202 12.659 5.05902L17.1419 5.70697C17.9639 5.82597 18.292 6.83398 17.697 7.41198L14.456 10.557C14.219 10.787 14.111 11.118 14.167 11.443L14.9079 15.747C15.0579 16.62 14.1409 17.286 13.3549 16.875L9.467 14.84C9.175 14.687 8.82697 14.687 8.53597 14.84L4.65096 16.873C3.86396 17.285 2.94393 16.618 3.09493 15.743L3.83602 11.443C3.89202 11.118 3.78396 10.787 3.54696 10.557L0.305988 7.41198C-0.290012 6.83398 0.0379201 5.82597 0.86092 5.70697L5.34395 5.05902C5.66995 5.01202 5.95196 4.808 6.09896 4.513L8.04097 0.596006C8.43197 -0.198994 9.56799 -0.198994 9.96199 0.596006Z"
          fill={isFavorite == false ? '#EEEDE9' : '#E0FF25'}
        />
      </svg>
    </div>
  );
};

export default AddFavoriteButton;
