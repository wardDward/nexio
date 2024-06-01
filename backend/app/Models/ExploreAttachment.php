<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExploreAttachment extends Model
{
    use HasFactory;
    
    protected $guarded = [];
    
    public function explore(){
        return $this->belongsTo(Explore::class, 'explore_id');
    }
}
