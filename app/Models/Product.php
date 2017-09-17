<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Product extends Model
{

    protected $fillable = ['name','description','quantity','price'];
    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'products';

    public function index(){
        return array("aa"=>"bb");

    }

    public function insert_raw(){

        return DB::SELECT('insert into products (name) VALUES ("ddssE")');
    }
}
