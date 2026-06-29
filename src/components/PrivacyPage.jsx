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
      <Nav />

      <section className="px-6 py-16 bg-gradient-to-b from-jade-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-league-gothic text-5xl sm:text-6xl text-stone-900 tracking-wide mb-3">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <section className="px-6 pb-24 bg-white">
        <div className="max-w-2xl mx-auto">

          <Section title="Who we are">
            <p>
              Covey Space ("we", "us", "our") is a community coordination app that helps small groups
              stay organized and connected. You can reach us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>.
            </p>
          </Section>

          <Section title="What we collect">
            <p>When you create an account or use Covey Space, we collect:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Your name and email address</li>
              <li>Your group membership and any invite codes you've used</li>
              <li>Content you create: messages, photos, prayer requests, birthdays, meal signups, and service schedule entries</li>
              <li>Basic usage data through Google Tag Manager (e.g. when you sign up or log in) — no personally identifiable information is included in these events</li>
            </ul>
          </Section>

          <Section title="How we use your data">
            <p>
              We use your data solely to provide the Covey Space service — to show your group's information
              to members of your group, and to let everyone coordinate together. We do not sell your data,
              share it with advertisers, or use it for any purpose beyond operating the app.
            </p>
          </Section>

          <Section title="Who can see your data">
            <p>
              Your messages, prayer requests, birthdays, and other content are visible only to members of your group.
              Covey Space staff may access data when necessary to operate and maintain the service (for example,
              investigating a bug or responding to a support request).
            </p>
          </Section>

          <Section title="Data storage">
            <p>
              Your data is stored securely through{' '}
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-jade hover:underline">Supabase</a>,
              a cloud infrastructure provider. Data is stored in the United States. Supabase encrypts data
              at rest and in transit.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              Your data is retained for as long as your account is active. If you'd like your account and
              data deleted, email us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>{' '}
              and we'll take care of it within 30 days.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p>
              Covey Space is not directed at children under 13. We do not knowingly collect personal
              information from children under 13. If you believe we have inadvertently collected such
              information, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. When we do, we'll update the date at the top
              of this page. Continued use of the app after changes are posted constitutes your acceptance
              of the updated policy.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or how we handle your data? Email us at{' '}
              <a href="mailto:hello@coveyspace.com" className="text-jade hover:underline">hello@coveyspace.com</a>.
            </p>
          </Section>

        </div>
      </section>

      <Footer />
    </div>
  )
}
