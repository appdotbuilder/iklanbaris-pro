import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

interface User {
    id: number;
    name: string;
}

interface Ad {
    id: number;
    title: string;
    description: string;
    price: string | null;
    location: string | null;
    contact_phone: string | null;
    contact_email: string | null;
    images: string[] | null;
    is_boosted: boolean;
    views: number;
    contacts: number;
    created_at: string;
    user: User;
    category: Category;
}

interface Props {
    ad: Ad;
    relatedAds: Ad[];
    [key: string]: unknown;
}

export default function AdShow({ ad, relatedAds }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showContact, setShowContact] = useState(false);

    const formatPrice = (price: string | null) => {
        if (!price) return 'Hubungi Penjual';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parseFloat(price));
    };

    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Baru saja';
        if (diffInHours < 24) return `${diffInHours} jam lalu`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} hari lalu`;
        
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} minggu lalu`;
    };

    const handleContactClick = () => {
        setShowContact(true);
        // In a real app, this would increment the contact count via API
    };

    const images = ad.images || [];

    return (
        <AppShell>
            <Head title={`${ad.title} - IklanKu`} />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-blue-600">Beranda</Link>
                    <span>›</span>
                    <Link 
                        href={`/?category=${ad.category.slug}`}
                        className="hover:text-blue-600"
                    >
                        {ad.category.icon} {ad.category.name}
                    </Link>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">{ad.title}</span>
                </nav>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images */}
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            {ad.is_boosted && (
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-4 py-2 text-center">
                                    ⚡ IKLAN UNGGULAN - Dipromosikan oleh penjual
                                </div>
                            )}
                            
                            {images.length > 0 ? (
                                <div>
                                    <div className="aspect-video bg-gray-100">
                                        <img
                                            src={images[currentImageIndex]}
                                            alt={ad.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {images.length > 1 && (
                                        <div className="flex overflow-x-auto p-4 space-x-2">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                                                    }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${ad.title} ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <div className="text-6xl mb-2">🖼️</div>
                                        <p>Tidak ada gambar</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {ad.title}
                                    </h1>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span>👁️ {ad.views} dilihat</span>
                                        <span>📞 {ad.contacts} kontak</span>
                                        <span>🕒 {timeAgo(ad.created_at)}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">
                                        {formatPrice(ad.price)}
                                    </div>
                                    {ad.location && (
                                        <div className="text-sm text-gray-600">
                                            📍 {ad.location}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-gray-900 mb-3">📝 Deskripsi</h3>
                                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                                    {ad.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Seller Info */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">👤 Info Penjual</h3>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-3">
                                    {ad.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{ad.user.name}</div>
                                    <div className="text-sm text-gray-600">Anggota sejak 2024</div>
                                </div>
                            </div>

                            {!showContact ? (
                                <Button 
                                    onClick={handleContactClick}
                                    className="w-full bg-green-600 hover:bg-green-700 mb-3"
                                >
                                    💬 Tampilkan Kontak
                                </Button>
                            ) : (
                                <div className="space-y-3">
                                    {ad.contact_phone && (
                                        <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                            <span className="text-green-600 mr-2">📞</span>
                                            <a 
                                                href={`tel:${ad.contact_phone}`}
                                                className="text-green-700 font-medium hover:underline"
                                            >
                                                {ad.contact_phone}
                                            </a>
                                        </div>
                                    )}
                                    
                                    {ad.contact_email && (
                                        <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <span className="text-blue-600 mr-2">✉️</span>
                                            <a 
                                                href={`mailto:${ad.contact_email}`}
                                                className="text-blue-700 font-medium hover:underline break-all"
                                            >
                                                {ad.contact_email}
                                            </a>
                                        </div>
                                    )}
                                    
                                    <div className="text-xs text-gray-500 text-center pt-2">
                                        💡 Hati-hati dengan penipuan. Jangan transfer sebelum barang diterima.
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t">
                                <Button variant="outline" className="w-full">
                                    🚩 Laporkan Iklan
                                </Button>
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
                            <h4 className="font-semibold text-yellow-800 mb-3">🛡️ Tips Keamanan</h4>
                            <ul className="text-sm text-yellow-700 space-y-2">
                                <li>• Bertemu di tempat umum dan ramai</li>
                                <li>• Periksa barang sebelum bayar</li>
                                <li>• Hindari transfer ke rekening asing</li>
                                <li>• Gunakan escrow untuk nilai tinggi</li>
                            </ul>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 text-center">
                            <h4 className="font-semibold text-blue-800 mb-2">💡 Punya barang serupa?</h4>
                            <p className="text-sm text-blue-700 mb-4">
                                Pasang iklan Anda dan raih pembeli!
                            </p>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    🚀 Pasang Iklan Gratis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Ads */}
                {relatedAds.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            🔍 Iklan Serupa di {ad.category.name}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedAds.map((relatedAd) => (
                                <Link
                                    key={relatedAd.id}
                                    href={`/ads/${relatedAd.id}`}
                                    className="group"
                                >
                                    <div className="bg-gray-50 rounded-lg border hover:shadow-md transition-all duration-200 overflow-hidden">
                                        <div className="aspect-video bg-gray-100 relative">
                                            {relatedAd.images && relatedAd.images.length > 0 ? (
                                                <img
                                                    src={relatedAd.images[0]}
                                                    alt={relatedAd.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <span className="text-2xl">🖼️</span>
                                                </div>
                                            )}
                                            
                                            {relatedAd.is_boosted && (
                                                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                                                    ⚡
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-4">
                                            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
                                                {relatedAd.title}
                                            </h4>
                                            <div className="text-blue-600 font-bold text-sm mb-2">
                                                {formatPrice(relatedAd.price)}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>👁️ {relatedAd.views}</span>
                                                <span>{timeAgo(relatedAd.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        <div className="text-center mt-6">
                            <Link href={`/?category=${ad.category.slug}`}>
                                <Button variant="outline">
                                    🔍 Lihat Semua di {ad.category.name}
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}