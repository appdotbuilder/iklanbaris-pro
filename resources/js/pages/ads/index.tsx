import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    children?: Category[];
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
    images: string[] | null;
    is_boosted: boolean;
    views: number;
    created_at: string;
    user: User;
    category: Category;
}

interface Props {
    ads: {
        data: Ad[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        category?: string;
        search?: string;
        location?: string;
    };
    [key: string]: unknown;
}

export default function AdsIndex({ ads, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [location, setLocation] = useState(filters.location || '');

    const handleSearch = () => {
        router.get('/', {
            search: search || undefined,
            location: location || undefined,
            category: filters.category || undefined,
        });
    };

    const handleCategoryFilter = (categorySlug: string | null) => {
        router.get('/', {
            category: categorySlug || undefined,
            search: filters.search || undefined,
            location: filters.location || undefined,
        });
    };

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

    return (
        <AppShell>
            <Head title="IklanKu - Semua Iklan" />
            
            <div className="space-y-6">
                {/* Hero Search */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold mb-2">🔍 Cari Iklan Impian Anda</h1>
                        <p className="text-blue-100">
                            Temukan {ads.total.toLocaleString('id-ID')} iklan dari berbagai kategori
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                        <Input
                            type="text"
                            placeholder="Cari produk, merek, atau kata kunci..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-white text-gray-900"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Input
                            type="text"
                            placeholder="Lokasi (kota/daerah)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="md:w-48 bg-white text-gray-900"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button 
                            onClick={handleSearch}
                            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                        >
                            🔍 Cari
                        </Button>
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">📂 Kategori</h3>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={!filters.category ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryFilter(null)}
                            className="text-sm"
                        >
                            Semua
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={filters.category === category.slug ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleCategoryFilter(category.slug)}
                                className="text-sm"
                            >
                                {category.icon} {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Active Filters */}
                {(filters.search || filters.location || filters.category) && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-blue-800">Filter aktif:</span>
                            {filters.search && (
                                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    🔍 "{filters.search}"
                                </span>
                            )}
                            {filters.location && (
                                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    📍 {filters.location}
                                </span>
                            )}
                            {filters.category && (
                                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    📂 {categories.find(c => c.slug === filters.category)?.name}
                                </span>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.get('/')}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                ✕ Hapus semua
                            </Button>
                        </div>
                    </div>
                )}

                {/* Results Info */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                        Menampilkan {ads.data.length} dari {ads.total} iklan
                    </p>
                    <div className="text-sm text-gray-500">
                        Halaman {ads.current_page} dari {ads.last_page}
                    </div>
                </div>

                {/* Ads Grid */}
                {ads.data.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Tidak ada iklan ditemukan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Coba ubah kata kunci pencarian atau filter kategori
                        </p>
                        <Button onClick={() => router.get('/')}>
                            🔄 Reset Pencarian
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {ads.data.map((ad) => (
                            <Link
                                key={ad.id}
                                href={`/ads/${ad.id}`}
                                className="group"
                            >
                                <div className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden ${
                                    ad.is_boosted ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
                                }`}>
                                    {/* Boost Badge */}
                                    {ad.is_boosted && (
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 text-center">
                                            ⚡ IKLAN UNGGULAN
                                        </div>
                                    )}
                                    
                                    {/* Image */}
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        {ad.images && ad.images.length > 0 ? (
                                            <img
                                                src={ad.images[0]}
                                                alt={ad.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <span className="text-4xl">🖼️</span>
                                            </div>
                                        )}
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            {ad.category.icon} {ad.category.name}
                                        </div>
                                        
                                        {/* Views */}
                                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            👁️ {ad.views}
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {ad.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {ad.description}
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <div className="text-lg font-bold text-blue-600">
                                                {formatPrice(ad.price)}
                                            </div>
                                            
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <span>👤 {ad.user.name}</span>
                                                </div>
                                                <div>
                                                    {ad.location && (
                                                        <span>📍 {ad.location}</span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="text-xs text-gray-400">
                                                🕒 {timeAgo(ad.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {ads.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        {ads.current_page > 1 && (
                            <Button
                                variant="outline"
                                onClick={() => router.get('/', {
                                    ...filters,
                                    page: ads.current_page - 1
                                })}
                            >
                                ← Sebelumnya
                            </Button>
                        )}
                        
                        <span className="px-4 py-2 text-sm text-gray-600">
                            Halaman {ads.current_page} dari {ads.last_page}
                        </span>
                        
                        {ads.current_page < ads.last_page && (
                            <Button
                                variant="outline"
                                onClick={() => router.get('/', {
                                    ...filters,
                                    page: ads.current_page + 1
                                })}
                            >
                                Selanjutnya →
                            </Button>
                        )}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
                    <h3 className="text-xl font-bold mb-2">💡 Ingin Pasang Iklan?</h3>
                    <p className="mb-4 text-green-100">
                        Bergabung sekarang dan pasang iklan pertama Anda secara GRATIS!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/register">
                            <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                                🚀 Daftar Gratis
                            </Button>
                        </Link>
                        <Link href="/membership">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                                💎 Lihat Paket Premium
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}