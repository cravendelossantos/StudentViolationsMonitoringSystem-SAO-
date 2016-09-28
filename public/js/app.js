$('#data_1 .input-group.date').datepicker({
	todayBtn : "linked",
	keyboardNavigation : false,
	forceParse : false,
	calendarWeeks : true,
	autoclose : true,
	format : 'yyyy-mm-dd'
});


$('#violation_date_picker .input-group.date').datepicker({
	todayBtn : "linked",
	keyboardNavigation : false,
	forceParse : false,
	calendarWeeks : true,
	autoclose : true,
	format : 'yyyy-mm-dd'
});

			
   $('#data_4 .input-group.date').datepicker({
   //   	todayBtn : "linked",
  		format : 'yyyy-mm',
                minViewMode: 1,
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                todayHighlight: true
            });

   $('#first_sem_range .input-daterange').datepicker({
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true
            });


   $('#second_sem_range .input-daterange').datepicker({
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true
            });
		
		


	$('#sy_date_btn').click(function (e){
			e.preventDefault();
	$.ajax({
		type : "GET",
		url : "/settings/dates/school-year/set",
		data : $('form#sy_form').serialize(),

	}).fail(function(data){
			 var errors = $.parseJSON(data.responseText);
				var msg="";
				
				$.each(errors.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});


	}).done(function(data) {
			
				swal({   
					title: "Are you sure?",   
					text: "This will create a new administrator user",   
					type: "warning",   
					showCancelButton: true,  
				    confirmButtonColor: "#DD6B55",   
				    confirmButtonText: "Submit",   
				    closeOnConfirm: false 
				}, function(){  
					$.ajax({
						headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			type : "POST",
			url : "/settings/dates/school-year/set",
			data : $('form#sy_form').serialize(),
					}).done(function(data){
							 swal({   
			 			title: "Success!",  
			 	 text: "Account successfully created!",   
			 	 timer: 1000, 
			 	 type: "success",  
			 	 showConfirmButton: false 

					
	
			 	});
					$('form#sy_form').each(function() {
					this.reset();
				});	
	});
});
});
	});




//Report violation
var violation_reports_table = $('.violation-reports-DT').DataTable({
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/report-violation/reports",
		type: "POST",
			},
	"bSort" : true,
	"bFilter" : true,
	"order": [[ 0, "desc" ]],
	"rowId" : 'id',	
	"columns" : [
		{data : 'date_reported'},
		{data : 'student_no'},
		{data : 'first_name'},
		{data : 'last_name'},
		{data : 'name'},
		{data : 'offense_no'},
		{data : 'course'},

		
	]
});

// getViolation();
offenseLevelChange();
function getViolation()
{
	$.ajax({
		headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
		url : '/get-violation/list',
		type: 'POST',
		data: {offense_level : $('#offense_level').val(),},

	}).done(function(data){
	
	
		$.each(data.violations, function(key, value){
				// $('#violation_selection').val(data.violations[key].name);
			   $('#violation_selection').append($("<option></option>").attr("value",value.name).text(value.name));
		});
		

	});
}



function offenseLevelChange()
{

$('#offense_level').on('change', function(e){
	$('#violation_selection').find('option').remove();

	   $('#violation_selection')
         .append($("<option selected='' disabled=''></option>")
                    .attr("value", '0')
                    .text('Select violation'));
getViolation();


});
}

$('#report_btn').prop('disabled', true);


function x(){
	$('#try').show();
setTimeout(function(){

        $('#try').fadeOut('slow');
    },700);
}



function y(){
	$('#try2').show();
setTimeout(function(){

        $('#try2').fadeOut('slow');
    },3000);
}



