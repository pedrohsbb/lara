<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('product', 'ProductController');

Route::get('jobs', 'JobsController@api');


//Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {
//    Route::get('/', 'AdminController@getIndex');
//    Route::get('projetos', 'ProjetosController@getIndex');
//    Route::get('projetos/inserir', 'ProjetosController@getInserir');
//    Route::post('projetos/inserir', 'ProjetosController@postInserir');
//    Route::get('projetos/editar/{id}', 'ProjetosController@getEditar');
//    Route::post('projetos/editar/{id}', 'ProjetosController@postEditar');
//    Route::post('projetos/deletar/{id}', 'ProjetosController@postDeletar');
//
//});