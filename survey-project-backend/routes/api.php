<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('me', 'me');
    Route::post('refresh', 'refresh');
});

Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['middleware' => 'isAdmin'], function () {
                Route::group(['prefix' => 'forms'], function () {
                    Route::get('/', [FormsController::class, 'getAllForms']);
                    Route::post('/new', [AdminFormsController::class, 'addForms']);
                    Route::patch('/{id}', [AdminFormsController::class, 'updateForms']);
                    Route::delete('/{id}', [AdminFormsController::class, 'deleteForms']);
                });
            });
        });
    });
    Route::group(['prefix' => 'user'], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['prefix' => 'forms'], function () {
                Route::get('/', [FormsController::class, 'getAllForms']);
                Route::get('/answered', [FormsController::class, 'getAllAnsweredForms']);
                Route::post('/submit', [FormsFormsController::class, 'answerForms']);
            });
        });
    });
});
