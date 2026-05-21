"use client";
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './contact.module.css';
import Navbar from '@/components/Navbar';

// export const metadata: Metadata = {
//   title: 'Contact Us | TopStake',
//   description: 'Get in touch with the TopStake team. We are here to help you build your next big idea.',
// };
import { useState } from 'react';

export default function ContactPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add your unique Web3Forms key here
    formData.append("access_key", "856f3bd3-a34e-44f1-b413-176eb1ddd503");

    try {
      // Send to Web3Forms (admin notification)
      const web3Response = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      // Also send to our own API route to trigger the thank-you email
      const backendResponse = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      // Wait for both, but only check Web3Forms for success toast
      const [w3Res] = await Promise.all([web3Response, backendResponse.catch(() => null)]);

      if (w3Res.ok) {
        setToastMessage("Message sent successfully.");
        setShowToast(true);
        form.reset();
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setToastMessage("Something went wrong. Please try again.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    } catch (error) {
      console.error(error);
      setToastMessage("An error occurred. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  }

  return (
    <main className={styles.container}>
      {/* Background Ambient Orbs */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        
        {/* Left Side: Info */}
        <div className={styles.infoSection}>
          <h1 className={styles.title}>Let's talk.</h1>
          <p className={styles.description}>
            Have a project in mind or just want to say hi? We'd love to hear from you. 
            Fill out the form and our team will get back to you within 24 hours.
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.detailText}>
                <h3>Email</h3>
                <p>shashank.gupta163873@gmail.com</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className={styles.detailText}>
                <h3>Phone</h3>
                <p>+91 6268463909</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.detailText}>
                <h3>Office</h3>
                <p>123 Innovation Drive<br/>San Francisco, CA 94103</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" className={styles.input} placeholder="John Doe" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" className={styles.input} placeholder="john@example.com" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" className={styles.input} placeholder="How can we help?" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className={styles.textarea} placeholder="Tell us about your project..." required></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div id="toast-simple" className="flex items-center w-full max-w-sm p-4 text-[#a1a5b5] bg-[rgba(10,10,10,0.95)] backdrop-blur-[18px] rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/[0.06]" role="alert">
            <svg className="w-5 h-5 text-indigo-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
            </svg>
            <div className="ms-2.5 text-sm border-s border-white/[0.1] ps-3.5 text-white">{toastMessage}</div>
            <button type="button" onClick={() => setShowToast(false)} className="ms-auto flex items-center justify-center text-[#a1a5b5] hover:text-white bg-transparent box-border border border-transparent hover:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.1] font-medium leading-5 rounded-lg text-sm h-8 w-8 focus:outline-none transition-colors" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