$('button#report_btn').click(function(e){
	e.preventDefault();

	$.ajax({
		headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			type : "GET",
			url : "/report-violation/report",
			data : $('form#reportViolationForm').serialize(),

			}).fail(function(data){
				//        var errors = data.responseText;
				 var errors = $.parseJSON(data.responseText);
				var msg="";
				
				$.each(errors.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});


	
			}).done(function(data){
		
			var msg = "";


			
				swal({   
					title: "Are you sure?",   
					text: "You will not be able to change or delete this record",   
					type: "warning",   
					showCancelButton: true,  
				    confirmButtonColor: "#DD6B55",   
				    confirmButtonText: "Save",   
				    closeOnConfirm: false 
				}, function(){  
					$.ajax({
						headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			type : "POST",
			url : "/report-violation/report",
			data : $('form#reportViolationForm').serialize(),
					}).done(function(data){
							 swal({   
			 			title: "Success!",  
			 	 text: "Violation Reported",   
			 	 timer: 1000, 
			 	 type: "success",  
			 	 showConfirmButton: false 

	
			 	});


						$('form#reportViolationForm').each(function() {
					this.reset();
				});	
			   	violation_reports_table.ajax.reload();
				

							$('#offense_number').val("");
						$('#committed_offense_number').val("");
						$('#offense_level').val("");
						$('#student_number').val("");
						$('#violation_id').val("");


				$('#last_name').val("").attr("readonly",false);
				$('#first_name').val("").attr("readonly",false);
				
				$('#year_level').val("").attr("readonly",false);
					});
   		});
	});
});





	$('#find_student').on('click', function(e){
			e.preventDefault();
			

			var stud_no = $('#student_no').val();

			//checks if textbox has input
			if (stud_no.length <= 0){

			$('#student_number').val("");
			$('#last_name').val("").attr("readonly",false);
			$('#first_name').val("").attr("readonly",false);
			$('#year_level').val("").attr("readonly",false);
			$('#report_btn').prop('disabled', true);
			$('#violation_description').val("");
			$('#violation_sanction').val("");
			$('#violation_offense_level').val("");	

			} else {		
				$.ajax({
					url : '/report-violation/search/student',
					type : 'GET',
					data : {
						term : stud_no 
					},
				}).done(function(data) {

					//checks if data reponse has value
					if (data.length == 0)
					{
						x();
						$('#violation_selection').val("");
						$('#violation_description').val("");
						$('#violation_sanction').val("");
						$('#violation_offense_level').val("");	
						$('#new').show();
						$('#student_number_error').html("Student not found");
						$('#offense_number').val("").attr("readonly",false);
						$('#committed_offense_number').val("");
						$('#offense_level').val("").attr("readonly",false);
						$('#student_number').val("");
						$('#violation_id').val("").attr("readonly",false);

						$('#last_name').val("").attr("readonly",false);
						$('#first_name').val("").attr("readonly",false);
						$('#year_level').val("").attr("readonly",false);
					}
					else{
					x();
					$('#new').hide();
					$('#student_number_error').html("");
					var value = data[0].value;
					var f_name = data[0].f_name;
					var l_name = data[0].l_name;
					var year_level = data[0].year_level;
					var course = data[0].course;
				$('#student_number').val(value);
				$('#last_name').val(l_name).attr("readonly",true);
				$('#first_name').val(f_name).attr("readonly",true);
				//$('#course').val(ui.item.course);
				$('#year_level').val(year_level + "/" + course).attr("readonly",true);
				//countOffense();
			}

			});

				$('#report_btn').prop('disabled', false);
					}
				
});




$('#new').click(function(){
//load a modal and add record and put into inputs
var student_no = $('#student_no').val();
$('#studentNo').val(student_no);

$('#student_no').val("");
});



