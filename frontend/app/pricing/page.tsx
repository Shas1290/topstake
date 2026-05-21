import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/components/GenericPage.module.css";

export default function PricingPage() {
  return (
    <main className={styles.container}>
      <Navbar />

      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <div className={styles.content}>
        <span className={styles.pill}>Pricing</span>
        <h1 className={styles.title}>Simple, Transparent Pricing.</h1>
        <p className={styles.description}>
          Starting on TopStake is completely free. We only succeed when you succeed. 
          No hidden fees, no complicated tiers.
        </p>

        <div className={styles.card}>
          <p className={styles.cardText}>
            <strong>Free to Start:</strong> You can set up your creator profile, build your community, and start publishing content without paying a dime.<br/><br/>
            <strong>Platform Fee:</strong> We take a small flat percentage of the revenue you generate on the platform. More detailed breakdown of transaction fees and processing costs is coming soon!
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
