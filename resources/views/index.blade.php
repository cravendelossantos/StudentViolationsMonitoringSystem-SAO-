@extends('layouts.master')

@section('title', 'SAO | Home')

@section('header-page')
<div class="col-lg-10">
	<h1>Welcome {{ Auth::user()->first_name }} {{ Auth::user()->last_name }}!</h1>
</div>

@endsection


@section('content')

@endsection