$('#new_student_btn').click(function(e){
	e.preventDefault();
	
	$.ajax({
		url : '/report-violation/add-student',
		type: 'POST',
		data: $('form#newStudentForm').serialize(),
	}).done(function(data){
		var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			} else {
				x();
			 swal({   
			 	title: "Success!",  
			 	 text: "Student Added",   
			 	 timer: 3000, 
			 	 type: "success",  
			 	 showConfirmButton: false 
			 	});

			 		$('form#newStudentForm').each(function() {
					this.reset();
				});	
			   

			    $('#myModal').modal('toggle');
			   	$('#new').hide();
				$('#student_number_error').html("");
			}
	});

	var student_no = $('#studentNo').val();
	var first_name = $('#firstName').val();
	var last_name = $('#lastName').val();
	var year_level = $('#yearLevel').val();
	var course = $('#course').val();
	var contact = $('#contactNo').val();

	$('#student_number').val(student_no);
	$('#student_no').val(student_no);
	$('#first_name').val(first_name);
	$('#last_name').val(last_name);
	$('#year_level').val(year_level + "/" + course);
	$('#contact').val(contact);
	


	//ajax
});








	$('#violation_selection').on('change select', function(e) {
		e.preventDefault();


		
		$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			url : '/report-violation/search/violation',
			type : 'GET',
			data : {
				violation : $('#violation_selection').val()
			},
		}).done(function(data) {
			console.log($('#violation_selection').val());
			x();
			var violation_id = data.response['id'];
			var violation_offense_level = data.response['offense_level'];
			var violation_description = data.response['description'];
			//var violation_sanction = data.response['sanction'];


	
			if (data == null) {
				alert('Not Found');
			} else {

				$('#violation_id').val(violation_id);
				$('#violation_offense_level').val(violation_offense_level);
				$('#violation_description').val(violation_description);
				//$('#violation_sanction').val(violation_sanction);
				//$('#violation_details').show();
				countOffense();

			}


	
		});

	});



function countOffense()
{
		$.ajax({
					headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
				},
					url : '/report-violation/offense-no',
					type: 'POST',
					data : $('form#reportViolationForm').serialize(),
				}).done(function(data){

					var sanction = data.sanction['sanction'];	
				var offense_no = data.offense_no;
				var diff_offense_no = data.diff_type_offense;
				
				// if (offense_no != null)	{
				// 	offense_no += 1;

				var current_offense_no = parseInt(offense_no);

				//check if 4th same type
					if (offense_no > 3 /*&& offense_no <=6 && $('#violation_offense_level').val('Less Serious')*/)
					{
						$('#same_type').val(offense_no);
						$('#diff_type').val(diff_offense_no);
						
						//swal("Warning!", 'The student with student number ' + $('#student_number').val() + ' committed ' + (current_offense_no-1) +' same type of ' +  $('#offense_level').val() + ' offense. \n The violation will elevate to Serious offense.' ,  "warning");
						$('#offense_level').prop('selectedIndex', 2);
							$('#violation_selection').find('option').remove();	
							  $('#violation_selection')
        					 .append($("<option selected='' disabled=''></option>")
                    .attr("value", '0')
                    .text('Select violation'));

         				
						//getViolation();
						offenseLevelChange();
						//same type
						elevateToSeriousSame();

					}
				if (diff_offense_no == 2 )
					{		
					
						var current_diff_offense_no = parseInt(diff_offense_no);
						swal("Warning!", 'The student with student number ' + $('#student_number').val() + ' committed ' + (current_diff_offense_no) +' different types of ' +  $('#offense_level').val() + ' offense. \n The violation will elevate to  Serious offense if you submmitted this report.' ,  "warning");
						//$('#offense_warning').html("Commission of" +  a + $('#offense_level').val() + " offenses");
					
				
					}
					 if (diff_offense_no == 3)

					{	
				
						$('#offense_level').prop('selectedIndex', 2);
							$('#violation_selection').find('option').remove();	
							  $('#violation_selection')
         .append($("<option selected='' disabled=''></option>")
                    .attr("value", '0')
                    .text('Select violation'));

         				
						//getViolation();
						offenseLevelChange();
						elevateToSeriousDiff();}
				// 	else if (offense_no >6 && $('#violation_offense_level').val('Serious'))
				// 	{
				// 		$('#violation_offense_level').attr("style", "color:red").val('Very Serious');
	
				// 	}
				// $('#committed_offense_number').val(offense_no);	
				// $('#offense_number').val(offense_no);	
				// $('#sanction').val(sanction);
				// $('#violation_sanction').val(sanction);
				// } 
				$('#offense_number').val(offense_no);
				$('#committed_offense_number').val(offense_no);

				$('#sanction').val(sanction);
				$('#violation_sanction').val(sanction);
				
				// else {
				// $('#violation_offense_level').attr("style", "color:#cccc00");
				// $('#committed_offense_number').val(1);
				// $('#offense_number').val(offense_no);
				// $('#sanction').val(sanction);
				// $('#violation_sanction').val(sanction);



				// }

				//alert(	$('#committed_offense_number').val());
			 
				});
				
			}



