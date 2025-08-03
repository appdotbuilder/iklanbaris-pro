import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface MembershipPlan {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    duration_days: number;
    max_ads: number;
    statistics_access: boolean;
    priority_listing: boolean;
    boost_credits: number;
    is_active: boolean;
}

interface Props {
    plans: MembershipPlan[];
    [key: string]: unknown;
}

export default function MembershipIndex({ plans }: Props) {
    const formatPrice = (price: string) => {
        if (parseFloat(price) === 0) return 'GRATIS';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parseFloat(price));
    };

    const getPlanIcon = (slug: string) => {
        switch (slug) {
            case 'free': return '🆓';
            case 'basic': return '⭐';
            case 'premium': return '💎';
            case 'pro': return '👑';
            default: return '📦';
        }
    };

    const getPlanColor = (slug: string) => {
        switch (slug) {
            case 'free': return 'border-gray-300 bg-gray-50';
            case 'basic': return 'border-blue-300 bg-blue-50';
            case 'premium': return 'border-purple-300 bg-purple-50 ring-2 ring-purple-200';
            case 'pro': return 'border-yellow-300 bg-yellow-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    const getButtonColor = (slug: string) => {
        switch (slug) {
            case 'free': return 'bg-gray-600 hover:bg-gray-700';
            case 'basic': return 'bg-blue-600 hover:bg-blue-700';
            case 'premium': return 'bg-purple-600 hover:bg-purple-700';
            case 'pro': return 'bg-yellow-600 hover:bg-yellow-700';
            default: return 'bg-gray-600 hover:bg-gray-700';
        }
    };



    return (
        <AppShell>
            <Head title="Paket Keanggotaan - IklanKu" />
            
            <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        💎 Pilih Paket Keanggotaan Terbaik
                    </h1>
                    <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                        Tingkatkan visibilitas iklan Anda dengan paket keanggotaan yang fleksibel. 
                        Mulai dari gratis hingga paket profesional!
                    </p>
                </div>

                {/* Features Comparison */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-2xl font-bold text-center mb-8">✨ Perbandingan Fitur</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-semibold">Fitur</th>
                                    {plans.map((plan) => (
                                        <th key={plan.id} className="text-center py-3 px-4 font-semibold">
                                            <div className="flex flex-col items-center">
                                                <span className="text-lg mb-1">{getPlanIcon(plan.slug)}</span>
                                                <span>{plan.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-medium">Jumlah Iklan per Bulan</td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className="text-center py-3 px-4">
                                            <span className="font-bold text-blue-600">{plan.max_ads}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-medium">Statistik Lengkap</td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className="text-center py-3 px-4">
                                            {plan.statistics_access ? (
                                                <span className="text-green-600 text-lg">✅</span>
                                            ) : (
                                                <span className="text-red-500 text-lg">❌</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-medium">Prioritas Tampilan</td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className="text-center py-3 px-4">
                                            {plan.priority_listing ? (
                                                <span className="text-green-600 text-lg">✅</span>
                                            ) : (
                                                <span className="text-red-500 text-lg">❌</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-medium">Kredit Boost per Bulan</td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className="text-center py-3 px-4">
                                            <span className="font-bold text-yellow-600">{plan.boost_credits}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-medium">Durasi Keanggotaan</td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className="text-center py-3 px-4">
                                            <span className="text-gray-600">{plan.duration_days} hari</span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-xl border-2 p-6 ${getPlanColor(plan.slug)} transition-all duration-200 hover:shadow-lg`}
                        >
                            {/* Popular Badge */}
                            {plan.slug === 'premium' && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                                        🔥 PALING POPULER
                                    </div>
                                </div>
                            )}
                            
                            {/* Plan Header */}
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-2">{getPlanIcon(plan.slug)}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                                
                                <div className="mb-4">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {formatPrice(plan.price)}
                                    </div>
                                    <div className="text-sm text-gray-600">per bulan</div>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm">
                                    <span className="text-green-600 mr-2">✅</span>
                                    <span>{plan.max_ads} iklan per bulan</span>
                                </div>
                                
                                {plan.statistics_access && (
                                    <div className="flex items-center text-sm">
                                        <span className="text-green-600 mr-2">📊</span>
                                        <span>Statistik lengkap</span>
                                    </div>
                                )}
                                
                                {plan.priority_listing && (
                                    <div className="flex items-center text-sm">
                                        <span className="text-green-600 mr-2">⭐</span>
                                        <span>Prioritas tampilan</span>
                                    </div>
                                )}
                                
                                {plan.boost_credits > 0 && (
                                    <div className="flex items-center text-sm">
                                        <span className="text-yellow-600 mr-2">⚡</span>
                                        <span>{plan.boost_credits} kredit boost</span>
                                    </div>
                                )}
                                
                                <div className="flex items-center text-sm">
                                    <span className="text-blue-600 mr-2">🛡️</span>
                                    <span>Dukungan pelanggan</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <span className="text-purple-600 mr-2">📱</span>
                                    <span>Akses mobile app</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="text-center">
                                {plan.slug === 'free' ? (
                                    <Link href="/register">
                                        <Button className={`w-full ${getButtonColor(plan.slug)}`}>
                                            🚀 Mulai Gratis
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/login">
                                        <Button className={`w-full ${getButtonColor(plan.slug)}`}>
                                            💳 Pilih Paket Ini
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-2xl font-bold text-center mb-8">❓ Pertanyaan Umum</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                🔄 Bisakah upgrade paket kapan saja?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Ya! Anda bisa upgrade paket kapan saja. Kredit yang tersisa akan dihitung 
                                secara proporsional dan ditransfer ke paket baru.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                💰 Bagaimana cara pembayaran?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Kami menerima berbagai metode pembayaran: Midtrans, PayPal, transfer bank, 
                                dan kartu kredit untuk kemudahan Anda.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                ⚡ Apa itu kredit boost?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Kredit boost memungkinkan iklan Anda tampil di posisi teratas selama 24 jam 
                                dengan highlight khusus untuk menarik lebih banyak pembeli.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                📊 Statistik apa saja yang tersedia?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Dapatkan data lengkap: jumlah views, kontak, lokasi pengunjung, waktu 
                                terbaik posting, dan performa iklan dibanding kompetitor.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border p-6">
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                        💳 Metode Pembayaran yang Didukung
                    </h3>
                    
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-2xl">🏦</span>
                            <span className="font-medium">Transfer Bank</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-2xl">💳</span>
                            <span className="font-medium">Kartu Kredit</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-2xl">📱</span>
                            <span className="font-medium">E-Wallet</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-2xl">🌐</span>
                            <span className="font-medium">PayPal</span>
                        </div>
                    </div>
                    
                    <p className="text-center text-gray-600 text-sm mt-4">
                        Semua transaksi diproses dengan aman melalui gateway pembayaran terpercaya
                    </p>
                </div>

                {/* Final CTA */}
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">🎯 Siap Meningkatkan Penjualan?</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Bergabung dengan ribuan penjual yang sudah merasakan peningkatan penjualan 
                        hingga 300% dengan paket premium kami!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                                🚀 Mulai Sekarang
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button 
                                variant="outline" 
                                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
                            >
                                🔍 Lihat Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}