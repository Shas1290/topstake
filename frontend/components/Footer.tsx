import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Logo */}
      <div className={styles.topSection}>
        <Link href="/" className={styles.logo}>
          TopStake
        </Link>
      </div>

      {/* Main Grid */}
      <div className={styles.grid}>
        <div className={styles.column}>
          <input type="checkbox" id="footer-creators" className={styles.toggleCheckbox} />
          <label htmlFor="footer-creators" className={styles.columnHeader}>
            <h3>Creators</h3>
            <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </label>
          <div className={styles.columnContent}>
            <ul className={styles.linkList}>
              <li><Link href="/creators/web-developers">Web Developers</Link></li>
              <li><Link href="/creators/video-editors">Video Editors</Link></li>
              <li><Link href="/creators/app-developers">App Developers</Link></li>
              <li><Link href="/creators/logo-designers">Logo Designers</Link></li>
              <li><Link href="/creators/game-devs">Game devs</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <input type="checkbox" id="footer-features" className={styles.toggleCheckbox} />
          <label htmlFor="footer-features" className={styles.columnHeader}>
            <h3>Features</h3>
            <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </label>
          <div className={styles.columnContent}>
            <ul className={styles.linkList}>
              <li><Link href="/features/create-on-your-terms">Create on your terms</Link></li>
              <li><Link href="/features/community">Where real community thrives</Link></li>
              <li><Link href="/features/grow-business">Grow your Business</Link></li>
              <li><Link href="/features/support">Support for your business</Link></li>
              <li><Link href="/features/earning">Earning made easy</Link></li>
              <li><Link href="/features/start-membership">↳ Start a membership</Link></li>
              <li><Link href="/features/setup-shop">↳ Set up a shop</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <input type="checkbox" id="footer-pricing" className={styles.toggleCheckbox} />
          <label htmlFor="footer-pricing" className={styles.columnHeader}>
            <h3>Pricing</h3>
            <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </label>
          <div className={styles.columnContent}>
            <ul className={styles.linkList}>
              <li><Link href="/pricing">Starting a TopStake is free</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <input type="checkbox" id="footer-resources" className={styles.toggleCheckbox} />
          <label htmlFor="footer-resources" className={styles.columnHeader}>
            <h3>Resources</h3>
            <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </label>
          <div className={styles.columnContent}>
            <ul className={styles.linkList}>
              <li><Link href="/resources/for-creators">TopStake for Creators</Link></li>
              <li><Link href="/resources/newsroom">Newsroom</Link></li>
              <li><Link href="/resources/help-center">Help Center & FAQ</Link></li>
              <li><Link href="/resources/partners">Partners & integrations</Link></li>
              <li><Link href="/resources/mobile">Mobile</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <input type="checkbox" id="footer-company" className={styles.toggleCheckbox} />
          <label htmlFor="footer-company" className={styles.columnHeader}>
            <h3>Company</h3>
            <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </label>
          <div className={styles.columnContent}>
            <ul className={styles.linkList}>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/company/press">Press</Link></li>
              <li><Link href="/company/careers">Careers</Link></li>
              <li><Link href="/company/terms">Terms of Use & policies</Link></li>
              <li><Link href="/company/privacy">Privacy policy</Link></li>
              <li><Link href="/company/cookie">Cookie policy</Link></li>
              <li><Link href="/company/accessibility">Accessibility</Link></li>
              <li><Link href="/company/impressum">Impressum</Link></li>
              <li><Link href="/company/brand-assets">Brand assets & guidelines</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Store Buttons */}
      <div className={styles.appButtons}>
        <Link href="#" className={styles.appButton}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.523 15.3414c-.0204-2.8804 2.3488-4.2642 2.4578-4.3312-1.336-1.954-3.4116-2.2227-4.116-2.2536-1.748-.1768-3.4184 1.03-4.3054 1.03-.8882 0-2.2612-1.0037-3.7115-.9768-1.9056.027-3.6653 1.1077-4.6393 2.8028-1.9667 3.41-.5024 8.441 1.4114 11.2096.9317 1.348 2.0305 2.8536 3.4832 2.8 1.4014-.0544 1.9333-.905 3.5358-.905 1.597 0 2.0833.905 3.538.878 1.498-.027 2.4412-1.3737 3.366-2.7212 1.0694-1.5637 1.5126-3.0805 1.5342-3.1595-.034-.0148-2.955-1.1328-2.9542-4.3725zM15.4216 4.708c.7834-.9494 1.3117-2.2678 1.168-3.585-.1.087-.19.066-.3.125-1.1612.4828-2.5856 1.428-3.4074 2.4286-.734.891-1.3533 2.2472-1.18 3.5312 1.338.103 2.868-.696 3.719-1.637v-.004h.0004z" />
          </svg>
          <div className={styles.appButtonText}>
            <span>Download on the</span>
            <span>App Store</span>
          </div>
        </Link>
        <Link href="#" className={styles.appButton}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12l-10.183 10.186c-.198-.168-.31-.403-.31-.698V2.512c0-.295.112-.53.31-.698zM14.544 12.75l2.454 2.453-11.455 6.612 9.001-9.065zM15.228 12.066l3.818-3.818c.28.16.51.358.69.593l-4.508 3.225zM14.544 11.25L5.543 2.185l11.455 6.613-2.454 2.452z" />
          </svg>
          <div className={styles.appButtonText}>
            <span>GET IT ON</span>
            <span>Google Play</span>
          </div>
        </Link>
      </div>

      {/* Bottom Area */}
      <div className={styles.bottomSection}>
        {/* Settings */}
        <div className={styles.settings}>
          <button className={styles.settingButton}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            English (United States)
          </button>
          <button className={styles.settingButton}>
            🇺🇸 United States
          </button>
          <button className={styles.settingButton}>
            $ USD
          </button>
        </div>

        {/* Socials & Address */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.socials}>
            <Link href="#"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></Link>
            <Link href="#"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></Link>
            <Link href="#"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></Link>
            <Link href="#"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></Link>
            <Link href="#"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></Link>
          </div>
          <div className={styles.address}>
            600 Townsend Street, Suite 500 | San Francisco, CA 94103, USA | © TopStake
          </div>
        </div>
      </div>
    </footer>
  );
}
