// Server Component - No 'use client' directive for SEO benefits
import React from 'react';
import {Github, Linkedin,Laugh} from 'lucide-react';
import personalInfo from '@/data/personal-info.json';

const SocialLinks: React.FC = () => {
    const contactDetails = [
        {
            icon: Github,
            label: "GitHub",
            value: personalInfo.social.github.username,
            href: personalInfo.social.github.url
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: personalInfo.social.linkedin.username,
            href: personalInfo.social.linkedin.url
        },
        {
            icon: Laugh,
            label: "HuggingFace",
            value: personalInfo.social.huggingface.username,
            href: personalInfo.social.huggingface.url
        },
    ];

    return (
        <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Follow Me
            </h3>

            <div className="space-y-6">
                {contactDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center space-x-4 group hover:text-primary transition-colors duration-200"
                        >

                            <div
                                className="w-12 h-12 iconic rounded-lg bg-primary group-hover:scale-110 transition-transform duration-300 flex items-center justify-center flex-shrink-0"
                            >
                                {Icon && (<Icon size={20} className="text-background"/>)}
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className="font-medium text-foreground group-hover:text-primary">
                                    {item.value}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SocialLinks;
