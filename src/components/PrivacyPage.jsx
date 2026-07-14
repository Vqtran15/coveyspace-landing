import { Helmet } from 'react-helmet-async'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-stone-800 mb-3">{title}</h2>
      <div className="text-stone-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans animate-page-enter">
      <Helmet>
        <title>Privacy Policy — Covey Space</title>
        <meta name="description" content="How Covey Space collects, stores, and protects your data. We never sell your information or share it with advertisers." />
        <link rel="canonical" href="https://www.coveyspace.com/privacy" />
        <meta property="og:url" content="https://www.coveyspace.com/privacy" />
        <meta property="og:title" content="Privacy Policy — Covey Space" />
        <meta property="og:description" content="How Covey Space collects, stores, and protects your data. We never sell your information or share it with advertisers." />
        <meta property="og:image" content="https://www.coveyspace.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy — Covey Space" />
        <meta name="twitter:description" content="How Covey Space collects, stores, and protects your data. We never sell your information or share it with advertisers." />
        <meta name="twitter:image" content="https://www.coveyspace.com/og-image.png" />
      </Helmet>
      <Nav />

      <section className="px-6 py-16 bg-gradient-to-b from-jade-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-league-gothic text-5xl sm:text-6xl text-stone-900 tracking-wide mb-3">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm">Last Updated: July 13, 2026</p>
        </div>
      </section>

      <section className="px-6 pb-24 bg-white">
        <div className="max-w-2xl mx-auto">

          <Section title="Who we are">
            <p>
              Covey Space is a community coordination app that helps small groups stay organized and connected.
              It is operated by Vuong Tran, an individual based in the United States ("we", "us", "our").
              You can reach us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>.
            </p>
            <p>
              Covey Space is a passion project funded entirely by voluntary user donations. We do not
              monetize your data or lock features behind commercial paywalls.
            </p>
          </Section>

          <Section title="What we collect">
            <p>When you create an account or use Covey Space, we collect:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Your name and email address</li>
              <li>Your group membership and any invite codes you've used</li>
              <li>Content you create: messages, photos, prayer requests, birthdays, meal signups, and service schedule entries</li>
              <li>Push notification subscription data — if you enable push notifications, your browser generates a unique push subscription endpoint that we store in order to deliver notifications to your device</li>
              <li>Basic usage events through Google Analytics and Google Tag Manager (e.g. when you sign up or log in) — no personally identifiable information is included in these events</li>
            </ul>
            <p>
              Some content you submit — such as prayer requests — is personal and may be sensitive in nature.
              We treat this content with care and it is visible only to members of your group.
            </p>
          </Section>

          <Section title="Cookies and tracking technologies">
            <p>
              We use Google Tag Manager (GTM) and Google Analytics 4 (GA4) to collect basic usage analytics.
              GTM and GA4 may set cookies or use similar browser storage technologies to track events such
              as sign-ups and logins. These cookies do not contain personally identifiable information.
            </p>
            <p>
              You can disable cookies in your browser settings at any time. Doing so may affect
              some functionality of the app but will not prevent you from using the core service.
            </p>
          </Section>

          <Section title="Push notifications">
            <p>
              If you choose to enable push notifications, your browser will create a push subscription
              endpoint — a unique URL that allows us to send notifications to your device. We store
              this endpoint in our database solely to deliver notifications related to your group
              activity (such as new messages or upcoming events).
            </p>
            <p>
              You can revoke push notification permission at any time through your browser or device
              settings. When you do, we will no longer be able to send notifications to that device.
              You can also manage notification preferences in the app's Settings.
            </p>
          </Section>

          <Section title="How we use your data">
            <p>
              We use your data solely to provide the Covey Space service — to show your group's information
              to members of your group, and to let everyone coordinate together. We do not sell your data,
              share it with advertisers, or use it for any purpose beyond operating the app.
            </p>
            <p>
              We send transactional emails — such as password reset links, new account notifications, and
              group activity alerts — through Resend, our email delivery provider. Your email address is
              transmitted to Resend only for the purpose of delivering these messages.
            </p>
            <p>
              If you opt in to email communications, we may occasionally send you product updates or
              announcements about Covey Space. You can unsubscribe from these emails at any time by
              clicking the unsubscribe link in any email we send.
            </p>
          </Section>

          <Section title="Who can see your data">
            <p>
              Your messages, prayer requests, birthdays, and other content are visible only to members
              of your group. Covey Space staff may access data when necessary to operate and maintain
              the service (for example, investigating a bug or responding to a support request).
            </p>
          </Section>

          <Section title="Third-party services">
            <p>
              We use the following third-party services to operate Covey Space. Each has its own
              privacy policy and data practices:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong>Supabase</strong> — our database, file storage, and authentication provider.
                Your account data, group content, and uploaded photos are stored on Supabase's
                infrastructure in the United States. Supabase encrypts data at rest and in transit
                and also handles transactional auth emails such as password resets.{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-jade hover:underline">Supabase Privacy Policy</a>
              </li>
              <li>
                <strong>Resend</strong> — our transactional email delivery provider. We use Resend to
                send new account notifications, group alerts, and other service emails. Your email
                address is transmitted to Resend solely for email delivery purposes.{' '}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-jade hover:underline">Resend Privacy Policy</a>
              </li>
              <li>
                <strong>Google Tag Manager &amp; Google Analytics 4</strong> — used to collect basic
                usage analytics events. No personally identifiable information is sent to Google
                through these services.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-jade hover:underline">Google Privacy Policy</a>
              </li>
            </ul>
            <p>
              We do not use any advertising networks, data brokers, or additional third-party analytics
              services beyond those listed above.
            </p>
          </Section>

          <Section title="Your rights (US state and international regulations)">
            <p>Depending on where you live, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Correct</strong> — ask us to correct inaccurate information in your account</li>
              <li><strong>Delete</strong> — request that we delete your account and all associated data</li>
              <li><strong>Export</strong> — request your data in a portable format</li>
              <li><strong>Object</strong> — object to certain types of processing, such as analytics</li>
            </ul>
            <p>
              Depending on your state of residence — including California, Virginia, Colorado, and
              others with enacted privacy legislation — you may have specific rights regarding your
              personal information, including the right to opt out of data collection and request
              deletion. We honor these rights for all US users regardless of which state you live in.
            </p>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>.
              We will respond within 30 days. We may ask you to verify your identity before fulfilling a request.
            </p>
            <p>
              If you are located in the European Union, United Kingdom, or another jurisdiction with
              applicable data protection laws, you may have additional rights under those laws and the
              right to lodge a complaint with your local data protection authority.
            </p>
          </Section>

          <Section title="Data storage">
            <p>
              Your data is stored in the United States through Supabase. If you access Covey Space from
              outside the United States, your information will be transferred to and processed in the
              United States, where data protection laws may differ from those in your country. By using
              Covey Space, you consent to this transfer.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              Your data is retained for as long as your account is active. If you'd like your account and
              all associated data deleted, email us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>{' '}
              and we'll take care of it within 30 days.
            </p>
            <p>
              If your group is removed by an administrator, the group's content (messages, signups,
              prayer requests, photos) will also be permanently deleted.
            </p>
          </Section>

          <Section title="Data security and limitation of liability">
            <p>
              We take reasonable technical and organizational measures to protect your data against
              unauthorized access, loss, or disclosure — including encryption at rest and in transit
              provided by Supabase, and access controls on our systems.
            </p>
            <p>
              In the event of a data breach that affects your personal information, we will notify
              affected users by email within 72 hours of becoming aware of the breach, to the extent
              required by applicable law. The notification will describe what happened, what data was
              affected, and what steps we are taking.
            </p>
            <p>
              Covey Space is provided on an "as-is" and "as-available" basis. To the maximum extent
              permitted by law, Vuong Tran shall not be liable for any indirect, incidental, or
              consequential damages resulting from your use of the service or any unauthorized access
              to your data.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p>
              Covey Space is not directed at children under 13. We do not knowingly collect personal
              information from children under 13. If you believe we have inadvertently collected such
              information, please contact us and we will delete it promptly.
            </p>
            <p>
              Users between the ages of 13 and 17 may use Covey Space with the knowledge and consent
              of a parent or guardian.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. When we make material changes, we will
              notify registered users by email before the changes take effect. The updated date at
              the top of this page will always reflect when the policy was last revised.
            </p>
            <p>
              Your continued use of Covey Space after the effective date of any changes constitutes
              your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              This policy is governed by the laws of the United States. Any disputes arising from
              this policy or our data practices will be resolved under applicable United States federal
              and state law.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or how we handle your data? Email us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>.
              We take privacy seriously and will respond to all inquiries promptly.
            </p>
          </Section>

        </div>
      </section>

      <Footer />
    </div>
  )
}
