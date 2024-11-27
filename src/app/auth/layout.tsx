import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {children}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <p className="text-lg">Uptime Monitoring - </p>
          <p className="italic">Intel about your links under minutes</p>
        </div>
        <svg
          className="animate-beam pointer-events-none absolute right-0 top-0 h-[169%] w-[138%] lg:w-[84%]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2000 3000"
          fill="none"
        >
          <g filter="url(#filter0_f_1065_8)">
            <ellipse
              cx="1924.71"
              cy="273.501"
              rx="1924.71"
              ry="273.501"
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
              fill="white"
              fill-opacity="0.21"
            ></ellipse>
          </g>
          <defs>
            <filter
              id="filter0_f_1065_8"
              x="0.860352"
              y="0.838989"
              width="3785.16"
              height="2840.26"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                stdDeviation="151"
                result="effect1_foregroundBlur_1065_8"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Get Latest Activity About Your Valuable APIs
            </p>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
