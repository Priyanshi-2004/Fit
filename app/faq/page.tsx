'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

interface FAQItem {
    category: string;
    questions: {
        question: string;
        answer: string;
    }[];
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const faqData: FAQItem[] = [
        {
            category: 'Getting Started',
            questions: [
                {
                    question: 'How do I create an account?',
                    answer:
                        'To create an account, click the "Get Started" button on our homepage, fill in your details (email, password, name), and verify your email address. Once verified, your account will be active and ready to use.',
                },
                {
                    question: 'What are the different subscription plans?',
                    answer:
                        'We offer three plans: Basic (₹999) with limited video access and basic workout plans, Standard (₹1,999) with full video access and personalized diet plans, and Premium (₹3,999) with everything in Standard plus 1-on-1 personal coaching and private community access.',
                },
                {
                    question: 'Can I upgrade my plan anytime?',
                    answer:
                        'Yes, you can upgrade your plan at any time from your account dashboard. The upgrade will be effective immediately, and any price difference will be charged to your account.',
                },
                {
                    question: 'Is there a free trial available?',
                    answer:
                        'We do not offer a free trial, but we provide a 30-day money-back guarantee for all courses. If you are not satisfied within 30 days, you can request a full refund.',
                },
            ],
        },
        {
            category: 'Account & Billing',
            questions: [
                {
                    question: 'What payment methods do you accept?',
                    answer:
                        'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, net banking, and UPI payments through Razorpay.',
                },
                {
                    question: 'How do I update my profile information?',
                    answer:
                        'You can update your profile information by logging into your account and going to "Settings" or "Account Details". You can edit your name, email, phone number, and fitness goals.',
                },
                {
                    question: 'How do I reset my password?',
                    answer:
                        'Click the "Forgot Password" link on the login page, enter your email address, and follow the instructions sent to your email to reset your password.',
                },
                {
                    question: 'Is my payment information secure?',
                    answer:
                        'Yes, all payment transactions are processed securely through Razorpay, a PCI-DSS compliant payment gateway. We never store your complete card information on our servers.',
                },
            ],
        },
        {
            category: 'Courses & Content',
            questions: [
                {
                    question: 'How long do I have access to the courses?',
                    answer:
                        'Once you purchase a course, you have lifetime access to all course materials. You can access the videos and resources anytime from your dashboard.',
                },
                {
                    question: 'Can I download videos for offline viewing?',
                    answer:
                        'Offline download features are available for Premium members. Standard and Basic plans do not include download functionality.',
                },
                {
                    question: 'Are the coaching sessions live or recorded?',
                    answer:
                        'Premium members receive 1-on-1 personal coaching sessions that are scheduled based on availability. These are live sessions conducted via video call. Other course content is pre-recorded.',
                },
                {
                    question: 'What if I miss a coaching session?',
                    answer:
                        'If you miss a scheduled coaching session, contact our support team within 24 hours to reschedule. We will try to accommodate your request based on your coach\'s availability.',
                },
                {
                    question: 'Can I share my course access with others?',
                    answer:
                        'No, course access is personal and non-transferable. Each person needs their own account and subscription. Sharing credentials is a violation of our Terms of Service.',
                },
            ],
        },
        {
            category: 'Technical Support',
            questions: [
                {
                    question: 'What devices can I use to access FitTransform?',
                    answer:
                        'You can access FitTransform on any device with a web browser - computers, tablets, and smartphones. We also have a mobile app available for iOS and Android.',
                },
                {
                    question: 'Videos are not loading properly. What should I do?',
                    answer:
                        'Try clearing your browser cache and cookies, or use a different browser. Ensure your internet connection is stable. If the problem persists, contact our support team with your device details.',
                },
                {
                    question: 'I keep getting logged out. Why?',
                    answer:
                        'This usually happens if your session has expired. Login again, and make sure to check the "Remember me" option if you want to stay logged in longer. Clear your cookies if the problem continues.',
                },
                {
                    question: 'What internet speed do I need?',
                    answer:
                        'For smooth streaming, we recommend at least 2 Mbps for SD quality and 5 Mbps for HD quality. You can adjust the video quality in your player settings.',
                },
            ],
        },
        {
            category: 'Refunds & Cancellations',
            questions: [
                {
                    question: 'What is your refund policy?',
                    answer:
                        'We offer a 30-day money-back guarantee from the purchase date. If you have completed less than 50% of the course, you are eligible for a full refund.',
                },
                {
                    question: 'How do I cancel my subscription?',
                    answer:
                        'You can cancel your subscription anytime from your account settings under "Subscriptions". Your access will continue until the end of your billing cycle.',
                },
                {
                    question: 'Will I lose access to my course after cancellation?',
                    answer:
                        'For one-time purchases, you keep lifetime access even after cancellation. For subscriptions, access is available until the end of your billing period.',
                },
                {
                    question: 'How long does a refund take?',
                    answer:
                        'Approved refunds are processed within 5-10 business days. Depending on your bank, it may take an additional 3-5 business days for the funds to appear in your account.',
                },
            ],
        },
        {
            category: 'Community & Support',
            questions: [
                {
                    question: 'Is there a community forum?',
                    answer:
                        'Premium members have access to our exclusive private community where you can connect with other members, share progress, and get support from coaches.',
                },
                {
                    question: 'How do I get in touch with support?',
                    answer:
                        'You can contact our support team via email at support@fittransform.com, through live chat on our website, or by calling +91 98765 43210 (Mon-Fri, 10 AM - 5 PM IST).',
                },
                {
                    question: 'Do you have a mobile app?',
                    answer:
                        'Yes, our mobile app is available for both iOS and Android. You can download it from the App Store or Google Play Store and use your existing account credentials to login.',
                },
                {
                    question: 'Can I get personalized recommendations?',
                    answer:
                        'Yes, Premium members get personalized recommendations from their assigned coach based on their fitness level and goals. Standard members have access to community recommendations.',
                },
            ],
        },
    ];

    const toggleQuestion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
                {/* Header */}
                <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-neutral-600">
                            Find answers to common questions about FitTransform
                        </p>
                    </div>
                </div>

                {/* FAQ Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {faqData.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-12">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">{section.category}</h2>
                            <div className="space-y-3">
                                {section.questions.map((item, itemIndex) => {
                                    const itemId = `${sectionIndex}-${itemIndex}`;
                                    const isOpen = openIndex === itemId;

                                    return (
                                        <div
                                            key={itemId}
                                            className="border border-neutral-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors"
                                        >
                                            <button
                                                onClick={() => toggleQuestion(itemId)}
                                                className="w-full px-6 py-4 text-left font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
                                            >
                                                {item.question}
                                                <ChevronDown
                                                    className={`h-5 w-5 text-neutral-600 transition-transform ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            {isOpen && (
                                                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                                                    <p className="text-neutral-700 leading-relaxed">{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Still need help section */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center mt-16">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Didn't find your answer?</h3>
                        <p className="text-neutral-700 mb-6">
                            Contact our support team and we'll be happy to help!
                        </p>
                        <Link href="/help-center" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                            Visit Help Center →
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
