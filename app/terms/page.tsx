import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Grateful',
  description: 'Terms of Service for the Grateful app',
};

export default function TermsPage() {
  const lastUpdated = 'February 9, 2026';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700">
              By downloading, installing, or using Grateful (&quot;the App&quot;), you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, do not use the App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700">
              Grateful is a gratitude journaling application that allows you to record daily gratitude 
              entries, attach photos and location information, and share entries with private groups 
              called &quot;circles.&quot; The App is provided free of charge.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Age Requirement</h2>
            <p className="text-gray-700 mb-4">
              <strong>You must be at least 17 years old to use Grateful.</strong> By creating an account, 
              you confirm that you are 17 years of age or older. We do not knowingly allow users under 
              17 to create accounts. If we discover that a user is under 17, we will terminate their 
              account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-700 mb-4">
              To use Grateful, you must create an account using a valid email address. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate account information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Content</h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of all content you create in Grateful (entries, photos, etc.). 
              By using the App, you grant us a limited license to store and display your content 
              as necessary to provide the service.
            </p>
            <p className="text-gray-700 mb-4">
              You agree not to post content that:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Is illegal, harmful, or violates others&apos; rights</li>
              <li>Contains or promotes child sexual abuse material (CSAM)</li>
              <li>Harasses, threatens, bullies, or promotes violence against others</li>
              <li>Contains hate speech or discrimination</li>
              <li>Contains malware or malicious code</li>
              <li>Infringes on intellectual property rights</li>
              <li>Is spam or deceptive content</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We reserve the right to remove any content and terminate any account that violates 
              these guidelines, without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Circles and Sharing</h2>
            <p className="text-gray-700 mb-4">
              Circles are private groups for sharing gratitude entries. When you share an entry to a circle:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>All current members of that circle can view the entry</li>
              <li>Future members who join the circle can also view previously shared entries</li>
              <li>If you leave a circle, your shared entries remain visible to other members</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You are responsible for only sharing content you are comfortable with circle members seeing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 mb-4">
              You agree to use Grateful only for its intended purpose of gratitude journaling and 
              positive social sharing. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Use the App for any illegal purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Create multiple accounts for abusive purposes</li>
              <li>Use automated systems to access the App</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reporting Content and Blocking Users</h2>
            <p className="text-gray-700 mb-4">
              If you encounter content that violates these Terms, you may report it through the App 
              using the report feature on any entry. You may also block users whose content you find 
              objectionable. Blocked users&apos; content will be immediately hidden from your feed.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>We commit to reviewing all content reports within 24 hours.</strong> When we 
              determine that content violates these Terms, we will remove the content and may 
              terminate the account of the user who posted it.
            </p>
            <p className="text-gray-700">
              We take all reports seriously and will take appropriate action, which may include 
              removing content, issuing warnings, or terminating accounts for repeat or serious violations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700">
              The Grateful app, including its design, features, and branding, is owned by us and 
              protected by intellectual property laws. You may not copy, modify, or distribute 
              the App or its components without our permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-700">
              Grateful is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
              that the App will be uninterrupted, error-free, or secure. We are not responsible 
              for any data loss that may occur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700">
              To the maximum extent permitted by law, we shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of the App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your account at any time if you violate 
              these terms, without prior notice or liability.
            </p>
            <p className="text-gray-700">
              You may delete your account at any time through the Settings screen in the App. 
              When you delete your account, your personal information and entries will be permanently 
              removed, except where we are required to retain data for legal purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dispute Resolution</h2>
            <p className="text-gray-700">
              Any disputes arising from these Terms or your use of the App shall be resolved through 
              binding arbitration in accordance with the rules of the American Arbitration Association. 
              You agree to waive any right to a jury trial or to participate in a class action lawsuit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms of Service from time to time. Continued use of the App 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Email:</strong> contact@grateful.so
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
