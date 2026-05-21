import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/GenericPage.module.css";

// Helper to format slugs into readable titles
function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CreatorPage({ params }: { params: { slug: string } }) {
  const title = formatTitle(params.slug);

  return (
    <main className={styles.container}>
      <Navbar />

      {/* Ambient background blobs */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <div className={styles.content}>
        <span className={styles.pill}>Creator Hub</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          We are currently building the ultimate toolkit for {title.toLowerCase()}.
          Check back soon to see how TopStake can help you monetize your passion and
          build a thriving community.
        </p>

        <div className={styles.card}>
          <p className={styles.cardText}>
            <strong>Coming soon:</strong> A dedicated platform designed specifically for the unique needs of {title.toLowerCase()}. From tailored earning tools to exclusive community features, everything you need to grow your business is on the way.
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