function elevateToSeriousDiff()
{
	var data = 'Commission of three less serious ';
	$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
				},
		url : 'report-violation/serious/elevate',
		type: 'POST',
		data: {name : data},
	}).done(function (data){
		console.log(data.violation.description);

				// $('#violation_selection').val(data.violations[key].name);
			   $('#violation_selection')
         .append($("<option></option>")
                    .attr("value",data.violation.name)
                    .text(data.violation.name));

         $('#violation_selection').prop('selectedIndex', 0);
	
	});


}

function elevateToSeriousSame()
{
	var data = 'Repeated commision of less serious';
	$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
				},
		url : 'report-violation/serious/elevate',
		type: 'POST',
		data: {name : data},
	}).done(function (data){
		console.log(data.violation.name);

				// $('#violation_selection').val(data.violations[key].name);
			   $('#violation_selection')
         .append($("<option></option>")
                    .attr("value",data.violation.description)
                    .text(data.violation.name));

         $('#violation_selection').prop('selectedIndex', 0);
	
	});

}









//Lost and found		
//table init	
var lost_and_found_table = $('.lost-and-found-DT').DataTable({
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/lost-and-founds/items/all",
		type: "POST",
			},
	"bSort" : true,
	"bFilter" : true,
	"order": [[ 0, "desc" ]],
	"rowId" : 'id',	
	"columns" : [
		{data : 'date_endorsed'},
		{data : 'item_description'},
		{data : 'endorser_name'},
		{data : 'founded_at'},
		{data : 'owner_name'},
		{data : 'status'},
		{data : 'date_claimed'},
		{data : 'claimer_name'},
	],
	
});

//Report Item
$('button#lost_and_found_reportBtn').click(function(e) {

		e.preventDefault();

		$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			type : "POST",
			url : "/lost-and-found/report-item",
			data : $('form#reportLostItem').serialize(),

		}).done(function(data) {

			var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			} else if (data.success == true) {

				$('form#reportLostItem').each(function() {
					this.reset();
				});
				
				swal({   
			 	title: "Success!",  
			 	 text: "Item Reported",   
			 	 timer: 2000, 
			 	 type: "success",  
			 	 showConfirmButton: false 
			 	});
				lost_and_found_table.ajax.reload();


		

			}
		});

	});

//Cancel Button
	$('button#lost_and_found_cancelBtn').click(function() {
		$('form#reportLostItem').each(function() {
			this.reset();
		});
	}); 



//Get item details to Modal
	$('.lost-and-found-DT').on('click', 'tr', function(){
		var tr_id = $(this).attr('id');
		
		$('form#claim_item')[0].reset();
				$.ajax({
	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
	url: "/lost-and-found/item_details",
	type: "GET",
	data: {
		id : tr_id
	},
}).done(function(data){

	var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			} else {

				if (data.response == null)
				{
					return false;
				}
				else{
					if (data.response['status'] == "Claimed" || data.response['status'] == "Donated")
					{
						return false;
					}
				$('#LAF_Modal').modal('show');
				var item_id = data.response['id'];
				var item_description = data.response['item_description'];
				var date_endorsed = data.response['date_endorsed'];
				var found_at = data.response['founded_at'];
				var owner_name = data.response['owner_name'];
				var endorser_name = data.response['endorser_name'];

				$('#claim_id').val(item_id);
				$('#item_description').val(item_description);
				$('#date_endorsed').val(date_endorsed);
				$('#owner_name').val(owner_name);
				$('#found_at').val(found_at);
				$('#endorser_name').val(endorser_name);
			}
			}

});
	});


