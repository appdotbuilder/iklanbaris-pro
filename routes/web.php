<?php

use App\Http\Controllers\AdController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page - ads listing (main functionality)
Route::get('/', [AdController::class, 'index'])->name('home');
Route::get('/ads', [AdController::class, 'index'])->name('ads.index');

// Public ad routes
Route::get('/ads/{ad}', [AdController::class, 'show'])->name('ads.show');

// Membership plans
Route::get('/membership', [MembershipController::class, 'index'])->name('membership.index');

// Dashboard (requires authentication)
Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';