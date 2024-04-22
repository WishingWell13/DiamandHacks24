import FileGetter from "./components/FileGetter";
import Waves from "./components/Waves";
import styles from "./page.module.css";

// Homepage.
export default function Home() {
  return (
    <main className={`${styles.main}`}>
      {/* FileGetter contains most functionality and user input */}
      <FileGetter></FileGetter>
      {/* Waves holds the animation of rolling waves displayed in the backgorund */}
      <Waves />
    </main>
  );
}

