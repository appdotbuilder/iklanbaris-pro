<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\MembershipPlan
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string $price
 * @property int $duration_days
 * @property int $max_ads
 * @property bool $statistics_access
 * @property bool $priority_listing
 * @property int $boost_credits
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserMembership> $userMemberships
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|MembershipPlan active()
 * @method static \Database\Factories\MembershipPlanFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MembershipPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'duration_days',
        'max_ads',
        'statistics_access',
        'priority_listing',
        'boost_credits',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'statistics_access' => 'boolean',
        'priority_listing' => 'boolean',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active plans.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    /**
     * Get the user memberships for this plan.
     */
    public function userMemberships(): HasMany
    {
        return $this->hasMany(UserMembership::class);
    }

    /**
     * Get the payments for this plan.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Check if this is a free plan.
     *
     * @return bool
     */
    public function isFree(): bool
    {
        return (float) $this->price === 0.0;
    }
}