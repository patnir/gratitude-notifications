import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - Grateful',
  description: 'Contact the Grateful team for support, feedback, or account deletion requests',
};

export default function ContactPage() {
  const supportEmail = 'contact@grateful.so';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">We&apos;re here to help</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              For questions, feedback, or support requests, please email us at:
            </p>
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {supportEmail}
            </a>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Deletion</h2>
            <p className="text-gray-700 mb-4">
              To delete your Grateful account and all associated data, please email us at{' '}
              <a href={`mailto:${supportEmail}?subject=Account%20Deletion%20Request`} className="text-green-700 hover:text-green-800 font-medium">
                {supportEmail}
              </a>{' '}
              with the subject line &quot;Account Deletion Request&quot; and include the email address
              associated with your account.
            </p>
            <p className="text-gray-700 mb-4">
              When you request account deletion, we will permanently delete:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Your profile information (display name, profile picture)</li>
              <li>All gratitude entries you have created</li>
              <li>Your reactions to other entries</li>
              <li>Your circle memberships</li>
              <li>Your notification preferences and push tokens</li>
            </ul>
            <p className="text-gray-700">
              Account deletion requests are processed within 30 days. You will receive a confirmation
              email once your account has been deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Response Time</h2>
            <p className="text-gray-700">
              We aim to respond to all inquiries within 48 hours. For urgent matters, please
              include &quot;Urgent&quot; in your email subject line.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex gap-6">
          <Link
            href="/"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            &larr; Back to Grateful
          </Link>
          <Link
            href="/privacy"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
