import { Mail, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function HelpCenter() {
    const helpCategories = [
        {
            title: 'Getting Started',
            description: 'Learn how to get started with FitTransform',
            items: [
                'How do I create an account?',
                'How do I choose the right plan?',
                'What systems do I need to access the courses?',
            ],
        },
        {
            title: 'Account & Billing',
            description: 'Manage your account and subscription',
            items: [
                'How do I update my profile?',
                'Can I change my subscription plan?',
                'How do I process a refund?',
                'What payment methods do you accept?',
            ],
        },
        {
            title: 'Courses & Content',
            description: 'Questions about fitness programs and content',
            items: [
                'How long do I have access to the courses?',
                'Can I download videos for offline viewing?',
                'Are there live coaching sessions?',
                'What if I miss a coaching session?',
            ],
        },
        {
            title: 'Technical Support',
            description: 'Troubleshoot technical issues',
            items: [
                'I can\'t log into my account',
                'Videos are not loading properly',
                'How do I reset my password?',
                'I\'m having connection issues',
            ],
        },
    ];

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'support@fittransform.com',
            time: 'Response time: 24 hours',
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Chat with us during business hours',
            time: 'Mon-Fri: 9 AM - 6 PM IST',
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: '+91 98765 43210',
            time: 'Mon-Fri: 10 AM - 5 PM IST',
        },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
                {/* Header */}
                <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Help Center</h1>
                        <p className="text-lg text-neutral-600">
                            Find answers to your questions and get support whenever you need it
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {/* Help Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {helpCategories.map((category, index) => (
                            <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{category.title}</h3>
                                <p className="text-sm text-neutral-600 mb-4">{category.description}</p>
                                <ul className="space-y-2">
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3">
                                            <span className="text-emerald-600 mt-1">•</span>
                                            <span className="text-neutral-700 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact Methods */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-8">Get In Touch</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {contactMethods.map((method, index) => {
                                const Icon = method.icon;
                                return (
                                    <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6 text-center">
                                        <Icon className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{method.title}</h3>
                                        <p className="text-neutral-700 font-medium mb-1">{method.description}</p>
                                        <p className="text-sm text-neutral-600">{method.time}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-emerald-600 rounded-lg p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                        <p className="mb-6 text-emerald-100">
                            Can't find what you're looking for? Contact our support team directly.
                        </p>
                        <Button className="bg-white text-emerald-600 hover:bg-neutral-100">
                            Contact Support
                        </Button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-12 text-center">
                        <p className="text-neutral-600 mb-4">Looking for other resources?</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/faq" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                FAQ
                            </Link>
                            <span className="text-neutral-400">•</span>
                            <Link href="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Privacy Policy
                            </Link>
                            <span className="text-neutral-400">•</span>
                            <Link href="/terms-of-service" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Terms of Service
                            </Link>
                            <span className="text-neutral-400">•</span>
                            <Link href="/refund-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Refund Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
