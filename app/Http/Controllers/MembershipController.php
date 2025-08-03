<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MembershipPlan;
use Inertia\Inertia;

class MembershipController extends Controller
{
    /**
     * Display membership plans.
     */
    public function index()
    {
        $plans = MembershipPlan::active()->get();

        return Inertia::render('membership/index', [
            'plans' => $plans,
        ]);
    }
}