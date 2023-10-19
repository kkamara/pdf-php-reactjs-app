<?php

namespace App\Http\Controllers\Web\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StorePdfRequest;
use App\Http\Requests\V1\UpdatePdfRequest;
use App\Models\V1\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;

class PdfController extends Controller
{
    public function __construct(protected Pdf $pdf = new Pdf()) 
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Pdf::where("deleted_at", "=", null)
            ->orderByDesc("id")
            ->paginate(7)
            ->appends($request->query());
        
        foreach($data as $d) {
            unset($d->content);
        }

        return compact("data");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePdfRequest $request)
    {
        $name = htmlspecialchars($request->input("name"));
        $birthday = htmlspecialchars($request->input("birthday"));
        $this->pdf->users_id = $request->user()->id;
        $this->pdf->name = $name;
        $this->pdf->birthday = $birthday;
        // Set PDF Content.
        $domPdf = DomPdf::loadHTML(
            "<p>Name: {$this->pdf->name}</p><br/><p>Birthday: {$this->pdf->birthday}</p>"
        )->setPaper('a4', 'landscape')->setWarnings(false);
        $this->pdf->content = base64_encode($domPdf->output());
        $this->pdf->save();
        $data = $this->pdf;
        return compact("data");
    }

    /**
     * Display the specified resource.
     */
    public function show(Pdf $pdf, Request $request)
    {
        $data = $pdf;
        return compact("data");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePdfRequest $request, Pdf $pdf)
    {
        if ($request->user()->id !== $pdf->users_id) {
            return response()->json([
                "message" => "Unauthorized."
            ], Response::HTTP_UNAUTHORIZED);
        }
        if ($request->method() === "PUT") {
            $pdf->name = htmlspecialchars($request->input("name"));
            $pdf->birthday = htmlspecialchars($request->input("birthday"));
            $domPdf = DomPdf::loadHTML(
                "<p>Name: {$pdf->name}</p><br/><p>Birthday: {$pdf->birthday}</p>"
            )->setPaper('a4', 'landscape')->setWarnings(false);
            $pdf->content = base64_encode($domPdf->output());
            $pdf->save();
        } else {
            if ($request->input("name")) {
                $pdf->name = htmlspecialchars($request->input("name"));
            }
            if ($request->input("birthday")) {
                $pdf->birthday = htmlspecialchars($request->input("birthday"));
            }
            if ($request->input("name") || $request->input("birthday")) {
                $domPdf = DomPdf::loadHTML(
                    "<p>Name: {$pdf->name}</p><br/><p>Birthday: {$pdf->birthday}</p>"
                )->setPaper('a4', 'landscape')->setWarnings(false);
                $pdf->content = base64_encode($domPdf->output());
                $pdf->save();
            }
        }
        return ["data" => $pdf];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pdf $pdf)
    {
        //
    }
}
