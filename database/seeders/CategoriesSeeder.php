<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kendaraan',
                'slug' => 'kendaraan',
                'description' => 'Mobil, motor, dan kendaraan lainnya',
                'icon' => '🚗',
                'parent_id' => null,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Elektronik',
                'slug' => 'elektronik',
                'description' => 'Handphone, laptop, TV, dan elektronik lainnya',
                'icon' => '📱',
                'parent_id' => null,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Properti',
                'slug' => 'properti',
                'description' => 'Rumah, apartemen, tanah, dan properti lainnya',
                'icon' => '🏠',
                'parent_id' => null,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Fashion',
                'slug' => 'fashion',
                'description' => 'Pakaian, sepatu, tas, dan aksesoris',
                'icon' => '👗',
                'parent_id' => null,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Hobi & Olahraga',
                'slug' => 'hobi-olahraga',
                'description' => 'Alat olahraga, koleksi, dan hobi lainnya',
                'icon' => '⚽',
                'parent_id' => null,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Pekerjaan',
                'slug' => 'pekerjaan',
                'description' => 'Lowongan kerja dan jasa',
                'icon' => '💼',
                'parent_id' => null,
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Add subcategories
        $subcategories = [
            [
                'name' => 'Mobil',
                'slug' => 'mobil',
                'parent_id' => 1,
                'icon' => '🚙',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Motor',
                'slug' => 'motor',
                'parent_id' => 1,
                'icon' => '🏍️',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Handphone',
                'slug' => 'handphone',
                'parent_id' => 2,
                'icon' => '📱',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Laptop',
                'slug' => 'laptop',
                'parent_id' => 2,
                'icon' => '💻',
                'is_active' => true,
                'sort_order' => 2,
            ],
        ];

        foreach ($subcategories as $subcategory) {
            Category::create($subcategory);
        }
    }
}