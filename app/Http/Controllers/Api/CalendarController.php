<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index(Request $request){
        $start = Carbon::parse($request->start);
        $end = Carbon::parse($request->end);
        $events = Calendar::whereBetween('start',[$start,$end->copy()])->orWhereBetween('end',[$start->copy(),$end])->get();
        return response()->json([
            'events' => $events,
        ]);
    }

    public function store(Request $request){
        Calendar::create([
            'title' => $request->title,
            'start' => $request->start,
            'end' => $request->end,
            'className' => $request->className,
        ]);
        return response()->json([
            'message' => 'Event Stored.',
            'type' => 'success',
        ]);
    }

    public function update($id, Request $request){
        $event = Calendar::find($id);
        $event->update([
            'title' => $request->title,
            'start' => $request->start,
            'end' => $request->end,
            'className' => $request->className,
        ]);
        return response()->json([
            'message' => 'Event Updated.',
            'type' => 'success',
        ]);
    }

    public function destroy($id){
        Calendar::find($id)->delete();
        return response()->json([
            'message' => 'Event Deleted.',
            'type' => 'warning',
        ]);
    }

}
