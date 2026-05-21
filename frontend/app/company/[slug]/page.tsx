import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/GenericPage.module.css";

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const title = formatTitle(params.slug);

  return (
    <main className={styles.container}>
      <Navbar />

      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <div className={styles.content}>
        <span className={styles.pill}>Company</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          Transparency, trust, and our mission. Read our official documentation, policies, and company information.
        </p>

        <div className={styles.card}>
          <p className={styles.cardText}>
            Our <strong>{title}</strong> documentation is currently being reviewed by our legal and communications teams to ensure it reflects our latest standards and commitments to our community.
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
