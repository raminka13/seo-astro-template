import React, { useState } from 'react';
import { CRM_WEBHOOK_URL } from '../consts';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const webhookUrl = CRM_WEBHOOK_URL;

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setStatus('success');
            form.reset();
        } catch (error) {
            console.error('Submission failed', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-secondary-100 p-8 sm:p-10 w-full max-w-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-title font-bold text-secondary-900">Get in Touch</h2>
                <p className="mt-2 text-secondary-600">We'd love to hear from you. Fill out the form below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            className="mt-2 block w-full rounded-lg border-secondary-200 px-4 py-3 bg-secondary-50 border outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 transition-all"
                            placeholder="Jane"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            className="mt-2 block w-full rounded-lg border-secondary-200 px-4 py-3 bg-secondary-50 border outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 transition-all"
                            placeholder="Smith"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-2 block w-full rounded-lg border-secondary-200 px-4 py-3 bg-secondary-50 border outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 transition-all"
                        placeholder="jane@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700">How can we help you?</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="mt-2 block w-full rounded-lg border-secondary-200 px-4 py-3 bg-secondary-50 border outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 transition-all resize-none"
                        placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                </div>

                {status === 'success' && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-100 text-green-800 text-sm text-center font-medium my-4">
                        Thank you! Your message has been sent successfully.
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-800 text-sm text-center font-medium my-4">
                        Oops! Something went wrong. Please try again later.
                    </div>
                )}
            </form>
        </div>
    );
}