//Claim Item
$('#claim_btn').click(function(e){
e.preventDefault();

$.ajax({
	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
	url:'/lostandfound/update',
	type: 'POST',
	data: $('form#claim_item').serialize(),
}).done(function(data){
	var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			}  else {
				$('#LAF_Modal').modal('hide');
				swal({   
			 	title: "Success!",  
			 	 text: "Item Claimed",   
			 	 timer: 2000, 
			 	 type: "success",  
			 	 showConfirmButton: false 
			 	});
				lost_and_found_table.ajax.reload();
			}
});
});


	
	
//Filter Results
$('select#sort_by').change(function(e){
	e.preventDefault();
	var selected = $('select#sort_by option:selected').index();
	

	if (selected == 0) {
		lost_and_found_table.ajax.reload();		
	} else if (selected == 1)	{
		lost_and_found_table.ajax.url('/lost-and-founds/items/sort_by=unclaimed').load();
	} else if (selected == 2) {
		lost_and_found_table.ajax.url('/lost-and-founds/items/sort_by=claimed').load();	
	} else if (selected == 3) {
		lost_and_found_table.ajax.url('/lost-and-founds/items/sort_by=donated').load();	
	}
	

	
});

//LAF Reports


//load reports on date change
$('#month').on('change', function(){


 $('#try').show();

var a  = $('#month').val();
$.ajax({
  headers : {
        'X-CSRF-Token' : $('input[name="_token"]').val()
      },
       	url : "/lost-and-found/reports/stats",
   type: 'POST',
   	data : {month : a},
   async: false,
   success: function(response){
     items = response;

    
   }
});

    var data = [{
        label: "UNCLAIMED",
        data: items['unclaimed'],
        color: "#d3d3d3",
    }, {
        label: "CLAIMED",
        data: items['claimed'],
        color: "#54cdb4",
    }, {
        label: "DONATED",
        data: items['donated'],
        color: "#1ab394",
    }, /*{
        label: "TOTAL",
        data: 52,
        color: "#1ab394",
    }*/];

    var plotObj = $.plot($("#flot-pie-chart"), data, {
        series: {
            pie: {
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
        	 //percentage content: "%y.0, %s", // show value to 0 decimals
            content: function(label,x,y){
    return y+" item/s "+ "(" + label + ")";
},
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    });


	
$('.lost-and-found-reports-DT').DataTable().destroy();
$('.lost-and-found-reports-DT').DataTable({

	"ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/lost-and-found/reports/list",
		type: "POST",
		data : {month : a},
},
"columns" : [
{data: 'claimed'},
{data: 'unclaimed'},
{data: 'donated'},
{data: 'total'},
	],

	dom : '<"html5buttons"B>Tgtip',
	buttons : [{
		extend : 'csv',
		title : 'LOST AND FOUND ITEMS',
	}, {
		extend :'excel',
		title : 'LOST AND FOUND ITEMS',
	} , {
		extend : 'pdf',
		title : 'Lost and Found Reports',
	} , {
		extend : 'print',
		title : 'LOST AND FOUND ITEMS',
		customize : function(win) {
			$(win.document.body).addClass('white-bg');
			$(win.document.body).css('font-size', '8px').prepend('<label>Text</label>');
			$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
		}
	}]
});
$('#try').hide();
});


//load current month reports



//Locker Management
function lockerRange()
{
	var num = parseInt($('#no_of_lockers').val());
	var from = parseInt($('#from').val());

	var val = num + from;
	$('#to').val(val - 1);

}

$('#new_location').hide();
$('#m_lessee').hide();


$('#from').on('input', function (){
	lockerRange();
});

$('#no_of_lockers').on('input', function (){
	lockerRange();
});


$('#location').change(function (e){
	var building = $('#location').val();

	if (building == 'new')
	{
		$('#new_location').show();
	} else {

		$('#new_location').hide();

	}

});



	$('#add_locker_btn').click(function(e){
		e.preventDefault();

		$.ajax({
			url : '/lockers/add',
			type: 'POST',	
			data: $('#add_locker_form').serialize(),
			success: function(data){
				console.log(data);
			},
			error: function(data){

			}
		});
	});


var lockers_table = $('.lockers-DT').DataTable({
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/lockers/all",
		type: "POST",
			},
	"bSort" : true,
	"bFilter" : true,
	"order": [[ 0, "desc" ]],
	"rowId" : 'id',	
	"columns" : [

		{data : 'id'},
		{data : 'location'},
		{data : 'lessee'},
		{data : 'status'},		  



		
	],
	dom : '<"html5buttons"B>lTfgtip',
	buttons : [{
		extend : 'csv',
		title : 'STUDENT RECORDS',
	}, {
		extend :'excel',
		title : 'STUDENT RECORDS',
	} , {
		extend : 'pdf',
		title : 'STUDENT RECORDS',
	} , {
		extend : 'print',
		title : 'STUDENT RECORDS',
		customize : function(win) {
			$(win.document.body).addClass('white-bg');
			$(win.document.body).css('font-size', '8px').prepend('<label>Text</label>');
			$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
		}
	}]
});



