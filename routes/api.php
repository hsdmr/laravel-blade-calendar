<?php

use App\Models\Calendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/calendar', [App\Http\Controllers\Api\CalendarController::class, 'index']);
Route::post('/calendar/store', [App\Http\Controllers\Api\CalendarController::class, 'store']);
Route::post('/calendar/{id}', [App\Http\Controllers\Api\CalendarController::class, 'update']);
Route::post('/calendar/{id}/destroy', [App\Http\Controllers\Api\CalendarController::class, 'destroy']);
