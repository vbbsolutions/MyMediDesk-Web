/*
Author       : Dreamguys
Template Name: Doccure - Bootstrap Template
Version      : 1.0
*/

(function($) {
    "use strict";
	
	// Pricing Options Show
	
	$('#pricing_select input[name="rating_option"]').on('click', function() {
		if ($(this).val() == 'price_free') {
			$('#custom_price_cont').hide();
		}
		if ($(this).val() == 'custom_price') {
			$('#custom_price_cont').show();
		}
		else {
		}
	});
	
	// Education Add More
	
    $(".education-info").on('click','.trash', function () {
		$(this).closest('.education-cont').remove();
		return false;
    });

    $(".add-education").on('click', function () {
		
		var educationcontent = '<div class="row form-row education-cont">' +
			'<div class="col-12 col-md-10 col-lg-11">' +
				'<div class="row form-row">' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>Degree</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>College/Institute</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>Year of Completion</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
		'</div>';
		
        $(".education-info").append(educationcontent);
        return false;
    });
	
	// Experience Add More
	
    $(".experience-info").on('click','.trash', function () {
		$(this).closest('.experience-cont').remove();
		return false;
    });

    $(".add-experience").on('click', function () {
		
		var experiencecontent = '<div class="row form-row experience-cont">' +
			'<div class="col-12 col-md-10 col-lg-11">' +
				'<div class="row form-row">' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>Hospital Name</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>From</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>To</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label>Designation</label>' +
							'<input type="text" class="form-control">' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
		'</div>';
		
        $(".experience-info").append(experiencecontent);
        return false;
    });
	
	// Awards Add More
	
    $(".awards-info").on('click','.trash', function () {
		$(this).closest('.awards-cont').remove();
		return false;
    });

    $(".add-award").on('click', function () {

        var regcontent = '<div class="row form-row awards-cont" style="margin-top:35px;">' +
	
             '<div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Policy No</label>' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +
            '<div class="col-12 col-md-3">' +
				'<div class="form-group">' +
					'<label>Name</label>' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +
			'  <div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Relation</label>' +
					'<select class="form-control select">' +
                    	'<option>Select</option>' +
                    	'<option>Self</option>' +
                    	'<option>Father</option>' +
                    	'<option>Mother</option>' +
                    	'<option>Spouse</option>' +
                    	'<option>Child 1</option>' +
                    	'<option>Child 2</option>' +
                    	'</select>' +
                    
				'</div>' +
			'</div>' +
            '  <div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Age</label>' +
					'<select class="form-control select">' +
                    	'<option>Select</option>' +
                    	'<option>21</option>' +
                    	'<option>22</option>' +
                    	'<option>23</option>' +
                    	'<option>24</option>' +
                    	'<option> 25</option>' +
                    	'<option>26</option>' +
                    	'<option>27</option>' +
                    	'<option>28</option>' +
                    	'</select>' +
                    
				'</div>' +
			'</div>' +
            
            '  <div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Gender</label>' +
					'<select class="form-control select">' +
                    	'<option>Select</option>' +
                    	'<option>Male</option>' +
                    	'<option>Female</option>' +
                    	'</select>' +
                    
				'</div>' +
			'</div>' +
            
            	'<div class="col-12 col-md-3">' +
				'<div class="form-group mb-0">' +
					'<label>Aadhar Card</label>' +
					'<input type="file" class="form-control">' +
					'<small class="text-secondary">Size: <b> 30Kb </b></small><br>' +
					'<small class="text-secondary">Accepted formats : only png and Pdf</small>' +
				'</div>' +
			'</div>' +	
            '<div class="col-12 col-md-3">' +
				'<div class="form-group mb-0">' +
					'<label>Insurance Card</label>' +
					'<input type="file" class="form-control">' +
					'<small class="text-secondary">Size: <b> 30Kb </b></small><br>' +
					'<small class="text-secondary">Accepted formats : only png and Pdf</small>' +
				'</div>' +
			'</div>' +	
            '<div class="col-12 col-md-3">' +
				'<div class="form-group mb-0">' +
					'<label>Medical History</label>' +
					'<input type="file" class="form-control">' +
					'<small class="text-secondary">Size: <b> 30Kb </b></small><br>' +
					'<small class="text-secondary">Accepted formats : only png and Pdf</small>' +
				'</div>' +
			'</div>' +	
            
			'<div class="col-12 col-md-2">' +
				'<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';
		
        $(".awards-info").append(regcontent);
        return false;
    });
	
	// Membership Add More
	
    $(".membership-info").on('click','.trash', function () {
		$(this).closest('.membership-cont').remove();
		return false;
    });

    $(".add-membership").on('click', function () {

        var membershipcontent = '<div class="row form-row membership-cont">' +
			'<div class="col-12 col-md-10 col-lg-10">' +
				'<div class="custom-file">' +
					'<label class="custom-file-label" for="customFile"  style="margin-top: 25px;">ID Card</label>' +
					'<input type="file" class="custom-file-input" id="customFile">' +
				'</div>' +
			'</div>' +
           
                     
			'<div class="col-12 col-md-2 col-lg-2">' +
				'<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" class="btn btn-danger trash" style="height: 35px;"><i class="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';
		
        $(".membership-info").append(membershipcontent);
        return false;
    });
	
	// Registration Add More
	
    $(".registrations-info").on('click','.trash', function () {
		$(this).closest('.reg-cont').remove();
		return false;
    });

    $(".add-reg").on('click', function () {

        var regcontent = '<div class="row form-row reg-cont" style="margin-top: 25px;">' +
             '<div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Policy No</label>' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +
			'<div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Name</label>' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +
			'  <div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Relation</label>' +
					'<select class="form-control select">' +
                    	'<option>Select</option>' +
                    	'<option>Self</option>' +
                    	'<option>Father</option>' +
                    	'<option>Mother</option>' +
                    	'<option>Spouse</option>' +
                    	'<option>Child 1</option>' +
                    	'<option>Child 2</option>' +
                    	'</select>' +
                    
				'</div>' +
			'</div>' +
            '  <div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Age</label>' +
					'<select class="form-control select">' +
                    	'<option>Select</option>' +
                    	'<option>21</option>' +
                    	'<option>22</option>' +
                    	'<option>23</option>' +
                    	'<option>24</option>' +
                    	'<option> 25</option>' +
                    	'<option>26</option>' +
                    	'<option>27</option>' +
                    	'<option>28</option>' +
                    	'</select>' +
                    
				'</div>' +
			'</div>' +
            
            '  <div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Gender</label>' +
					'<select class="form-control select">' +
                    	'<option>Select</option>' +
                    	'<option>Male</option>' +
                    	'<option>Female</option>' +
                    	'</select>' +
                    
				'</div>' +
			'</div>' +
//            '<div class="col-12 col-md-2">' +
//				'<div class="form-group">' +
//					'<label>Employee Id</label>' +
//					'<input type="text" class="form-control">' +
//				'</div>' +
//			'</div>' +
				'<div class="col-12 col-md-2">' +
				'<div class="form-group">' +
					'<label>Company Name</label>' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +	
            
            	'<div class="col-12 col-md-3">' +
				'<div class="form-group mb-0">' +
					'<label>Aadhar Card</label>' +
					'<input type="file" class="form-control">' +
					'<small class="text-secondary">Size : <b> 30Kb </b></small><br>' +
					'<small class="text-secondary">Accepted formats : only png and Pdf</small>' +
				'</div>' +
			'</div>' +	
            '<div class="col-12 col-md-3">' +
				'<div class="form-group mb-0">' +
					'<label>Medical History</label>' +
					'<input type="file" class="form-control">' +
					'<small class="text-secondary">Size : <b> 30Kb </b></small><br>' +
					'<small class="text-secondary">Accepted formats : only png and Pdf</small>' +
				'</div>' +
			'</div>' +	
            '<div class="col-12 col-md-3">' +
				'<div class="form-group mb-0">' +
					'<label>Insurance Card</label>' +
					'<input type="file" class="form-control">' +
					'<small class="text-secondary">Size : <b> 30Kb </b></small><br>' +
					'<small class="text-secondary">Accepted formats : only png and Pdf</small>' +
				'</div>' +
			'</div>' +	
            
			'<div class="col-12 col-md-2">' +
				'<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';
        
		
				
												
												 						
        $(".registrations-info").append(regcontent);
        return false;
    });
	
})(jQuery);