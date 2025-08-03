<?php

namespace Tests\Feature;

use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MembershipTest extends TestCase
{
    use RefreshDatabase;

    public function test_membership_index_displays_plans(): void
    {
        // Create test membership plans
        MembershipPlan::factory()->count(4)->create([
            'is_active' => true,
        ]);

        $response = $this->get('/membership');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('membership/index')
                ->has('plans', 4)
        );
    }

    public function test_only_active_plans_are_displayed(): void
    {
        // Create active and inactive plans
        MembershipPlan::factory()->count(3)->create(['is_active' => true]);
        MembershipPlan::factory()->count(2)->create(['is_active' => false]);

        $response = $this->get('/membership');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('membership/index')
                ->has('plans', 3)
        );
    }
}