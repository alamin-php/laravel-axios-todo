<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::latest()->get();
    }
    public function getAllTodo()
    {
        # code...
    }
    public function store(Request $request)
    {
        $todo = new Todo();
        $todo->title = $request->title;
        $todo->details = $request->details;
        $todo->save();
        return $todo;
    }
    public function edit($id)
    {
        return Todo::find($id);
    }
    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->title = $request->title;
        $todo->details = $request->details;
        $todo->status = $request->status;
        $todo->save();
        return $todo;
    }
    public function destroy($id)
    {
        return Todo::destroy($id);

    }
    public function todoStatus($id)
    {
        $todoStatus = Todo::find($id);
        $status = $todoStatus->status;
        if($status == true){
            $todoStatus->status = false;
            $todoStatus->save();
        }else{
            $todoStatus->status = true;
            $todoStatus->save();
        }
    }
    public function search(Request $request)
    {
        $search = $request->search;
        $posts = Todo::where('title', 'like', '%'.$search.'%')->latest()->get();
        return response()->json($posts);
    }
}
