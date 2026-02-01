import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Child Safety Standards - Grateful',
  description: 'Child safety standards and CSAM prevention practices for the Grateful app',
};

export default function SafetyPage() {
  const lastUpdated = 'January 19, 2026';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Child Safety Standards</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700">
              Grateful is committed to providing a safe environment for all users. We have zero tolerance 
              for child sexual abuse material (CSAM) or any content that exploits or endangers children. 
              We actively work to prevent, detect, and remove such content from our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Age Requirement</h2>
            <p className="text-gray-700">
              Grateful is intended for users who are 17 years of age or older. We do not knowingly 
              allow users under 17 to create accounts. Users must confirm they are 17 or older 
              during the sign-up process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prohibited Content</h2>
            <p className="text-gray-700 mb-4">
              The following content is strictly prohibited on Grateful:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Child sexual abuse material (CSAM) of any kind</li>
              <li>Content that sexualizes minors</li>
              <li>Content that exploits or endangers children</li>
              <li>Grooming or solicitation of minors</li>
              <li>Any content that violates child safety laws</li>
            </ul>
            <p className="text-gray-700">
              Users who post such content will have their accounts immediately terminated and will 
              be reported to the National Center for Missing & Exploited Children (NCMEC) and 
              appropriate law enforcement authorities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Detection and Prevention</h2>
            <p className="text-gray-700 mb-4">
              We employ the following measures to prevent and detect CSAM:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Age verification during account creation</li>
              <li>User reporting system for flagging inappropriate content</li>
              <li>Manual review of reported content</li>
              <li>Cooperation with law enforcement agencies</li>
              <li>Compliance with applicable child safety laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reporting</h2>
            <p className="text-gray-700 mb-4">
              If you encounter any content that exploits or endangers children, please report it immediately:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                <strong>In-app:</strong> Use the report feature on any entry to flag inappropriate content
              </li>
              <li>
                <strong>Email:</strong> Contact us at{' '}
                <a href="mailto:contact@grateful.so" className="text-green-700 hover:text-green-800">
                  contact@grateful.so
                </a>
              </li>
              <li>
                <strong>NCMEC:</strong> Report directly to the National Center for Missing & Exploited 
                Children at{' '}
                <a href="https://www.missingkids.org/gethelpnow/cybertipline" className="text-green-700 hover:text-green-800" target="_blank" rel="noopener noreferrer">
                  CyberTipline.org
                </a>
              </li>
            </ul>
            <p className="text-gray-700">
              All reports are taken seriously and will be reviewed promptly. We cooperate fully with 
              law enforcement investigations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enforcement</h2>
            <p className="text-gray-700 mb-4">
              When we identify or receive reports of CSAM or child exploitation:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>The content is immediately removed</li>
              <li>The user&apos;s account is permanently terminated</li>
              <li>The incident is reported to NCMEC via the CyberTipline</li>
              <li>We preserve evidence and cooperate with law enforcement</li>
              <li>We may report to additional relevant authorities as required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              For questions about our child safety practices or to report concerns, contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:rahul20patni@gmail.com" className="text-green-700 hover:text-green-800">
                rahul20patni@gmail.com
              </a>
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
