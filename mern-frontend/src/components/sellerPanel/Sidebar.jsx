import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  ShareIcon,
  ChatBubbleBottomCenterTextIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const menu = [
    {
      name: "Overview",
      icon: <Squares2X2Icon className="w-5 h-5" />,
      active: true,
    },
    { name: "Products", icon: <CubeIcon className="w-5 h-5" /> },
    { name: "Customer", icon: <UsersIcon className="w-5 h-5" /> },
    { name: "Orders", icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
    { name: "Shipment", icon: <TruckIcon className="w-5 h-5" /> },
    { name: "Store Setting", icon: <Cog6ToothIcon className="w-5 h-5" /> },
    { name: "Platform Partner", icon: <ShareIcon className="w-5 h-5" /> },
    {
      name: "Feedback",
      icon: <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />,
    },
    {
      name: "Help & Support",
      icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-85 px-5 bg-white  flex flex-col h-screen">
      <div className="w-full uppercase font-thin text-2xl flex items-center justify-center py-5">
        seller dashboard
      </div>

      <nav className="mt-2">
        {menu.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium 
            ${
              item.active
                ? "bg-gray-800 text-white rounded-md"
                : "text-gray-700 hover:bg-gray-100 rounded-md"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
