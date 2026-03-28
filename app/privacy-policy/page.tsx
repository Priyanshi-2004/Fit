import Link from 'next/link';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
                <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
                        <p className="text-neutral-600 mb-8">Last updated: March 28, 2026</p>

                        <div className="prose prose-neutral max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
                                <p className="text-neutral-700 leading-relaxed mb-4">
                                    At FitTransform ("we", "us", "our", or "Company"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our website and services.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Personal Information:</h3>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-4">
                                    <li>Name, email address, phone number</li>
                                    <li>Date of birth, gender, fitness goals</li>
                                    <li>Payment and billing information</li>
                                    <li>Account credentials and password</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Usage Information:</h3>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>Device information (IP address, browser type)</li>
                                    <li>Cookies and tracking technologies</li>
                                    <li>Access logs and analytics data</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>To provide and maintain our services</li>
                                    <li>To send promotional communications and updates</li>
                                    <li>To process transactions and send related information</li>
                                    <li>To detect and prevent fraudulent transactions</li>
                                    <li>To improve and optimize our website and services</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Data Security</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    We implement appropriate technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, no transmission over the Internet or electronic storage is completely secure.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Your Privacy Rights</h2>
                                <p className="text-neutral-700 leading-relaxed mb-4">
                                    You may have certain rights regarding your personal information, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>The right to access your personal information</li>
                                    <li>The right to correct inaccurate data</li>
                                    <li>The right to request deletion of your data</li>
                                    <li>The right to opt-out of promotional communications</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Cookies and Tracking</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Third-Party Links</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We recommend reviewing their privacy policies before providing any personal information.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Changes to This Policy</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services following such modification constitutes your acceptance of the updated policy.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Contact Us</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    If you have questions about this Privacy Policy, please contact us at:
                                </p>
                                <p className="text-neutral-700 mt-4">
                                    Email: <a href="mailto:privacy@fittransform.com" className="text-emerald-600 hover:text-emerald-700">privacy@fittransform.com</a>
                                </p>
                            </section>
                        </div>

                        <div className="mt-12 text-center">
                            <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
