<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MusicController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('music', [MusicController::class, 'index']); // แสดงรายการเพลงทั้งหมด
Route::post('music', [MusicController::class, 'store']); // สร้างเพลงใหม่
Route::get('music/{id}', [MusicController::class, 'show']); // แสดงข้อมูลเพลงตาม ID
Route::put('music/{id}', [MusicController::class, 'update']); // อัปเดตข้อมูลเพลง
Route::delete('music/{id}', [MusicController::class, 'destroy']); // ลบเพลง
