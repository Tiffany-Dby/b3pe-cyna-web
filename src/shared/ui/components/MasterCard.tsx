import type { SVGProps } from "react";

const MasterCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="7" cy="12" r="7" fill="#EA001B" />
      <circle cx="17" cy="12" r="7" fill="#FFA200" fillOpacity=".8" />
    </g>
  </svg>
);

export default MasterCard;
