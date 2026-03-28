import Link from 'next/link';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function TermsOfService() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
                <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Terms of Service</h1>
                        <p className="text-neutral-600 mb-8">Last updated: March 28, 2026</p>

                        <div className="prose prose-neutral max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Agreement to Terms</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    These Terms of Service constitute a legally binding agreement between you and FitTransform ("Company", "we", "us", "our"). By accessing and using this website and our services, you accept and agree to be bound by and comply with these terms and our Privacy Policy.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Use License</h2>
                                <p className="text-neutral-700 leading-relaxed mb-4">
                                    Permission is granted to temporarily download one copy of the materials (information or software) on FitTransform's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose or for any public display</li>
                                    <li>Attempt to decompile or reverse engineer any software</li>
                                    <li>Remove any copyright or other proprietary notations</li>
                                    <li>Transfer the materials to another person or "mirror" the materials</li>
                                    <li>Attempt to gain unauthorized access to any portion or feature of the service</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Disclaimer</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    The materials on FitTransform's website are provided on an 'as is' basis. FitTransform makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Limitations</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    In no event shall FitTransform or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FitTransform's website, even if FitTransform has been notified of the possibility of such damage.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Accuracy of Materials</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    The materials appearing on FitTransform's website could include technical, typographical, or photographic errors. FitTransform does not warrant that any of the materials on its website are accurate, complete, or current. FitTransform may make changes to the materials contained on its website at any time without notice.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Links</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    FitTransform has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by FitTransform of the site. Use of any such linked website is at the user's own risk.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Modifications</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    FitTransform may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Governing Law</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    These Terms and Conditions and any separate agreements we provide to render services are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. User Content</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    You retain all rights to any content you submit, post, or display on or through FitTransform. By submitting content, you grant FitTransform a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute the content.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Account Responsibility</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Contact Us</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <p className="text-neutral-700 mt-4">
                                    Email: <a href="mailto:legal@fittransform.com" className="text-emerald-600 hover:text-emerald-700">legal@fittransform.com</a>
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
