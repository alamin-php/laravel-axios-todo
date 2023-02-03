<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace'=>'App\Http\Controllers'], function(){
    Route::group(['prefix'=>'todo'], function(){
        Route::get('/', 'TodoController@index')->name('todo.index');
        Route::get('/list', 'TodoController@getAllTodo')->name('todo.data');
        Route::post('/store', 'TodoController@store')->name('todo.store');
        Route::get('/edit/{id}', 'TodoController@edit');
        Route::put('/update/{id}', 'TodoController@update')->name('todo.update');
        Route::get('/destroy/{id}', 'TodoController@destroy')->name('todo.destroy');
        Route::put('/update-status/{id}', 'TodoController@todoStatus')->name('todo.status');
        Route::get('/search', 'TodoController@search')->name('todo.search');
    });
});
