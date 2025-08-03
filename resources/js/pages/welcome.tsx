import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="IklanKu - Platform Iklan Baris Online Terpercaya" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-blue-600">
                                    📢 IklanKu
                                </h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700">
                                            Halo, {auth.user.name}!
                                        </span>
                                        <Link
                                            href="/dashboard"
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href="/login"
                                            className="text-gray-700 hover:text-blue-600 font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link href="/register">
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                Daftar Gratis
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            🚀 Platform Iklan Baris
                            <span className="text-blue-600"> Terdepan</span> di Indonesia
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Jual beli mudah, cepat, dan terpercaya. Bergabung dengan ribuan pengguna 
                            yang sudah merasakan kemudahan beriklan di IklanKu!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                                    🔍 Lihat Semua Iklan
                                </Button>
                            </Link>
                            <Link href="/membership">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                                >
                                    💎 Paket Premium
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                ✨ Mengapa Memilih IklanKu?
                            </h3>
                            <p className="text-lg text-gray-600">
                                Platform terlengkap dengan fitur-fitur canggih untuk kesuksesan iklan Anda
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="text-4xl mb-4">🎯</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Targeting Tepat
                                </h4>
                                <p className="text-gray-600">
                                    Jangkau calon pembeli yang tepat dengan sistem kategori lengkap dan pencarian canggih
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-xl bg-green-50 border border-green-100">
                                <div className="text-4xl mb-4">📊</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Statistik Detail
                                </h4>
                                <p className="text-gray-600">
                                    Pantau performa iklan dengan statistik lengkap: views, kontak, dan engagement
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-xl bg-purple-50 border border-purple-100">
                                <div className="text-4xl mb-4">⚡</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Boost Iklan
                                </h4>
                                <p className="text-gray-600">
                                    Tingkatkan visibilitas dengan fitur boost yang membuat iklan tampil di atas
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-xl bg-yellow-50 border border-yellow-100">
                                <div className="text-4xl mb-4">💰</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Pembayaran Mudah
                                </h4>
                                <p className="text-gray-600">
                                    Integrasi lengkap: Midtrans, PayPal, transfer bank, dan berbagai metode pembayaran
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-xl bg-red-50 border border-red-100">
                                <div className="text-4xl mb-4">🛡️</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Aman & Terpercaya
                                </h4>
                                <p className="text-gray-600">
                                    Sistem verifikasi ketat dan moderasi 24/7 untuk menjamin keamanan transaksi
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-xl bg-indigo-50 border border-indigo-100">
                                <div className="text-4xl mb-4">📱</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Mobile Friendly
                                </h4>
                                <p className="text-gray-600">
                                    Akses mudah dari smartphone dengan desain responsif dan loading cepat
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Membership Plans Preview */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            💎 Paket Keanggotaan Fleksibel
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                            Mulai dari gratis hingga paket profesional, pilih yang sesuai kebutuhan Anda
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                                <h4 className="font-bold text-lg mb-2">🆓 Gratis</h4>
                                <p className="text-2xl font-bold text-blue-600 mb-2">Rp 0</p>
                                <p className="text-sm text-gray-600">3 iklan per bulan</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                                <h4 className="font-bold text-lg mb-2">⭐ Basic</h4>
                                <p className="text-2xl font-bold text-blue-600 mb-2">Rp 49K</p>
                                <p className="text-sm text-gray-600">10 iklan + statistik</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border-2 border-purple-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-bl">
                                    POPULER
                                </div>
                                <h4 className="font-bold text-lg mb-2">💎 Premium</h4>
                                <p className="text-2xl font-bold text-purple-600 mb-2">Rp 99K</p>
                                <p className="text-sm text-gray-600">25 iklan + prioritas</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border-2 border-gold-200">
                                <h4 className="font-bold text-lg mb-2">👑 Pro</h4>
                                <p className="text-2xl font-bold text-yellow-600 mb-2">Rp 199K</p>
                                <p className="text-sm text-gray-600">100 iklan + boost</p>
                            </div>
                        </div>

                        <Link href="/membership">
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
                                📋 Lihat Detail Paket
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            🎉 Siap Memulai Bisnis Online Anda?
                        </h3>
                        <p className="text-xl text-blue-100 mb-8">
                            Bergabung dengan ribuan penjual sukses dan rasakan perbedaannya hari ini!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth?.user && (
                                <Link href="/register">
                                    <Button 
                                        size="lg" 
                                        className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
                                    >
                                        🚀 Daftar Sekarang - GRATIS!
                                    </Button>
                                </Link>
                            )}
                            <Link href="/">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
                                >
                                    🔍 Jelajahi Iklan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="text-xl font-bold mb-4">📢 IklanKu</h4>
                                <p className="text-gray-400">
                                    Platform iklan baris online terpercaya di Indonesia
                                </p>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-4">Fitur</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Pasang Iklan</li>
                                    <li>Boost Iklan</li>
                                    <li>Statistik Detail</li>
                                    <li>Pembayaran Aman</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-4">Bantuan</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>FAQ</li>
                                    <li>Cara Beriklan</li>
                                    <li>Kebijakan</li>
                                    <li>Kontak Kami</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-4">Ikuti Kami</h5>
                                <div className="flex space-x-4 text-2xl">
                                    <span>📘</span>
                                    <span>📷</span>
                                    <span>🐦</span>
                                    <span>📺</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 IklanKu. Semua hak dilindungi.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}