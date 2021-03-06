@extends('layouts.master')

@section('title', 'SAO | Report Violation')

@section('header-page')
<div class="col-md-12">
	<h1>Report a Violation</h1>
</div>

@endsection

@section('content')
<link href="/css/plugins/clockpicker/clockpicker.css" rel="stylesheet">
<script src="/js/plugins/clockpicker/clockpicker.js"></script>
<div class="row">

	<div class="col-md-12 animated fadeInRight">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<output id="v_id">
					{{ $violation_id }}
				</output>

				<div class="ibox-tools"></div>

				<div class="ibox-content">
				
					<form role="form" action="" id="reportViolationForm" method="POST">
						{{ csrf_field() }}
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="row">
							<div id="try" style="display:none">
								<div class="sk-spinner sk-spinner-wave">
									<div class="sk-rect1"></div>
									<div class="sk-rect2"></div>
									<div class="sk-rect3"></div>
									<div class="sk-rect4"></div>
									<div class="sk-rect5"></div>
								</div>

							</div>

							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-heading">
										Student Information
									</div>
									<div class="panel-body">

										<input type="hidden" name="student_number" id="student_number">
										<input type="hidden" name="complainant_id" id="complainant_id">
										<div class="form-group" >

											<label>Student No.</label>
											<a class="btn btn-white btn-xs" id="new" style="display:none" data-toggle="modal" data-target="#myModal" ><i class="fa fa-male"></i> New Student Record</a>
											<div class="input-group">
												<input type="text" class="form-control" placeholder="Student No." name="student_no" id="student_no" class="form-control" maxlength="10">
												<span class="input-group-btn">
													<button class="btn btn-default" id="find_student" type="button">
														<i class="fa fa-search"></i>
													</button> </span>
											</div>

											<label id="student_number_error" class="error"></label>

										</div>

										<section id="student_info" style="">

											<div class="col-md-6">
												<div class="form-group">
													<label>Name</label>
													<output name="student_name" id="student_name" placeholder="Student Name" style="text-transform: capitalize"></output>
												</div>
											</div>

											<div class="col-md-6">
												<div class="form-group">
													<label>Year/Course</label>
													<output name="year_level" id="year_level" placeholder="Year/Course" ></output>
													<!-- <output name="course" id="course"></output> -->
												</div>
											</div>

											<div class="col-md-6">
												<div class="form-group">
													<label>Guardian Name</label>
													<output name="guardian_name" id="guardian_name" placeholder="Guardian Name" ></output>
													<!-- <output name="course" id="course"></output> -->
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label>Guardian Contact No.</label>
													<output name="guardian_contact_no" id="guardian_contact_no" placeholder="Guardian Contact No." ></output>
													<!-- <output name="course" id="course"></output> -->
												</div>
											</div>

											<div class="col-md-6">

												<label>Offense Number #</label>

												<output name="committed_offense_number" id="committed_offense_number" placeholder="Offense Number" ></output>
												<input type="hidden" name="offense_number" id="offense_number">
											</div>
										</section>

									</div>
								</div>
							</div>

							<div class="col-md-12">

								<div class="panel panel-default">
									<div class="panel-heading">

										Violation Report Details
									</div>

									<div class="panel-body">
										<div class="col-md-3">
											<div class="form-group" id="violation_date_picker">
												<label>Date Committed</label>
												<div class="input-group date" id="data_1">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" id="date_committed" name="date_committed" class="form-control">
												</div>
											</div>
										</div>

										<div class="col-md-3">
											<label>Time Reported</label>
											<div class="input-group clockpicker time_reported" data-autoclose="true">
												<input type="text" class="form-control" value="" name="time_reported" id="time_reported">
												<span class="input-group-addon"> <span class="fa fa-clock-o"></span> </span>
											</div>

										</div>

										<div class="col-md-6">
						<div class="form-group">

								<label>School Year</label>


