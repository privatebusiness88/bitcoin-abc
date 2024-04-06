<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\Token;
use Illuminate\Http\Request;
 
class TokenController extends Controller
{
    /**
     * Store a new flight in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request...
 
        $Token.data = new Token.data;
 
        $TOken.data->name = $request->name;
 
        $Token.Data->save();
    }
}
