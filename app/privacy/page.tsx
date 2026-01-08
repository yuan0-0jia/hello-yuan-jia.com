export const metadata = {
  title: "Privacy",
};

export const dynamic = "force-static";

export default async function Page() {
  return (
    <div className="mx-4 md:mx-12 lg:mx-20 my-12 md:my-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="max-w-3xl">
        <header className="text-center mb-12">
          <div className="vintage-divider mb-6">
            <span className="text-sepia-400 dark:text-sepia-500">✦</span>
          </div>
          <h1 className="font-typewriter text-2xl md:text-3xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
          Privacy Policy
        </h1>
          <p className="font-typewriter text-sm text-sepia-500 dark:text-sepia-400 tracking-wider">
            Effective Date: <span className="text-sepia-600 dark:text-sepia-300">Oct 29, 2024</span>
        </p>
        </header>

        <div className="font-typewriter text-sm md:text-base tracking-wide">
          <section className="mb-10">
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            hello-yuan-jia.com is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and share information
            when you use our services and integrate your Google account via
            Google OAuth.
          </p>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
            1. Information We Collect
          </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            When you log in to hello-yuan-jia.com using your Google account, we
            receive the following information, depending on the permissions you
            grant:
          </p>
            <ul className="list-disc pl-6 mt-3 text-warmGray-700 dark:text-warmGray-200 space-y-2 leading-loose">
            <li>
              Basic profile information (e.g., name, email address, profile
              picture)
            </li>
          </ul>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
            2. How We Use Your Information
          </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            We use the information collected via Google OAuth solely for the
            purposes of providing and enhancing our services:
          </p>
            <ul className="list-disc pl-6 mt-3 text-warmGray-700 dark:text-warmGray-200 space-y-2 leading-loose">
            <li>To authenticate your account</li>
            <li>To personalize your experience</li>
            <li>To provide specific app functionality</li>
          </ul>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
            3. How We Share Your Information
          </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            We do not sell, rent, or trade your information to third parties. We
            may share information with trusted third-party services only to the
            extent necessary to provide our services.
          </p>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
              4. Data Retention
            </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            We retain the information collected via Google OAuth for as long as
            it is needed to provide our services, comply with our legal
            obligations, resolve disputes, or enforce our agreements. When no
            longer necessary, we securely delete or anonymize the data.
          </p>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
              5. Data Security
            </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            We implement industry-standard security measures to protect your
            information from unauthorized access, alteration, disclosure, or
            destruction. However, please note that no method of electronic
            storage or transmission is completely secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
            6. Your Choices and Controls
          </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 text-warmGray-700 dark:text-warmGray-200 space-y-2 leading-loose">
            <li>
              Revoke our access to your Google account at any time via your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                  className="text-sepia-600 dark:text-sepia-400 hover:underline"
              >
                Google Account Settings
              </a>
              .
            </li>
            <li>
              Request access to, correction, or deletion of any personal data we
              have stored.
            </li>
          </ul>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
            7. Children&apos;s Privacy
          </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            Our services are not intended for children under the age of 13, and
            we do not knowingly collect personal information from children under
            13. If we become aware that we have collected personal information
            from a child under 13, we will take steps to delete it as soon as
            possible.
          </p>
        </section>

          <section className="mb-10">
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
            8. Changes to This Privacy Policy
          </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            We may update our Privacy Policy from time to time. When we do, we
            will notify you by updating the &quot;Effective Date&quot; at the
            top of this policy. We encourage you to review this policy
            periodically.
          </p>
        </section>

        <section>
            <h2 className="font-typewriter text-lg md:text-xl text-warmGray-800 dark:text-cream tracking-wide mb-4">
              9. Contact Us
            </h2>
            <p className="text-warmGray-700 dark:text-warmGray-200 leading-loose">
            If you have any questions about this Privacy Policy or our
            practices, please contact us at:
            <br />
            <a
              href="mailto:hello.yuanjia@gmail.com"
                className="text-sepia-600 dark:text-sepia-400 hover:underline"
            >
              hello.yuanjia@gmail.com
            </a>
          </p>
        </section>
        </div>
      </div>
    </div>
  );
}
