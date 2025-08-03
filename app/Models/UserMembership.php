<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserMembership
 *
 * @property int $id
 * @property int $user_id
 * @property int $membership_plan_id
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property int $remaining_ads
 * @property int $remaining_boosts
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\MembershipPlan $membershipPlan
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UserMembership newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserMembership newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserMembership query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserMembership active()

 * 
 * @mixin \Eloquent
 */
class UserMembership extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'membership_plan_id',
        'start_date',
        'end_date',
        'remaining_ads',
        'remaining_boosts',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active memberships.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')->where('end_date', '>', now());
    }

    /**
     * Get the user that owns the membership.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the membership plan.
     */
    public function membershipPlan(): BelongsTo
    {
        return $this->belongsTo(MembershipPlan::class);
    }

    /**
     * Check if the membership is expired.
     *
     * @return bool
     */
    public function isExpired(): bool
    {
        return $this->end_date->isPast() || $this->status !== 'active';
    }

    /**
     * Check if the user can create more ads.
     *
     * @return bool
     */
    public function canCreateAds(): bool
    {
        return $this->remaining_ads > 0 && !$this->isExpired();
    }
}