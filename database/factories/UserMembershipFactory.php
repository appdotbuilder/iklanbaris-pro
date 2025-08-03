<?php

namespace Database\Factories;

use App\Models\UserMembership;
use App\Models\User;
use App\Models\MembershipPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserMembership>
 */
class UserMembershipFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\UserMembership>
     */
    protected $model = UserMembership::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-30 days', 'now');
        $endDate = (clone $startDate)->modify('+30 days');
        
        return [
            'user_id' => User::factory(),
            'membership_plan_id' => MembershipPlan::factory(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'remaining_ads' => fake()->numberBetween(0, 25),
            'remaining_boosts' => fake()->numberBetween(0, 10),
            'status' => fake()->randomElement(['active', 'expired']),
        ];
    }
}