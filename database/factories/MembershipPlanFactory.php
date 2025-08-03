<?php

namespace Database\Factories;

use App\Models\MembershipPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MembershipPlan>
 */
class MembershipPlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\MembershipPlan>
     */
    protected $model = MembershipPlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 0, 500000),
            'duration_days' => fake()->randomElement([30, 90, 365]),
            'max_ads' => fake()->numberBetween(1, 100),
            'statistics_access' => fake()->boolean(),
            'priority_listing' => fake()->boolean(),
            'boost_credits' => fake()->numberBetween(0, 20),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}