<!--                 <select name="school_year" id="school_year" class="form-control">
                  @foreach ($schoolyear as $schoolyear)
                  <option>{{$schoolyear->school_year }}</option>
                  @endforeach

                </select>  -->
									<output id="school_year1" name="school_year1" class="form-control" autofocus="" aria-required="true"  >{{ $schoolyear->school_year }}</output>
									<input type="hidden" id="school_year" name="school_year" class="form-control" autofocus="" aria-required="true" value="{{ $schoolyear->school_year }}">





					</div>
										</div>

										<div class="col-md-12">
											<div class="form-group" >

												<label>Complainant ID</label>&nbsp;&nbsp;<a class="btn btn-white btn-xs" id="new_complainant" style="display:none" data-toggle="modal" data-target="#complainant_modal" ><i class="fa fa-male"></i> New Complainant Record</a>
												<a class="btn btn-white btn-xs" id="new" style="display:none" data-toggle="modal" data-target="#complainant_modal" ><i class="fa fa-male"></i> New Record</a>
												<div class="input-group">
													<input type="text" class="form-control" placeholder="Complainant ID" name="complainant" id="complainant" class="form-control" maxlength="10" style="text-transform: capitalize;">
													<span class="input-group-btn">
														<button class="btn btn-default" id="find_complainant" type="button">
															Find
														</button> </span>
												</div>

												<label id="complainant_error" class="error"></label>

												<div class="form-group">
													<label>Complainant Details</label>
													<output name="first_name" id="complainant_info" placeholder="First Name" style="text-transform: capitalize"></output>
												</div>
											</div>

										</div>

										<div class="col-md-6">

											<div class="form-group">
												<label>Offense level</label>
												<input type="text" id="offense_level" name="offense_level" class="form-control" readonly="">

											</div>
										</div>

										<br>
										<div class="col-md-6">
											<div class="form-group">
												<label>Violation</label>
												<input type="hidden" name="violation_id" id="violation_id">
												<select class="form-control" id="violation_selection" name="violation">
													<option autofocus="" disabled selected >Violation</option>
													@foreach ($violations as $violation)
													<option> {{ $violation->name }} </option>
													@endforeach
												</select>

												<a href="/violation-list" id="violations_import" style="display:none">Import Violations</a>
											</div>
										</div>
										<section id="violation_details" style="display">
											<div class="col-md-12">
												<div class="form-group">
													<label>Description</label>
													<output id="violation_description"></output>

												</div>
											</div>

											<div class="col-md-6">
												<div class="form-group">
													<label>Sanction</label>
													<output id="violation_sanction" name="violation_sanction"></output>
													<input type="hidden" id="sanction"  name="sanction">
													</p>
												</div>
											</div>

										</section>
									</div>
								</div>
							</div>

						</div>
				</div>

				<div class="ibox-footer">
					<button class="btn btn-w-m btn-primary" id="report_btn" type="submit">
						<strong>Submit</strong>
					</button>
					</form>
				</div>
			</div>

		</div>
	</div>
</div>


<div class="row">

	<div class="col-md-12 animated fadeInRight">

		<div id="try2" style="display:none">
			<div class="sk-spinner sk-spinner-wave">
				<div class="sk-rect1"></div>
				<div class="sk-rect2"></div>
				<div class="sk-rect3"></div>
				<div class="sk-rect4"></div>
				<div class="sk-rect5"></div>
			</div>

		</div>

		<div class="ibox float-e-margins">
		<div class="ibox-title">
			<h5>Violation Reports</h5>
		</div>
			<div class="ibox-content" id="table-content">
				<div class="table-responsive">
					<div id="DataTables_Table_0_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">

						<table class="table table-striped table-bordered table-hover violation-reports-DT dataTable" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
							<thead>

								<th>Date Committed</th>
								<th>Student No.</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Violation</th>
								<th>Offense Number</th>
								<th>Course</th>

							</thead>

						</table>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>

<div id="myModal" class="modal fade" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					&times;
				</button>
				<h4 class="modal-title">New Student Violation Record</h4>
			</div>

			<form role="form" id="newStudentForm" method="POST">

				{!! csrf_field() !!}

				<div class="ibox-content">

					<div class="form-group">
						<label>Student No.</label>
						<input type="text" placeholder="Student No." class="form-control" id="studentNo" name="studentNo">
					</div>

					<div class="form-group">
						<label>First Name</label>
						<input type="text" placeholder="First Name" class="form-control" id="firstName" name="firstName" style="text-transform: capitalize">
					</div>

					<div class="form-group">
						<label>Last Name</label>
						<input type="text" placeholder="Last Name" class="form-control" id="lastName" name="lastName" style="text-transform: capitalize">
					</div>

					<div class="form-group">
						<label>Course</label>
						<select class="form-control" id="course" name="course">
							<option autofocus="" disabled selected >Select course</option>
							@foreach ($courses as $course)
							<option >{{$course->description}}</option>
							@endforeach

						</select>
					</div>

					<div class="form-group">
						<label>Year</label>
						<select name="yearLevel" id="yearLevel" class="form-control">
							<option disabled="" selected="">Select Year</option>
						</select>
					</div>

					<label>Contact No.</label>
					<div class="input-group m-b">
						<span class="input-group-addon">+63</span>
						<input type="text" placeholder="Contact No.	" class="form-control" id="studentContactNo" name="studentContactNo" maxlength="10">
					</div>

					<div class="form-group">
						<label>Guardian Name</label>
						<input type="text" placeholder="Guardian Name" class="form-control" id="guardianName" name="guardianName" style="text-transform: capitalize">
					</div>

					<label>Guardian Contact No.</label>
					<div class="input-group m-b">
						<span class="input-group-addon">+63</span>
						<input type="text" placeholder="Guardian Contact No." class="form-control" id="guardianContactNo" name="guardianContactNo" maxlength="10">
					</div>

					<div class="modal-footer">
						<button class="btn btn-w-m btn-primary" type="button" id="new_student_btn">
							<strong>Save</strong>
						</button>
						<button type="button" class="btn btn-w-m btn-danger" id="cancelBtn" data-dismiss="modal">
							<strong>Cancel</strong>
						</button>
					</div>

			</form>
		</div>
	</div>
</div>

