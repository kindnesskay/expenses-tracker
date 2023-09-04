import Image from "next/image";
import appStyles from "./app.module.css";
export default function Successful({ data }) {
  return (
    <div className={appStyles.successPage}>
      <div className={appStyles.success}>
        <h1>Success </h1>
        <span className={appStyles.circleFrame}>
          <Image
            src={"/icons/success-48.png"}
            width={30}
            height={30}
            alt="success icon"
          />
        </span>
      </div>

      <span className={appStyles.circleFrame}>
        <Image height={140} width={140} src={"/icons/success-144.png"} />
      </span>
      <div className={appStyles.details}>
        <span className={appStyles.date}>date</span>
        <span>note</span>
      </div>
      <button className={appStyles.successPageHomeBtn}>Home</button>
    </div>
  );
}
