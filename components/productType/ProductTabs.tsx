import React from "react";

interface ProductTabProps {
  activeTab: string;
  handleTabClick: (section: string) => void;
}

const menuSections: any[] = ["2S", "3S"];

const ProductTabs = ({ activeTab, handleTabClick }: ProductTabProps) => {
  return (
    <ul className="product-tabs-flex">
      {menuSections.map((section, index) => (
        <li
          key={index}
          className={`product-tabs ${
            activeTab === section ? "active-tab" : "non-active-tab"
          }`}
          onClick={() => handleTabClick(section)}
        >
          <button>{section}</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductTabs;