<div id="complainant_modal" class="modal fade" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					&times;
				</button>
				<h4 class="modal-title">New Complainant Record</h4>
			</div>

			<form role="form" id="new_complainant_form" method="POST">

				{!! csrf_field() !!}

				<div class="ibox-content">

					<div class="form-group">
						<label>Complainant ID</label>
						<input type="text" placeholder="Complainant ID" class="form-control" id="complainantId" name="complainantId">
					</div>

					<div class="form-group">
						<label>Name</label>
						<input type="text" placeholder="Complainant Name" class="form-control" id="complainantName" name="complainantName" style="text-transform: capitalize">
					</div>

					<div class="form-group">
						<label>Position</label>
						<select name="complainantPosition" id="complainantPosition" class="form-control">
							<option>Guard</option>
							<option>Faculty</option>
							<option>Student</option>
						</select>
					</div>

					<!-- 		<label>Contact No.</label>
					<div class="input-group m-b">
					<span class="input-group-addon">+63</span>
					<input type="text" placeholder="Contact No.	" class="form-control" id="contactNo" name="contactNo" maxlength="10">
					</div> -->

					<div class="modal-footer">
						<button class="btn btn-w-m btn-primary" type="button" id="new_complainant_btn">
							<strong>Save</strong>
						</button>
						<button type="button" class="btn btn-w-m btn-danger" id="cancelBtn" data-dismiss="modal">
							<strong>Cancel</strong>
						</button>
					</div>
</div>
			</form>
		</div>
	</div>
</div>

<script type="text/javascript">
	$('.time_reported').clockpicker({

		twelvehour : true

	});

	$('#find_complainant').on('click', function(e) {
		e.preventDefault();

		var id_no = $('#complainant').val();

		//checks if textbox has input
		if (id_no.length <= 0) {

			$('#complainant_id').val("");

		} else {
			$.ajax({
				url : '/report-violation/search/complainant',
				type : 'GET',
				data : {
					term : id_no
				},
			}).done(function(data) {

				//checks if data reponse has value
				if (data.length == 0) {
					x();
					$('#complainant_id').val("");

					$('#new_complainant').show();
					$('#complainant_error').html("Complainant not found");

					$('#complainant_info').val("").attr("readonly", false);

				} else {
					x();
					$('#new_complainant').hide();
					$('#complainant_error').html("");
					var value = data[0].value;
					var c_name = data[0].name;
					var c_pos = data[0].position;
					$('#complainant_id').val(value);
					$('#complainant_info').val(c_name + " ( " + c_pos + " )").attr("readonly", true);

				}

			});

		}

	});

	$('#new_complainant_btn').click(function(e) {
		e.preventDefault();

		$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			url : '/report-violation/add-complainant',
			type : 'POST',
			data : $('form#new_complainant_form').serialize(),
		}).done(function(data) {
			var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			} else {
				x();
				swal({
					title : "Success!",
					text : "Complainant Added",
					timer : 3000,
					type : "success",
					showConfirmButton : false
				});

				$('form#new_complainant_form').each(function() {
					this.reset();
				});

				$('#complainant_modal').modal('toggle');
				$('#new_complainant').hide();
				$('#complainant_error').html("");

				$('#find_complainant').trigger('click', function(e) {
					e.preventDefault();
				});
			}

		});

		//ajax
	});

	$('#new_complainant').click(function() {
		//load a modal and add record and put into inputs
		var c_id = $('#complainant').val();
		$('#complainantId').val(c_id);
		$('#complainant_id').val("");

	});

	$('#course').on('change', function(e) {
		e.preventDefault();

		$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			url : '/report-violation/search/course/years',
			type : 'GET',
			data : {
				course : $('#course').val()
			},
		}).done(function(data) {

			if (data == null) {
				alert('Not Found');
			} else {

				if (data.no_of_years == 5) {
					$('#yearLevel').find('option').remove();
					$('#yearLevel').append($("<option selected='' disabled=''></option>").attr("value", '0').text('Select Year'));
					$('#yearLevel').append($("<option></option>").attr("value", "1st").text("1st Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "2nd").text("2nd Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "3rd").text("3rd Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "4th").text("4th Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "5th").text("5th Year"));

				} else {
					$('#yearLevel').find('option').remove();

					$('#yearLevel').append($("<option selected='' disabled=''></option>").attr("value", '0').text('Select Year'));
					$('#yearLevel').append($("<option></option>").attr("value", "1st").text("1st Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "2nd").text("2nd Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "3rd").text("3rd Year"));
					$('#yearLevel').append($("<option></option>").attr("value", "4th").text("4th Year"));
				}

			}

		});

	});

</script>

<style>
	.sk-spinner-wave.sk-spinner {
		margin: 0 auto;
		width: 50px;
		height: 30px;
		text-align: center;
		font-size: 10px;
		position: fixed;
		z-index: 999;
		overflow: show;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	#try {
		width: auto;
		height: auto;
		position: fixed;
		z-index: 999;
		overflow: show;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #f3f3f4;
	}
	#try2 {
		width: auto;
		height: auto;
		position: fixed;
		z-index: 999;
		overflow: show;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #f3f3f4;
	}
</style>

@endsection
