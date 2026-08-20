
import styles from "./home.module.css";
import GridTail from "./components/GridTail";


export default function Home() {
  return(
    <div className={styles.page}>
      <main className={styles.main}>
        <GridTail />
        
        {/* Use styles.heroGrid from your CSS module */}
        <section className={styles.container}>
          <h1>Hello World</h1>
        </section>

        <section className={styles.aboutPreview}>
          <h1>hello World</h1>
        </section>

      </main>
    </div>
  );
}