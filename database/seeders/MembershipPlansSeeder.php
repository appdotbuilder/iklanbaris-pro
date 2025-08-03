<?php

namespace Database\Seeders;

use App\Models\MembershipPlan;
use Illuminate\Database\Seeder;

class MembershipPlansSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Gratis',
                'slug' => 'free',
                'description' => 'Paket gratis untuk memulai',
                'price' => 0,
                'duration_days' => 30,
                'max_ads' => 3,
                'statistics_access' => false,
                'priority_listing' => false,
                'boost_credits' => 0,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Basic',
                'slug' => 'basic',
                'description' => 'Paket dasar untuk pengguna aktif',
                'price' => 49000,
                'duration_days' => 30,
                'max_ads' => 10,
                'statistics_access' => true,
                'priority_listing' => false,
                'boost_credits' => 2,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Premium',
                'slug' => 'premium',
                'description' => 'Paket premium untuk bisnis',
                'price' => 99000,
                'duration_days' => 30,
                'max_ads' => 25,
                'statistics_access' => true,
                'priority_listing' => true,
                'boost_credits' => 5,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Pro',
                'slug' => 'pro',
                'description' => 'Paket profesional untuk bisnis besar',
                'price' => 199000,
                'duration_days' => 30,
                'max_ads' => 100,
                'statistics_access' => true,
                'priority_listing' => true,
                'boost_credits' => 15,
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($plans as $plan) {
            MembershipPlan::create($plan);
        }
    }
}