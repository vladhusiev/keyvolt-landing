import ContactForm from "@/app/components/contact-form/conact-form";
import Container from "@/app/components/container/container";
import Title from "@/app/components/custom/Title/title";
import styles from "./contacts.module.css";

const Contacts: React.FC = () => {
  return (
    <section className={styles.contacts}>
      <Container>
        <header className={styles.contacts__header}>
          <Title className={styles.contacts__headerTitle} decorator={false}>
            Зв&apos;язатись з нами
          </Title>
          <p className={styles.contacts__headerDescription}>
            Заповніть форму і наш менеджер зв&apos;яжеться з вами, або оберіть один із зручних способів зв&apos;язку
            нижче
          </p>
        </header>

        <ContactForm className={styles.contacts__form} />
      </Container>
    </section>
  );
};

export default Contacts;
