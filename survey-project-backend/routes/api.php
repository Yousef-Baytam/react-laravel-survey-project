<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\AdminFormController;
use App\Http\Controllers\admin\AdminQuestionController;
use App\Http\Controllers\admin\AdminValueController;
use App\Http\Controllers\FormController;

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
                    Route::get('/', [FormController::class, 'getAllForms']);
                    Route::post('/new', [AdminFormController::class, 'addForm']);
                    Route::patch('/{id}', [AdminFormController::class, 'updateForm']);
                    Route::delete('/{id}', [AdminFormController::class, 'deleteForm']);
                });
                Route::group(['prefix' => 'questions'], function () {
                    Route::post('/new/{id}', [AdminQuestionController::class, 'addQuestion']);
                    Route::patch('/{id}', [AdminQuestionController::class, 'updateQuestion']);
                    Route::delete('/{id}', [AdminQuestionController::class, 'deleteQuestion']);
                });
                Route::group(['prefix' => 'values'], function () {
                    Route::post('/new/{id}', [AdminValueController::class, 'addValue']);
                    Route::patch('/{id}', [AdminValueController::class, 'updateValue']);
                    Route::delete('/{id}', [AdminValueController::class, 'deleteValue']);
                });
            });
        });
    });
    Route::group(['prefix' => 'user'], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['prefix' => 'forms'], function () {
                Route::get('/', [FormController::class, 'getAllForms']);
                Route::get('/answered', [FormController::class, 'getAllAnsweredForms']);
                Route::post('/submit/{id}', [FormController::class, 'answerForm']);
            });
        });
    });
});