$('.lockers-DT').on('click', 'tr', function(){
		var tr_id = $(this).attr('id');
		
		//$('form#claim_item')[0].reset();
				$.ajax({
	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
	url: "/locker/details",
	type: "GET",
	data: {
		id : tr_id
	},
}).done(function(data){

	var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			} else {

				if (data.response == null)
				{
					return false;
				}
				else{
					if (data.response['status'] == "Occupied")
					{
						return false;
					}
				$('#lockers_modal').modal('show');
				
				var locker_no = data.response['id'];
				var location = data.response['location'];


				$('#m_locker_no').val(locker_no);
				$('#m_location').val(location);
				
				var current_status = data.response['status'];

				
				if (current_status == 'Available'){
					$('#m_status_available').prop('checked', true);
				} else if (current_status == 'Damaged') {
					$('#m_status_damaged').prop('checked', true);
				} else if (current_status == 'Locked') {
					$('#m_status_locked').prop('checked', true);
				}

				$('input[type=radio][name=m_update_status]').change(function(e){
					e.preventDefault();
					
					if (this.value == 1)
					{
						$('#m_lessee').hide();
						return false;
					} else if (this.value == 2) {
						$('#m_lessee').show();
					}

					else if (this.value > 2) {
						$('#m_lessee').hide();
					}
					
				});

			}
			}

});
	});



$('#locker_update').click(function(e){
	e.preventDefault();

	$.ajax({
		url : '/locker/update-status',
		type: 'POST',
		data: $('form#update_locker').serialize(),

	}).done(function(data){
		console.log(data);
	});
});






//Student Records

	var student_records_table = $('.student-records-DT').DataTable({
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/student-records/list",
		type: "POST",
			},
	"bSort" : true,
	"bFilter" : true,
	"order": [[ 0, "desc" ]],
	"rowId" : 'id',	
	"columns" : [

		{data : 'student_no'},
		{data : 'first_name'},
		{data : 'last_name'},
		{data : 'course'},
		{data : 'year_level'},
		{data : 'contact_no'},

		
	],
	dom : '<"html5buttons"B>lTfgtip',
	buttons : [{
		extend : 'csv',
		title : 'STUDENT RECORDS',
	}, {
		extend :'excel',
		title : 'STUDENT RECORDS',
	} , {
		extend : 'pdf',
		title : 'STUDENT RECORDS',
	} , {
		extend : 'print',
		title : 'STUDENT RECORDS',
		customize : function(win) {
			$(win.document.body).addClass('white-bg');
			$(win.document.body).css('font-size', '8px').prepend('<label>Text</label>');
			$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
		}
	}]
});




