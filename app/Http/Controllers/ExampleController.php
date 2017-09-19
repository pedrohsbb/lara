<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\App;

use App\Product;
use function Psy\debug;
/**
 * @resource Example
 *
 * Longer description
 */
class ExampleController extends Controller
{

    /**
     * This iaas the short description [and should be unique as anchor tags link to this in navigation menu]
     *
     * This can be an optional longer description of your API call, used within the documentation.
     *
     */
    public function foo(Request $request)
    {
        $request->validate([
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);

    }
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'body' => 'required',
            'type' => 'in:foo,bar',
            'thumbnail' => 'required_if:type,foo|image',
        ];
    }
}
