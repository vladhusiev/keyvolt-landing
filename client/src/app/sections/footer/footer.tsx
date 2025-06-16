import Container from "@/app/components/container/container";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__content}>
          <div className={styles.footer__logo}>
            <Link href="/" className={styles.footer__logoImage}>
              <Image src="/images/logo.svg" alt="logo" width={130} height={50} />
            </Link>
            <p className={styles.footer__logoText}>Ваш партнер з енергетичної незалежності</p>
          </div>

          <div className={styles.footer__nav}>
            <p className={styles.footer__navTitle}>Навігація</p>
            <ul className={styles.footer__navList}>
              <li className={styles.footer__navItem}>
                <Link href="/" className={styles.footer__navLink}>
                  Для кого
                </Link>
              </li>
              <li className={styles.footer__navItem}>
                <Link href="/" className={styles.footer__navLink}>
                  Прицнип роботи
                </Link>
              </li>
              <li className={styles.footer__navItem}>
                <Link href="/" className={styles.footer__navLink}>
                  Економіка
                </Link>
              </li>
              <li className={styles.footer__navItem}>
                <Link href="/" className={styles.footer__navLink}>
                  Кейси
                </Link>
              </li>
              <li className={styles.footer__navItem}>
                <Link href="/" className={styles.footer__navLink}>
                  Про нас
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer__contacts}>
            <p className={styles.footer__contactsTitle}>Контакти</p>
            <div className={styles.footer__contactsList}>
              <p className={styles.footer__contactsItem}>м. Київ, вул. Волоська, 2</p>
              <a href="tel:+380973009000" className={styles.footer__contactsLink}>
                +38 (097) 300 90 00
              </a>
            </div>
          </div>
        </div>
      </Container>

      <svg className={styles.footer__bottomImage} viewBox="0 0 557 89" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0V114.78H22.5517V67.3757H27.5804L63.935 114.78H92.7821L46.3911 55.5705L90.2866 0H61.4353L27.5763 42.9266H22.5559V0H0Z"
          fill="#EEBD00"
          fill-opacity="0.08"
        />
        <path
          d="M138.33 28.0846C111.542 27.4962 93.499 48.0561 93.499 72.6887C93.5029 82.5861 96.8146 92.2011 102.913 100.021C109.011 107.84 117.55 113.42 127.185 115.882C136.82 118.344 147.004 117.548 156.135 113.62C165.265 109.692 172.824 102.854 177.62 94.1833L174.722 93.0901L157.526 86.6095C156.75 88.3219 155.764 89.9323 154.59 91.4042C150.396 96.662 143.912 99.1491 136.635 99.1491C127.039 99.1491 115.833 91.2206 114.507 79.8995H179.323C179.323 79.8244 179.352 79.7493 179.361 79.6742C179.791 77.1737 180.007 74.6414 180.007 72.1045C179.986 50.8227 163.36 28.6312 138.33 28.0846ZM114.621 64.2011C115.933 52.2874 127.069 45.6108 136.795 45.8778C148.207 46.1908 157.501 53.3265 159.242 64.2011H114.621Z"
          fill="#EEBD00"
          fill-opacity="0.08"
        />
        <path
          d="M175.079 30.9673H199.728L219.964 87.3223L220.644 87.3015L240.847 30.9673H263.122L221.004 148.476H197.694L208.615 112.038L175.079 30.9673Z"
          fill="#EEBD00"
          fill-opacity="0.08"
        />
        <path
          d="M263.298 0H288.207L318.782 91.0861H319.604L349.965 0H374.87L334.875 114.73H303.494L263.298 0Z"
          fill="#EEBD00"
          fill-opacity="0.08"
        />
        <path
          d="M410.797 28.3701C401.951 28.3701 393.303 30.98 385.948 35.8697C378.593 40.7594 372.86 47.7093 369.475 55.8406C366.09 63.9719 365.204 72.9193 366.93 81.5514C368.656 90.1836 372.916 98.1127 379.171 104.336C385.426 110.559 393.395 114.798 402.071 116.515C410.747 118.232 419.74 117.351 427.913 113.982C436.085 110.614 443.07 104.911 447.985 97.5928C452.9 90.2748 455.523 81.6712 455.523 72.8699C455.523 67.026 454.367 61.2392 452.119 55.84C449.872 50.4407 446.577 45.5349 442.424 41.4026C438.271 37.2703 433.34 33.9925 427.913 31.7564C422.487 29.5202 416.67 28.3696 410.797 28.3701ZM410.763 97.223C405.897 97.223 401.141 95.7874 397.095 93.0977C393.049 90.408 389.895 86.585 388.033 82.1122C386.171 77.6394 385.684 72.7176 386.633 67.9693C387.583 63.221 389.926 58.8594 393.366 55.4361C396.807 52.0127 401.191 49.6813 405.963 48.7369C410.736 47.7924 415.683 48.2771 420.178 50.1298C424.674 51.9825 428.516 55.1199 431.22 59.1454C433.923 63.1708 435.366 67.9035 435.366 72.7448C435.368 75.9607 434.733 79.1455 433.498 82.1173C432.262 85.0891 430.451 87.7895 428.166 90.0643C425.881 92.3391 423.168 94.1436 420.182 95.3748C417.196 96.606 413.995 97.2397 410.763 97.2397V97.223Z"
          fill="#EEBD00"
          fill-opacity="0.08"
        />
        <path d="M489.038 0H467.686V114.784H489.038V0Z" fill="#EEBD00" fill-opacity="0.08" />
        <path
          d="M556.773 94.797V113.717C556.085 114.109 555.377 114.471 554.65 114.802C550.785 116.553 546.54 117.311 542.304 117.006C538.068 116.701 533.976 115.342 530.405 113.055C526.833 110.768 523.896 107.626 521.863 103.916C519.829 100.206 518.764 96.0474 518.766 91.8217V49.8882H504.87V31.1394H518.766V10.5044H540.118V31.1394H556.156V49.8882H540.118V89.1135C540.114 91.2108 540.915 93.2304 542.358 94.7595C543.876 96.3827 546.623 97.3759 549.026 97.3759C551.429 97.3759 554.13 96.3827 555.649 94.7595L556.773 94.797Z"
          fill="#EEBD00"
          fill-opacity="0.08"
        />
      </svg>
    </footer>
  );
};

export default Footer;
