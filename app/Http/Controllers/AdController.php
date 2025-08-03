<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdController extends Controller
{
    /**
     * Display a listing of the ads.
     */
    public function index(Request $request)
    {
        $query = Ad::with(['user', 'category'])
            ->active()
            ->latest();

        // Filter by category
        if ($request->category) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search by title or description
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by location
        if ($request->location) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Sort boosted ads first
        $query->orderByDesc('is_boosted')
              ->orderBy('created_at', 'desc');

        $ads = $query->paginate(12);
        $categories = Category::active()->whereNull('parent_id')->with('children')->get();

        return Inertia::render('ads/index', [
            'ads' => $ads,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search', 'location']),
        ]);
    }

    /**
     * Display the specified ad.
     */
    public function show(Ad $ad)
    {
        $ad->load(['user', 'category']);
        $ad->incrementViews();

        $relatedAds = Ad::with(['user', 'category'])
            ->where('category_id', $ad->category_id)
            ->where('id', '!=', $ad->id)
            ->active()
            ->limit(6)
            ->get();

        return Inertia::render('ads/show', [
            'ad' => $ad,
            'relatedAds' => $relatedAds,
        ]);
    }
}