//Student Records

	var violation_records_table = $('.violation-records-DT').DataTable({
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/violation-records/list",
		type: "POST",
			},
	"bSort" : true,
	"bFilter" : true,
	"order": [[ 0, "desc" ]],
	"rowId" : 'id',	
	"columns" : [

		{data : 'name'},
		{data : 'description'},
		{data : 'offense_level'},
		{data : 'first_offense_sanction'},
		{data : 'second_offense_sanction'},
		{data : 'third_offense_sanction'},
		
	],
	dom : '<"html5buttons"B>lTfgtip',
	buttons : [{
		extend : 'csv',
		title : 'VIOLATION RECORDS',
	}, {
		extend :'excel',
		title : 'VIOLATION RECORDS',
	} , {
		extend : 'pdf',
		title : 'VIOLATION RECORDS',
	} , {
		extend : 'print',
		title : 'STUDENT RECORDS',
		customize : function(win) {
			$(win.document.body).addClass('white-bg');
			$(win.document.body).css('font-size', '8px').prepend('<label>Text</label>');
			$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
		}
	}]
});	

/*$("#import_btn").on('submit',(function(e) {
		e.preventDefault();




		console.log($('#import_file'));
console.log(this);
		$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			url: '/violation-records/importExcel',
			type: 'POST',
			data : $('#import_file'),
		success : function(response){
			console.log(data);
			console.log(response);
		
		},
		error : function(response){

		}	
	});
		}));
*/

$('#truncate_btn').click(function(e){
	e.preventDefault();

	swal({title: "Are you sure?",   
			text: "This will empty the violation records",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Proceed",   
			cancelButtonText: "Cancel",   
			closeOnConfirm: false,   
			closeOnCancel:true  }, 
			function(isConfirm){   
				if (isConfirm) {  
				$.ajax({
		headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
		url : '/violation-records/truncate',
		type: 'POST',
		success : function(response){
		if (response.success == true){
			swal({   
			 	title: "Success!",  
			 	 text: "Table truncated",   
			 	 timer: 2000, 
			 	 type: "success",  
			 	 showConfirmButton: false,

			 	});
			 	violation_records_table.ajax.reload();
		}
		else if (response.success == false) {
			var msg="";
				$.each(response.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Failed", msg, "error");  

				});




 
		}
				
	
		},
/*		error : function(response){
			if (response.success == false){
			
			}
		}*/
	});  		 
				} 
			/*	else {     
					alert closed 
				} */
			});
	
});







//Sanction


var sanctions_table = $('.sanctions-DT').DataTable({
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
    	url : "/sanctions/student-violation/records",
		type: "POST",
			},
	"bSort" : true,
	"bFilter" : true,
	"order": [[ 0, "desc" ]],
	"rowId" : 'id',	
	"columns" : [
		
		{data : 'student_id'},
		{data : 'first_name'},
		{data : 'last_name'},
		{data : 'name'},
		{data : 'sanction'},
			

		
	]
});

