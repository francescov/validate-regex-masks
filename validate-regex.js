// This form uses jQuery Validate. To set a field required, simply add a class "required" to the ELEMENT

	$(document).ready(function(){
				
		//Prep the "Fake" and "True" Submit Buttons
		$('#trueSubmit').hide();
		$('#validate_nov').show();
		
		//When user modifies any summons, hide the true submit, reveal fake submit to repeat NOV validation process.
		$('#novNumber').change(function() {
			$('#trueSubmit').hide(); //Hide the true submit right now
			$('#validate_nov').show();  //Show a "fake" submit button	
		});
		
		//Also don't forget to reset the fake and true when the reset button is clicked
		$('#resetbutton').on('click',function(){
			$('#trueSubmit').hide();
			$('#validate_nov').show();	
		});
		
		// Provide a "fake" click button that validates the NOV numbers correctly
		$('#validate_nov').on('click', function() {
			// Once jQuery validate handles the form, we need to validate the summonses
			// validate the summonses with our custom functionality.
		
			// Grab the values of the summonses text fields
			var summons = new Array();
			summons[0] = $.trim($('#novNumber').val());		
				
			// Validation Masks - Simply append a new mask to this array

			var valList = new Array();
			/* Valid List Wildcards Set */

			/* These number filters allow other number series with alpha (disallowing 1,2,7 series with alpha) */
			valList[0] = "E0[0|3-6|8-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z]";	//Disallows All E01, E02, E07 with Alphas
			valList[1] = "0[0|3-6|8-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z]";	//Disallows All 01, 02, 07 with Alphas
			valList[2] = "[0|3-6|8-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z]";		//Disallows All 1, 2, 7 with Alphas
			
			/* These number filters will allow the 1,2,7 series without an alpha, example below */
			valList[3] = "E0[1|2|7][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";	//E011234567,E021234567,E071234567
			valList[4] = "0[1|2|7][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";		//011234567,021234567,071234567
			valList[5] = "[1|2|7][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";		//11234567,21234567,71234567
			
			/* Allows All Other Series No Alpha - allowing additional wildcarded number */
			valList[6] = "E0[0|3-6|8-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";		//Allows All Other "E0" series no alphas
			valList[7] = "0[0|3-6|8-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";	//Allows All Other "0" series no alphas
			valList[8] = "[0|3-6|8-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";	//Allows All Other "#" series no alphas
			
			// Pass the current element value and compare with the RegEx values
			var testValidate;
			var allValidate;
			$('.nov_errors').hide(); //reset errors to hide all
				
			// Loop Through All Summons Text Boxes
			for (y=0; y<summons.length; y++){
				allValidate = false;
				testValidate = "";
				if (summons[y].length != 0) {
					for (x=0; x<valList.length; x++) {
						testValidate = summons[y].match(RegExp(valList[x],"i"));
						if (testValidate != null) {
							if (testValidate[0].toUpperCase() == summons[y].toUpperCase()) {
								allValidate = true;
								$('.nov_errors').hide(); //reset errors to hide all
							}
						}
					}
					if (!allValidate) {
						$('.nov_errors').show();
						$('#validate_nov').show();
						$('#trueSubmit').hide();
						$('#novNumber').focus();
						return false;
					} else {
						$('.nov_errors').hide();
						//Hide the NOV validate button, and show the Real Submit Button
						$('#validate_nov').hide(); //this button
						$('#trueSubmit').show().click(); //Show and programmatically click to submit
						//jquery validate will then submit only when fields are valid.	
					}
					
				} else {
					// Since our first summons textbox is required, lets return an error message and shift focus to textbox if empty as well.
					if (summons[0].length == 0) {
						$('.nov_errors').show();
						$('#novNumber').focus();
					} else {
						// Otherwise we just keep the error message hidden
						$('.nov_errors').hide();	
					}
				}
			}		
		});//end onclick
		
		
		// This will add an input mask on our phone number field - courtesy of the jQuery MaskedInput plugin
		// Documentation is here: http://digitalbush.com/projects/masked-input-plugin/
		$('#mailingphone').mask('(999) 999-9999'); 	//Format our Phone Number Field
		$('#mailingzip').mask('99999');			//Format our Zip Code Field
		
		// Once the NOV numbers are validated, proceed with the jQuery Validate function
		$('#ecb-one-click-form').validate({
			//submitHandler: function() {
			//	$('#one-click-form').submit(); //Required by plugin
			//		return true;
			//	}
		});	 //Attach jQuery Validate to our Form
	});