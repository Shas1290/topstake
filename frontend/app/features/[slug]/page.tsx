import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/GenericPage.module.css";

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const title = formatTitle(params.slug);

  return (
    <main className={styles.container}>
      <Navbar />

      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <div className={styles.content}>
        <span className={styles.pill}>Platform Feature</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          Discover how TopStake empowers you to take control. Our comprehensive suite of features is designed to help you succeed on your own terms.
        </p>

        <div className={styles.card}>
          <p className={styles.cardText}>
            We're currently finalizing the detailed documentation for <strong>{title}</strong>. This feature is a core part of the TopStake ecosystem, designed to maximize your creative potential and revenue streams. Stay tuned!
          </p>
        </div>

        <a href="/" className={styles.backLink}>
          ← Return to Home
        </a>
      </div>

      <Footer />
    </main>
  );
}
