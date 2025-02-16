import Image from "next/image";
import LogoSvg from "../../public/images/mapola-loading.png";
import AnimatedText from "../AnimatedText";
import styles from "./styles.module.css";
const LoadingScreen = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderContainer}>
        <div className={styles.animationWrapper}>
          <div>
            <Image
              priority
              src={LogoSvg}
              height={300}
              width={300}
              alt="Logo loading"
            />
          </div>
          <div className={styles.pulseRing}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
