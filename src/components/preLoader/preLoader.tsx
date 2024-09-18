import './preLoader.scss';

const PreLoader = () => {
  return (
    <div className="preLoaderMainBox">
      <div className="preLoaderIcon">
        <svg
          width="86"
          height="84"
          viewBox="0 0 86 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M75.8571 5.79369H76.7102C76.8944 5.79369 77.0667 5.78966 77.2269 5.78159C77.3951 5.76547 77.5433 5.72918 77.6714 5.67273C77.7996 5.61628 77.8997 5.53161 77.9718 5.41872C78.0519 5.29776 78.092 5.13245 78.092 4.92279C78.092 4.74539 78.0559 4.60427 77.9838 4.49944C77.9197 4.39461 77.8316 4.31397 77.7195 4.25753C77.6154 4.20108 77.4912 4.16479 77.347 4.14866C77.2108 4.12447 77.0747 4.11238 76.9385 4.11238H75.8571V5.79369ZM75.0401 3.44711H77.0707C77.6955 3.44711 78.156 3.5721 78.4524 3.82208C78.7568 4.07206 78.909 4.45106 78.909 4.95908C78.909 5.43485 78.7768 5.78562 78.5125 6.01141C78.2482 6.22914 77.9198 6.35816 77.5272 6.39848L79.0292 8.73296H78.152L76.7222 6.45896H75.8571V8.73296H75.0401V3.44711ZM73.0816 6.07189C73.0816 6.6283 73.1737 7.14438 73.3579 7.62015C73.5502 8.08785 73.8105 8.49508 74.1389 8.84182C74.4754 9.18857 74.8679 9.46274 75.3164 9.66434C75.773 9.85787 76.2656 9.95463 76.7943 9.95463C77.315 9.95463 77.7996 9.85787 78.2482 9.66434C78.6967 9.46274 79.0852 9.18857 79.4137 8.84182C79.7501 8.49508 80.0104 8.08785 80.1946 7.62015C80.3869 7.14438 80.483 6.6283 80.483 6.07189C80.483 5.53161 80.3869 5.02762 80.1946 4.55992C80.0104 4.09222 79.7501 3.68902 79.4137 3.35034C79.0852 3.0036 78.6967 2.73346 78.2482 2.53993C77.7996 2.33833 77.315 2.23753 76.7943 2.23753C76.2656 2.23753 75.773 2.33833 75.3164 2.53993C74.8679 2.73346 74.4754 3.0036 74.1389 3.35034C73.8105 3.68902 73.5502 4.09222 73.3579 4.55992C73.1737 5.02762 73.0816 5.53161 73.0816 6.07189ZM72.2645 6.07189C72.2645 5.43485 72.3847 4.84215 72.625 4.29381C72.8653 3.74547 73.1897 3.2697 73.5982 2.86651C74.0148 2.46332 74.4954 2.14883 75.0401 1.92304C75.5928 1.68919 76.1775 1.57227 76.7943 1.57227C77.4111 1.57227 77.9918 1.68919 78.5365 1.92304C79.0812 2.14883 79.5578 2.46332 79.9664 2.86651C80.3749 3.2697 80.6993 3.74547 80.9396 4.29381C81.1799 4.84215 81.3001 5.43485 81.3001 6.07189C81.3001 6.72506 81.1799 7.32985 80.9396 7.88626C80.6993 8.4346 80.3749 8.9144 79.9664 9.32565C79.5578 9.72885 79.0812 10.0433 78.5365 10.2691C77.9918 10.4949 77.4111 10.6078 76.7943 10.6078C76.1775 10.6078 75.5928 10.4949 75.0401 10.2691C74.4954 10.0433 74.0148 9.72885 73.5982 9.32565C73.1897 8.9144 72.8653 8.4346 72.625 7.88626C72.3847 7.32985 72.2645 6.72506 72.2645 6.07189Z"
            fill="white"
          />
          <path
            className="element-1"
            opacity="0.4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M37.2318 52.2778C37.9 52.1293 38.4451 51.648 38.6754 51.0034L40.1988 46.7378C40.4819 45.9451 41.2327 45.416 42.0744 45.416H43.0363H43.9981C44.8398 45.416 45.5906 45.9451 45.8737 46.7378L47.3972 51.0034C47.6274 51.648 48.1725 52.1293 48.8407 52.2778L50.2559 52.5922C50.5519 52.658 50.8601 52.7043 51.1533 52.6268L58.0378 50.8075C59.3011 50.4736 60.5382 51.4263 60.5382 52.733V54.3951C60.5382 55.2991 59.9294 56.0897 59.0555 56.3206L53.3355 57.8322C52.138 58.1487 51.2529 59.1611 51.0992 60.3902C51.0855 60.4997 51.081 60.61 51.0856 60.7202L51.9384 81.1881C51.9855 82.3196 51.081 83.2626 49.9485 83.2626H47.9855C46.981 83.2626 46.1338 82.5147 46.0092 81.518L45.6174 78.3839C45.4929 77.3872 44.6456 76.6393 43.6412 76.6393H42.4267C41.4223 76.6393 40.5751 77.3872 40.4505 78.3839L40.0587 81.518C39.9341 82.5147 39.0869 83.2626 38.0825 83.2626H36.124C34.9916 83.2626 34.087 82.3196 34.1341 81.1881L34.987 60.7202C34.9916 60.61 34.987 60.4997 34.9733 60.3902C34.8198 59.1618 33.9351 58.15 32.7382 57.8337L27.0129 56.3206C26.1389 56.0897 25.5301 55.2991 25.5301 54.3951V52.733C25.5301 51.4263 26.7672 50.4736 28.0306 50.8075L34.9161 52.6271C35.2104 52.7048 35.5196 52.6583 35.8167 52.5922L37.2318 52.2778Z"
            fill="white"
          />
          <path
            className="element-3"
            opacity="0.4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M37.9245 6.96181C38.1744 6.73962 38.3644 6.45806 38.4769 6.14311L40.1988 1.32176C40.4819 0.529114 41.2327 0 42.0744 0H43.0363H43.9981C44.8398 0 45.5906 0.529115 45.8737 1.32177L47.5956 6.14311C47.7081 6.45806 47.8981 6.73962 48.1481 6.96181L49.0609 7.77324C50.0746 8.67426 51.3015 9.30159 52.6254 9.59579L58.9786 11.0076C59.8899 11.2101 60.5382 12.0183 60.5382 12.9518V14.6535C60.5382 15.9277 59.3584 16.8741 58.1146 16.5977L51.4339 15.1131C51.2563 15.0737 51.0811 15.1959 51.0886 15.3776L51.9384 35.7721C51.9855 36.9035 51.081 37.8466 49.9485 37.8466H47.3932C46.2932 37.8466 45.4016 36.9549 45.4016 35.855V30.3768C45.4016 29.2768 44.5099 28.3851 43.41 28.3851H42.6624C41.5624 28.3851 40.6707 29.2768 40.6707 30.3768V35.855C40.6707 36.9549 39.7791 37.8466 38.6791 37.8466H36.124C34.9916 37.8466 34.087 36.9035 34.1341 35.7721L34.9839 15.3776C34.9915 15.1954 34.8157 15.0729 34.6376 15.1124L27.9538 16.5977C26.71 16.8741 25.5301 15.9277 25.5301 14.6535V12.9518C25.5301 12.0183 26.1785 11.2101 27.0897 11.0076L33.4485 9.59455C34.7724 9.30034 35.9993 8.67302 37.013 7.772L37.9245 6.96181Z"
            fill="white"
          />
          <path
            className="element-4"
            opacity="0.4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M67.6257 21.5087C66.8479 20.7309 66.8479 19.4699 67.6257 18.6921L68.8234 17.4945C69.6011 16.7167 70.8622 16.7167 71.6399 17.4945L75.8054 21.6599C76.5832 22.4377 77.8442 22.4377 78.622 21.6599L78.8816 21.4003C79.2551 21.0268 79.7617 20.817 80.2899 20.817H81.8694C82.6996 20.817 83.4427 21.3319 83.7342 22.1093L84.5546 24.2969C84.6303 24.4987 84.6727 24.7114 84.6802 24.9268L86.0021 62.823C86.0491 64.1696 84.9703 65.2867 83.6229 65.2867C82.8021 65.2867 82.0391 64.8639 81.6041 64.1678L81.3353 63.7378C80.69 62.7052 79.1861 62.7052 78.5407 63.7378L78.26 64.1869C77.8324 64.8711 77.0825 65.2867 76.2756 65.2867C74.927 65.2867 73.8576 64.1497 73.94 62.8037L74.5109 53.4791C74.5744 52.4416 73.3208 51.8769 72.5859 52.6118C71.8081 53.3896 70.5471 53.3896 69.7693 52.6118L68.5716 51.4142C67.7938 50.6364 67.7938 49.3754 68.5716 48.5976L74.9338 42.2354C75.159 42.0102 75.3291 41.7347 75.4166 41.4284C76.8074 36.559 75.7759 31.6842 74.9996 29.1842C74.9081 28.8898 74.7426 28.6256 74.5246 28.4076L67.6257 21.5087Z"
            fill="white"
          />
          <path
            className="element-2"
            opacity="0.4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.3779 21.5087C19.1557 20.7309 19.1557 19.4699 18.3779 18.6921L17.1802 17.4945C16.4025 16.7167 15.1414 16.7167 14.3637 17.4945L10.1983 21.6598C9.42056 22.4376 8.15954 22.4376 7.38176 21.6598L7.12201 21.4001C6.74851 21.0266 6.24193 20.8167 5.71372 20.8167H4.13421C3.30402 20.8167 2.5609 21.3317 2.2694 22.109L1.44902 24.2967C1.37336 24.4985 1.33094 24.7112 1.32343 24.9266L0.00146484 62.8228C-0.0455055 64.1693 1.03335 65.2865 2.3807 65.2865C3.20153 65.2865 3.96447 64.8636 4.39951 64.1675L4.66827 63.7375C5.31365 62.7049 6.81754 62.7049 7.46292 63.7375L7.74362 64.1866C8.17123 64.8708 8.92115 65.2865 9.72797 65.2865C11.0766 65.2865 12.1461 64.1495 12.0636 62.8034L11.4927 53.4788C11.4292 52.4414 12.6828 51.8766 13.4178 52.6116C14.1955 53.3894 15.4566 53.3894 16.2343 52.6116L17.432 51.4139C18.2098 50.6361 18.2098 49.3751 17.432 48.5973L11.0698 42.2352C10.8446 42.01 10.6745 41.7344 10.587 41.4281C9.19627 36.559 10.2277 31.6844 11.0039 29.1843C11.0954 28.8899 11.2609 28.6257 11.4789 28.4077L18.3779 21.5087Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default PreLoader;