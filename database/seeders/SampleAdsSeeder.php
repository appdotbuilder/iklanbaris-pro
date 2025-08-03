<?php

namespace Database\Seeders;

use App\Models\Ad;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class SampleAdsSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Get existing users and categories
        $users = User::all();
        $categories = Category::all();

        if ($users->isEmpty() || $categories->isEmpty()) {
            return;
        }

        // Sample ads data
        $sampleAds = [
            [
                'title' => 'iPhone 15 Pro Max 256GB Titanium Blue',
                'description' => "iPhone 15 Pro Max baru, masih bergaransi resmi iBox. Kondisi mulus, tidak ada lecet atau bekas jatuh. Kelengkapan: \n\n• Box original\n• Charger USB-C\n• Kabel USB-C to Lightning\n• Earphone\n• Dokumentasi lengkap\n\nSpesifikasi:\n• Storage: 256GB\n• Warna: Titanium Blue\n• Garansi: 11 bulan tersisa\n• iCloud clean, bukan hasil curian\n\nAlasan jual: mau upgrade ke model terbaru. Harga masih bisa nego tipis untuk pembeli serius. COD area Jakarta Selatan atau kirim via ekspedisi terpercaya.",
                'price' => 18500000,
                'location' => 'Jakarta Selatan',
                'contact_phone' => '081234567890',
                'contact_email' => 'seller1@example.com',
                'category_slug' => 'handphone',
                'is_boosted' => true,
            ],
            [
                'title' => 'Honda Civic Type R 2023 - KM 5000',
                'description' => "Honda Civic Type R tahun 2023, kondisi seperti baru. KM baru 5000, jarang dipakai karena WFH. Mesin masih garansi, service record lengkap di Honda authorized dealer.\n\nSpesifikasi:\n• Mesin: 2.0L VTEC Turbo\n• Transmisi: Manual 6-speed\n• Warna: Championship White\n• Interior: Red Recaro seats\n• Kondisi: Mulus, tidak ada lecet\n• STNK panjang sampai 2027\n• Pajak hidup\n\nKelengkapan:\n• BPKB\n• STNK\n• Faktur\n• Kunci serep\n• Manual book\n• Service book\n\nHarga nego untuk pembeli serius. Bisa bantu kredit dengan DP rendah.",
                'price' => 850000000,
                'location' => 'Bandung',
                'contact_phone' => '082345678901',
                'contact_email' => 'seller2@example.com',
                'category_slug' => 'mobil',
                'is_boosted' => false,
            ],
            [
                'title' => 'Rumah Minimalis 2 Lantai Siap Huni - Bintaro',
                'description' => "Dijual rumah minimalis 2 lantai di cluster premium Bintaro. Lokasi strategis, dekat dengan sekolah internasional, mall, dan stasiun KRL.\n\nSpesifikasi:\n• Luas Tanah: 120 m²\n• Luas Bangunan: 150 m²\n• Kamar Tidur: 3 + 1\n• Kamar Mandi: 3\n• Garasi: 2 mobil\n• Listrik: 3500 watt\n• Air: PAM + sumur bor\n\nFasilitas Cluster:\n• Security 24 jam\n• CCTV\n• Taman bermain\n• Masjid\n• Akses tol Bintaro\n\nSertifikat HGB, IMB lengkap. Harga include semua furniture. Cocok untuk investasi atau hunian keluarga.",
                'price' => 2800000000,
                'location' => 'Tangerang Selatan',
                'contact_phone' => '083456789012',
                'contact_email' => 'seller3@example.com',
                'category_slug' => 'properti',
                'is_boosted' => true,
            ],
            [
                'title' => 'Yamaha NMAX 155 Connected 2023 - Km 3000',
                'description' => "Yamaha NMAX 155 Connected ABS, tahun 2023. Kondisi mulus terawat, KM 3000. Service rutin di Yamaha resmi.\n\nSpesifikasi:\n• Mesin: 155cc Blue Core\n• Fitur: ABS, Smart Key, Y-Connect\n• Warna: Matte Black\n• Kondisi: Mulus original\n• STNK: Panjang 2027\n• Pajak: Hidup\n\nKelengkapan:\n• BPKB\n• STNK\n• Kunci cadangan\n• Smart key 2 unit\n• Buku service\n• Toolkit original\n\nAlasan jual: mau ganti mobil. Harga nego wajar, serius langsung WA.",
                'price' => 28500000,
                'location' => 'Surabaya',
                'contact_phone' => '084567890123',
                'contact_email' => 'seller4@example.com',
                'category_slug' => 'motor',
                'is_boosted' => false,
            ],
            [
                'title' => 'MacBook Pro M3 14 inch 512GB Space Black',
                'description' => "MacBook Pro M3 14 inch, warna Space Black, storage 512GB. Beli November 2023, kondisi mulus seperti baru. Jarang dipakai karena dapat laptop kantor.\n\nSpesifikasi:\n• Processor: Apple M3 Pro chip\n• RAM: 18GB unified memory\n• Storage: 512GB SSD\n• Display: 14-inch Liquid Retina XDR\n• Color: Space Black\n• Keyboard: Backlit Magic Keyboard\n• Touch ID: Ada\n\nKelengkapan:\n• Box original\n• Charger MagSafe 3 96W\n• Kabel USB-C to MagSafe 3\n• Dokumentasi\n• Invoice resmi\n\nGaransi resmi masih 10 bulan. Cocok untuk designer, programmer, atau content creator.",
                'price' => 32000000,
                'location' => 'Yogyakarta',
                'contact_phone' => '085678901234',
                'contact_email' => 'seller5@example.com',
                'category_slug' => 'laptop',
                'is_boosted' => true,
            ],
        ];

        foreach ($sampleAds as $adData) {
            // Find category by slug
            $category = $categories->where('slug', $adData['category_slug'])->first();
            if (!$category) {
                $category = $categories->random();
            }

            // Create ad
            Ad::create([
                'user_id' => $users->random()->id,
                'category_id' => $category->id,
                'title' => $adData['title'],
                'description' => $adData['description'],
                'price' => $adData['price'],
                'location' => $adData['location'],
                'contact_phone' => $adData['contact_phone'],
                'contact_email' => $adData['contact_email'],
                'images' => [
                    'https://picsum.photos/800/600?random=' . random_int(1, 1000),
                    'https://picsum.photos/800/600?random=' . random_int(1001, 2000),
                    'https://picsum.photos/800/600?random=' . random_int(2001, 3000),
                ],
                'status' => 'active',
                'is_boosted' => $adData['is_boosted'],
                'boost_expires_at' => $adData['is_boosted'] ? now()->addDays(random_int(1, 7)) : null,
                'views' => random_int(50, 500),
                'contacts' => random_int(0, 25),
                'expires_at' => now()->addDays(30),
            ]);
        }

        // Create additional random ads
        Ad::factory()
            ->count(20)
            ->create([
                'user_id' => fn() => $users->random()->id,
                'category_id' => fn() => $categories->random()->id,
                'status' => 'active',
            ]);

        // Create some boosted ads
        Ad::factory()
            ->count(5)
            ->boosted()
            ->active()
            ->create([
                'user_id' => fn() => $users->random()->id,
                'category_id' => fn() => $categories->random()->id,
            ]);
    }
}