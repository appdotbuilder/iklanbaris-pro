<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Ad
 *
 * @property int $id
 * @property int $user_id
 * @property int $category_id
 * @property string $title
 * @property string $description
 * @property string|null $price
 * @property string|null $location
 * @property string|null $contact_phone
 * @property string|null $contact_email
 * @property array|null $images
 * @property string $status
 * @property bool $is_boosted
 * @property \Illuminate\Support\Carbon|null $boost_expires_at
 * @property int $views
 * @property int $contacts
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Category $category
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Ad newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ad newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ad query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ad active()
 * @method static \Illuminate\Database\Eloquent\Builder|Ad boosted()
 * @method static \Database\Factories\AdFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Ad extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'price',
        'location',
        'contact_phone',
        'contact_email',
        'images',
        'status',
        'is_boosted',
        'boost_expires_at',
        'views',
        'contacts',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'images' => 'array',
        'is_boosted' => 'boolean',
        'boost_expires_at' => 'datetime',
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active ads.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                    ->where(function($q) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>', now());
                    });
    }

    /**
     * Scope a query to only include boosted ads.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBoosted($query)
    {
        return $query->where('is_boosted', true)
                    ->where('boost_expires_at', '>', now());
    }

    /**
     * Get the user that owns the ad.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category of the ad.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Increment the view count.
     *
     * @return void
     */
    public function incrementViews(): void
    {
        $this->increment('views');
    }

    /**
     * Increment the contact count.
     *
     * @return void
     */
    public function incrementContacts(): void
    {
        $this->increment('contacts');
    }

    /**
     * Check if the ad is boosted and active.
     *
     * @return bool
     */
    public function isBoostedActive(): bool
    {
        return $this->is_boosted && $this->boost_expires_at && $this->boost_expires_at->isFuture();
    }
}