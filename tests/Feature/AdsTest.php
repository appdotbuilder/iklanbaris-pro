<?php

namespace Tests\Feature;

use App\Models\Ad;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdsTest extends TestCase
{
    use RefreshDatabase;

    public function test_ads_index_page_displays_correctly(): void
    {
        // Create test data
        $user = User::factory()->create();
        $category = Category::factory()->create(['name' => 'Electronics', 'slug' => 'electronics']);
        Ad::factory()->count(5)->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'status' => 'active',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('ads/index')
                ->has('ads.data', 5)
                ->has('categories')
        );
    }

    public function test_ad_show_page_displays_correctly(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $ad = Ad::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'status' => 'active',
            'title' => 'Test Ad Title',
        ]);

        $response = $this->get("/ads/{$ad->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('ads/show')
                ->where('ad.title', 'Test Ad Title')
                ->has('relatedAds')
        );
    }

    public function test_ad_view_count_increments(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $ad = Ad::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'status' => 'active',
            'views' => 0,
        ]);

        $this->get("/ads/{$ad->id}");

        $ad->refresh();
        $this->assertEquals(1, $ad->views);
    }

    public function test_ads_can_be_filtered_by_category(): void
    {
        $user = User::factory()->create();
        $category1 = Category::factory()->create(['slug' => 'electronics']);
        $category2 = Category::factory()->create(['slug' => 'furniture']);
        
        Ad::factory()->count(3)->create([
            'user_id' => $user->id,
            'category_id' => $category1->id,
            'status' => 'active',
        ]);
        
        Ad::factory()->count(2)->create([
            'user_id' => $user->id,
            'category_id' => $category2->id,
            'status' => 'active',
        ]);

        $response = $this->get('/?category=electronics');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('ads/index')
                ->has('ads.data', 3)
        );
    }

    public function test_ads_can_be_searched(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        
        Ad::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'status' => 'active',
            'title' => 'iPhone 15 Pro Max',
        ]);
        
        Ad::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'status' => 'active',
            'title' => 'Samsung Galaxy S24',
        ]);

        $response = $this->get('/?search=iPhone');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('ads/index')
                ->has('ads.data', 1)
        );
    }
}