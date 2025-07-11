import React from "react";
import styles from "./map.module.css";
import Container from "@/app/components/container/container";
import Title from "@/app/components/custom/Title/title";
import GoogleMap from "@/app/components/google-map/google-map";
import Button from "@/app/components/custom/Button/button";

const MAP_COORDINATES = {
  LOCATION_CENTER: { lat: 50.46474583270466, lng: 30.524312729801466 },
};

const Map: React.FC = () => {
  return (
    <section className={styles.map}>
      <Container>
        <Title className={styles.map__title}>Ми на карті</Title>
        <div className={styles.map__wrapper}>
          <GoogleMap center={MAP_COORDINATES.LOCATION_CENTER} zoom={15} className={styles.map__map} />
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDINATES.LOCATION_CENTER.lat},${MAP_COORDINATES.LOCATION_CENTER.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" className={styles.map__button}>
              Прокласти маршрут
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Map;
