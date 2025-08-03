<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\User;
use App\Models\MembershipPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Payment>
     */
    protected $model = Payment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'payment_id' => 'PAY-' . fake()->uuid(),
            'type' => fake()->randomElement(['membership', 'boost', 'upgrade']),
            'membership_plan_id' => MembershipPlan::factory(),
            'ad_id' => null,
            'amount' => fake()->randomFloat(2, 10000, 500000),
            'currency' => 'IDR',
            'status' => fake()->randomElement(['pending', 'completed', 'failed']),
            'payment_method' => fake()->randomElement(['midtrans', 'paypal', 'bank_transfer']),
            'external_id' => fake()->uuid(),
            'payment_data' => [
                'gateway' => 'midtrans',
                'reference' => fake()->uuid(),
            ],
        ];
    }
}