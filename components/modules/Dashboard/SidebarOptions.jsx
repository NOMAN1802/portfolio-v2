import { IoBagAddSharp } from "react-icons/io5";
import { MdManageAccounts, MdSettings } from "react-icons/md";
import { FaBookmark, FaHome, FaRProject, FaShieldAlt, FaUserEdit, FaUserFriends } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgWebsite } from "react-icons/cg";



const iconMap = {
  IoBagAddSharp: IoBagAddSharp,
  MdManageAccounts: MdManageAccounts,
  MdSettings: MdSettings,
  FaHome: FaHome,
  FaUserFriends: FaUserFriends,
  BsGearFill: BsGearFill,
  FaBookmark: FaBookmark,
  FaUserEdit: FaUserEdit,
  CgWebsite: CgWebsite,
  FaShieldAlt:FaShieldAlt,
};

const SidebarOptions = ({ links, closeSidebar }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-6">
      {links.map((link) => {
        const IconComponent = iconMap[link.icon];
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform ${
              isActive
                ? "active"
                : "text-default-600 hover:bg-default-400 rounded-md"
            }`}
            href={link.href}
            onClick={closeSidebar}
          >
            <IconComponent className="w-6 h-6" />
            <span className="mx-4 font-primary">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarOptions;