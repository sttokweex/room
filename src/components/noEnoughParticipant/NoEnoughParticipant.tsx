import './NoEnoughParticipant.scss';
const NoEnoughParticipant = () => {
  return (
    <div className="mainBlockP">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 17.523 6.977 22 12.5 22C18.023 22 22.5 17.523 22.5 12C22.5 6.477 18.023 2 12.5 2ZM11.75 7.5C11.75 7.086 12.086 6.75 12.5 6.75C12.914 6.75 13.25 7.086 13.25 7.5V12.071C13.25 12.485 12.914 12.821 12.5 12.821C12.086 12.821 11.75 12.485 11.75 12.071V7.5ZM12.52 16.5C11.968 16.5 11.5149 16.052 11.5149 15.5C11.5149 14.948 11.958 14.5 12.51 14.5H12.52C13.073 14.5 13.52 14.948 13.52 15.5C13.52 16.052 13.072 16.5 12.52 16.5Z"
          fill="#EEEDE9"
        />
      </svg>
      <h3> There we&apos;re not enough participants.</h3>
    </div>
  );
};

export default NoEnoughParticipant;
