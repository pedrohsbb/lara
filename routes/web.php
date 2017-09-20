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

//Route::get('/', function () {
//    return view('welcome');
//});



Route::get('product', 'ProductController@index');

Route::get('layboot', 'ProductController@layboot');

Route::post('product', 'ProductController@create');

Route::post('salva_produto', 'ProductController@salva_produto');

Route::post('product/{product}', 'ProductController@store');

//Route::post('product/{estoque_itens2}', 'ProductController@store');


Route::resource('docs/api', 'DocsController');


//Route::post('product', 'ProductController@store');



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