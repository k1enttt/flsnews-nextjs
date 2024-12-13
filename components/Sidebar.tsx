import React from "react";
import AccordianTags from "./SidebarAccordianTags";

function Sidebar({}) {
  const tags = {
    origin: [
      "China",
      "India",
      "Belgium",
      "Sweden",
      "Germany",
      "Malaysia",
      "Turkey",
      "Italy",
      "New Zealand",
      "Vietnam",
      "Worldwide",
      "Australia",
      "Thailand",
      "Netherland",
      "Japan",
      "Indonesia",
      "Philippines",
      "Europe",
      "Southeast Asia",
      "Singapore",
      "Spain",
    ],
    destination: [
      "Usa",
      "Vietnam",
      "Canada",
      "Belgium",
      "Philippines",
      "Malaysia",
      "Australia",
      "Brazil",
      "Trinidad & Tobago",
      "Japan",
      "Qatar",
      "Germany",
      "Laos",
      "Myanmar",
      "Cambodia",
      "Uae",
      "Middle East",
      "South Africa",
      "Angola",
      "Singapore",
      "Indonesia",
    ],
    commodity: [
      "Surge Bin",
      "Structural Steel",
      "Renewable Energy System",
      "Patrol Boats",
      "Amazon River Cruise Boat",
      "Liftboat",
      "Drydock",
      "Mobile",
      "Shiploader",
      "Steel Structures",
      "Transformer And Accessories",
      "Steel Pipe Column",
      "Floating Pontoons",
      "Steel Beams",
      "Heavy Equipment",
      "Equipment For Pipelines",
      "Dump Trays",
      "General Cargo",
      "Machinery And Equipment",
      "Man Engine",
      "Lifeboats",
      "Gas Turbine Generator",
      "Compressor Modules & E-Houses",
      "Saudi Arabia",
      "Pipe-Racks, Skids, Spools",
      "Substation Module",
      "Waste Heat Recovery Units",
      "Blades And Tower",
      "Vacuum Insulated Pipe Spools",
      "Substation",
      "Modules",
      "Raw Materials",
      "Components For Steel Mills",
    ],
    bussinessUnit: ["Project", "Logistic", "Warehousing", "Trading"],
  };
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <AccordianTags label="Origin" childrenTags={tags.origin} />
          </li>
          <li>
            <AccordianTags
              label="Destination"
              childrenTags={tags.destination}
            />
          </li>
          <li>
            <AccordianTags label="Commodity" childrenTags={tags.commodity} />
          </li>
          <li>
            <AccordianTags
              label="Bussiness Unit"
              childrenTags={tags.bussinessUnit}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