$('.sanctions-DT').on('click', 'tr', function(){
		var tr_id = $(this).attr('id');
						$('#sanction_modal').modal('show');
		$('form#claim_item')[0].reset();
				$.ajax({
	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
	url: "",
	type: "GET",
	data: {
		id : tr_id
	},
}).done(function(data){

	var msg = "";
			if (data.success == false) {
				$.each(data.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

			} else {

				if (data.response == null)
				{
					return false;
				}
				else{
					if (data.response['status'] == "Claimed" || data.response['status'] == "Donated")
					{
						return false;
					}

	
			}
			}

});
	});
/*
	$('#sanctions_find_student').click(function(e){

		$.ajax({
			headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val()
			},
			url: '/sanctions/search/student',
			type: 'POST',
			data: { term : $('#student_no').val()},

		}).done(function (data){
			 
		});
	});*/


/*

	$('#find_student').on('click', function(e){
			e.preventDefault();
			

			var stud_no = $('#student_no').val();

			//checks if textbox has input
			if (stud_no.length <= 0){

			$('#student_number').val("");
			$('#last_name').val("").attr("readonly",false);
			$('#first_name').val("").attr("readonly",false);
			$('#year_level').val("").attr("readonly",false);
			$('#report_btn').prop('disabled', true);
			$('#violation_description').val("");
			$('#violation_sanction').val("");
			$('#violation_offense_level').val("");	

			} else {		
				$.ajax({
					url : '/report-violation/search/student',
					type : 'GET',
					data : {
						term : stud_no 
					},
				}).done(function(data) {

					//checks if data reponse has value
					if (data.length == 0)
					{
						x();
						$('#violation_selection').val("");
						$('#violation_description').val("");
						$('#violation_sanction').val("");
						$('#violation_offense_level').val("");	
						$('#new').show();
						$('#student_number_error').html("Student not found");
						$('#offense_number').val("").attr("readonly",false);
						$('#committed_offense_number').val("");
						$('#offense_level').val("").attr("readonly",false);
						$('#student_number').val("");
						$('#violation_id').val("").attr("readonly",false);

						$('#last_name').val("").attr("readonly",false);
						$('#first_name').val("").attr("readonly",false);
						$('#year_level').val("").attr("readonly",false);
					}
					else{
					x();
					$('#new').hide();
					$('#student_number_error').html("");
					var value = data[0].value;
					var f_name = data[0].f_name;
					var l_name = data[0].l_name;
					var year_level = data[0].year_level;
					var course = data[0].course;
				$('#student_number').val(value);
				$('#last_name').val(l_name).attr("readonly",true);
				$('#first_name').val(f_name).attr("readonly",true);
				//$('#course').val(ui.item.course);
				$('#year_level').val(year_level + "/" + course).attr("readonly",true);
				//countOffense();
			}

			});

				$('#report_btn').prop('disabled', false);
					}
				
});*/



//Time log

$('.CS-DT').DataTable().destroy();

function searchStudentCS(){
$('.CS-DT').DataTable().destroy();
var CS_table = $('.CS-DT').DataTable({
	
	"bFilter" : false,
	"processing": true,
    "serverSide": true,
    "ajax": {
    	headers : {
				'X-CSRF-Token' : $('input[name="_token"]').val(),
			},
    	url : "/community-service/search",
		data: function(d){
			d.student_id = $('input[name=cs_student_no]').val();
		
			},
		},

/*	"bSort" : true,
	"bFilter" : true,*/
/*	"order": [[ 0, "desc" ]],*/
	// "rowId" : 'id',	
	"columns" : [
		
		{data : 'student_id'},
		{data : 'time_in' },
		{data : 'time_out' },
		{data : 'status' },
		{data : 'required_hours' },
	],
});
	CS_table.draw();



}

	$('#CS_find_student').click(function(e){
		searchStudentCS();
		
		e.preventDefault();

	});
/*
$('.clockpicker').clockpicker()
	.find('input').change(function(){
		console.log(this.value);
	});*/



$('.time_in').clockpicker({
	
	 twelvehour: true

	});


$('.time_out').clockpicker({

	twelvehour: true
});

$('#new_log').on('click', function(e){
	e.preventDefault();

	$.ajax({
		url : '/community-service/new_log',
		type: 'GET',
		data: $('#new_log_form').serialize(),

	}).fail(function(data){
				 var errors = $.parseJSON(data.responseText);
				var msg="";
				
				$.each(errors.errors, function(k, v) {
					msg = msg + v + "\n";
					swal("Oops...", msg, "warning");

				});

	}).done(function(data){

	});
});

















// DataTables
//with Buttons

$('.dataTables-example').DataTable({
	dom : '<"html5buttons"B>lTfgtip',

});

$('.dataTables-without-buttons').DataTable({
	dom : '<"html5buttons">'

});