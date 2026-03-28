import Link from 'next/link';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function RefundPolicy() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
                <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Refund Policy</h1>
                        <p className="text-neutral-600 mb-8">Last updated: March 28, 2026</p>

                        <div className="prose prose-neutral max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Money-Back Guarantee</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    We stand behind the quality of our courses and coaching services. We offer a 30-day money-back guarantee from the date of your purchase. If you are not completely satisfied with your course(s), you can request a full refund within this period.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Eligibility for Refund</h2>
                                <p className="text-neutral-700 leading-relaxed mb-4">
                                    To be eligible for a refund, you must meet the following conditions:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>You must request the refund within 30 days of purchase</li>
                                    <li>You have not exceeded 50% of course completion</li>
                                    <li>You have not received your purchased course access</li>
                                    <li>The refund request must be made through our official support channels</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Non-Refundable Items</h2>
                                <p className="text-neutral-700 leading-relaxed mb-4">
                                    The following items are NOT eligible for refunds:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>Courses where you have completed more than 50%</li>
                                    <li>Physical products or merchandise (after shipping)</li>
                                    <li>Gift cards or promotional credits</li>
                                    <li>Coaching sessions that have already been conducted</li>
                                    <li>Courses purchased during promotional periods with specific non-refund terms</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. How to Request a Refund</h2>
                                <p className="text-neutral-700 leading-relaxed mb-4">
                                    To request a refund, please follow these steps:
                                </p>
                                <ol className="list-decimal list-inside space-y-2 text-neutral-700">
                                    <li>Contact our support team at support@fittransform.com</li>
                                    <li>Provide your order number and reason for the refund request</li>
                                    <li>Our support team will review your request within 5 business days</li>
                                    <li>Once approved, the refund will be processed to your original payment method</li>
                                </ol>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Refund Processing Time</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    Once your refund request is approved, the refund will be processed within 5-10 business days. Depending on your financial institution, it may take an additional 3-5 business days for the funds to appear in your account. Please note that transaction fees may not be refundable.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Partial Refunds</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    We may issue partial refunds at our discretion based on the circumstances of your request. If you have used a significant portion of the course content or coaching services, the refund amount may be reduced accordingly.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Subscription Refunds</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    For subscription-based plans, you can cancel your subscription at any time through your account settings. You will not be charged for future billing cycles. Refunds for prepaid subscription amounts are available if cancelled within 7 days of purchase.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Exceptions</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    We reserve the right to deny refunds in cases of:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>Fraudulent or suspicious transactions</li>
                                    <li>Breach of our Terms of Service</li>
                                    <li>Requests made beyond the 30-day window</li>
                                    <li>Duplicate purchases where you have already received a refund</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Contact Us</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    For any questions regarding our refund policy, please contact us:
                                </p>
                                <p className="text-neutral-700 mt-4">
                                    Email: <a href="mailto:refunds@fittransform.com" className="text-emerald-600 hover:text-emerald-700">refunds@fittransform.com</a>
                                </p>
                                <p className="text-neutral-700">
                                    Support: <a href="mailto:support@fittransform.com" className="text-emerald-600 hover:text-emerald-700">support@fittransform.com</a>
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Policy Updates</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    FitTransform reserves the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to the website. Your continued purchase and use of our services constitutes your acceptance of any changes to this policy.
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
