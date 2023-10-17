<?php

namespace App\Http\Controllers\Web\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePdfRequest;
use App\Http\Requests\UpdatePdfRequest;
use App\Http\Resources\V1\PdfResource;
use App\Models\V1\Pdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function __construct() 
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Pdf::paginate(7)
            ->appends($request->query());
        
        foreach($data as $d) {
            unset($d->content);
        }

        return compact("data");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePdfRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pdf $pdf)
    {
        $data = $pdf;
        return compact("data");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePdfRequest $request, Pdf $pdf)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pdf $pdf)
    {
        //
    }
}
