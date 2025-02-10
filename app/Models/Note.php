<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    // Add any other properties or methods for the Note model
    protected $fillable = ['name', 'description', 'image'];

}