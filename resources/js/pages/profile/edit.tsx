import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

interface Props {
    user: User;
    [key: string]: unknown;
}

export default function ProfileEdit({ user }: Props) {
    return (
        <AppShell>
            <Head title="Edit Profile" />
            
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        👤 Edit Profile
                    </h1>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <div className="text-gray-900">{user.name}</div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="text-gray-900">{user.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}