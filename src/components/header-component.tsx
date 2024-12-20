import React from "react";

const HeaderComponent: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">Feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
