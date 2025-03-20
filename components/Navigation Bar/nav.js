"use client";

import { LucideQrCode, ScanIcon, Settings, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AOS from "aos";
import { useKindeBrowserClient } from "@node_modules/@kinde-oss/kinde-auth-nextjs";
import "aos/dist/aos.css";

export default function Nav() {
  const { user } = useKindeBrowserClient();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  useEffect(() => {
    AOS.init({});
  }, []);
  const menuItem = [
    {
      id: 1,
      name: "Scanner",
      path: "/Generator/Scanner",
      icon: ScanIcon,
    },

    {
      id: 2,
      name: "Generator",
      path: "/Generator",
      icon: LucideQrCode,
    },

    {
      id: 3,
      name: "Settings",
      icon: Settings,
      path: "/Generator/Settings",
    },

    // {
    //   id: 4,
    //   name: "IDK",
    //   path: "/Generator/Idk",
    //   icon: Settings2,
    // },
  ];
  return (
    <div className={" fixed p-1 border h-screen w-12  top-10 bg-white mr-3 "}>
      {menuItem.map((menu, index) => (
        <Link href={menu.path} key={menu.id}>
          <div
            className={` flex gap-3 mb-8 h-7 w-7  justify-center place-content-center  mr-1  hover:bg-black hover:text-white hover:rounded-sm   ${
              path == menu.path &&
              " bg-blue-400 ring-cyan-900 text-white rounded-sm"
            }`}
          >
            <menu.icon
              className={" flex  justify-center place-content-center mb-10"}
            />
          </div>
        </Link>
      ))}

    </div>
  );
}
