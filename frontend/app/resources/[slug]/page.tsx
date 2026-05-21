import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/GenericPage.module.css";

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const title = formatTitle(params.slug);

  return (
    <main className={styles.container}>
      <Navbar />

      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <div className={styles.content}>
        <span className={styles.pill}>Resources</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          Everything you need to know about TopStake. From guides and tutorials to the latest news and partner integrations.
        </p>

        <div className={styles.card}>
          <p className={styles.cardText}>
            The <strong>{title}</strong> resource hub is currently being populated with the latest information, guides, and support materials to help you make the most out of TopStake.
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
