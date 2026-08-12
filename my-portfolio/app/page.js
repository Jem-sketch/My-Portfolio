import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  return(
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* Use styles.heroGrid from your CSS module */}
        <section className={styles.container}>
          <h1>Hello World</h1>
        </section>

        <section className={styles.aboutPreview}>
          <h1>Hello</h1>
        </section>

      </main>
    </div>
  );
}