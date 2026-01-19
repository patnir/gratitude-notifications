import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Grateful',
  description: 'Privacy Policy for the Grateful app',
};

export default function PrivacyPage() {
  const lastUpdated = 'January 19, 2026';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Grateful (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use 
              our mobile application.
            </p>
            <p className="text-gray-700">
              By using Grateful, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Account Information</h3>
            <p className="text-gray-700 mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Email address (for authentication)</li>
              <li>Display name (chosen by you)</li>
              <li>Profile picture (optional)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Content You Create</h3>
            <p className="text-gray-700 mb-4">
              When you use Grateful, we store:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Gratitude entries (text content)</li>
              <li>Photos you attach to entries</li>
              <li>Location data (city, state, country) if you grant permission</li>
              <li>Emoji reactions you add to entries</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Circles and Social Features</h3>
            <p className="text-gray-700 mb-4">
              When you use circles (private groups), we store:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Circle membership information</li>
              <li>Which entries you share to which circles</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Device Information</h3>
            <p className="text-gray-700 mb-4">
              To send you notifications, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Push notification token (device identifier for notifications)</li>
              <li>Device platform (iOS or Android)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide and maintain the Grateful service</li>
              <li>Store and display your gratitude entries</li>
              <li>Enable sharing within your private circles</li>
              <li>Send push notifications (new entries, reactions, reminders)</li>
              <li>Calculate and display your gratitude streak</li>
              <li>Generate your weekly recap</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
            <p className="text-gray-700 mb-4">
              Your data is stored securely using industry-standard practices:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Database hosted on Neon (PostgreSQL) with encryption at rest</li>
              <li>Images stored on Cloudflare R2 with secure access</li>
              <li>Authentication handled by Clerk with secure token management</li>
              <li>All data transmitted over HTTPS</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. Your data is shared only in these circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Within your circles:</strong> Entries you share to a circle are visible to other members of that circle</li>
              <li><strong>Service providers:</strong> We use third-party services (Clerk for authentication, Neon for database, Cloudflare for storage, Expo for notifications) that process data on our behalf</li>
              <li><strong>Legal requirements:</strong> We may disclose information if required by law</li>
            </ul>
            <p className="text-gray-700">
              Private entries (not shared to any circle) are only visible to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              You have control over your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Access:</strong> View all your entries and profile information in the app</li>
              <li><strong>Delete entries:</strong> Delete any gratitude entry at any time</li>
              <li><strong>Leave circles:</strong> Leave any circle (your shared entries remain visible to other members)</li>
              <li><strong>Notification preferences:</strong> Enable or disable reminders in Settings</li>
              <li><strong>Location:</strong> Grant or revoke location permission in your device settings</li>
              <li><strong>Account deletion:</strong> Delete your account through the Settings screen in the app, which permanently removes your profile, entries, and associated data</li>
              <li><strong>Data export:</strong> Request a copy of your data by contacting us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">California Privacy Rights (CCPA)</h2>
            <p className="text-gray-700 mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Right to know what personal information we collect and how it is used</li>
              <li>Right to delete your personal information</li>
              <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, contact us at privacy@grateful.so.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Age Requirement</h2>
            <p className="text-gray-700">
              Grateful is intended for users who are 17 years of age or older. We do not knowingly 
              collect personal information from anyone under 17. If you are under 17, please do not 
              use the App or provide any information to us. If we learn that we have collected personal 
              information from a user under 17, we will delete that information and terminate the account.
              If you believe someone under 17 has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700">
              We retain your data for as long as your account is active. If you delete your account, 
              we will delete your personal information within 30 days, except where we are required 
              to retain it for legal purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy or want to request account deletion, 
              please contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Email:</strong> privacy@grateful.so
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a 
            href="/"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            &larr; Back to Grateful
          </a>
        </div>
      </div>
    </div>
  );
}
