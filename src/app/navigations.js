import appStyles from "./app.module.css";
import Image from "next/image";
export function QuickAccess({ handleAdd, handleMenu, handleStats, icon }) {
  return (
    <div className={appStyles.quickAccess}>
      <div onClick={handleMenu}>
        <Image height={40} width={40} src={"/icons/app-blue.png"} alt="menu" />
      </div>
      <div className={appStyles.circleFrame} onClick={handleAdd}>
        <Image height={40} width={40} src={icon.src} alt={icon.name} />
      </div>
      <div onClick={handleStats}>
        <Image height={40} width={40} src={"/icons/app-blue.png"} alt="menu" />
      </div>
    </div>
  );
}
