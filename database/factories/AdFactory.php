<?php

namespace Database\Factories;

use App\Models\Ad;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ad>
 */
class AdFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Ad>
     */
    protected $model = Ad::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isBoosted = fake()->boolean(20); // 20% chance of being boosted
        
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraphs(3, true),
            'price' => fake()->randomFloat(2, 10000, 10000000),
            'location' => fake()->city(),
            'contact_phone' => fake()->phoneNumber(),
            'contact_email' => fake()->safeEmail(),
            'images' => fake()->randomElements([
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1001, 2000),
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(2001, 3000),
            ], fake()->numberBetween(1, 3)),
            'status' => fake()->randomElement(['active', 'draft']),
            'is_boosted' => $isBoosted,
            'boost_expires_at' => $isBoosted ? fake()->dateTimeBetween('now', '+7 days') : null,
            'views' => fake()->numberBetween(0, 1000),
            'contacts' => fake()->numberBetween(0, 50),
            'expires_at' => fake()->dateTimeBetween('+30 days', '+60 days'),
        ];
    }

    /**
     * Indicate that the ad is boosted.
     */
    public function boosted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_boosted' => true,
            'boost_expires_at' => fake()->dateTimeBetween('now', '+7 days'),
        ]);
    }

    /**
     * Indicate that the ad is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}