// form validation
function validate( $this ) {
	var $error = $this.next('.js-error')
	var pattern = $this.attr('pattern');
	var type = $this.attr('type');
	var error = $this.attr('data-error');
	var value = $this.val();
	var _hasError = false;

	$error.remove();

	if( value === '' ) {
		_hasError = true;
	}

	if( pattern === undefined && type === 'email' && value.indexOf("@") === -1 ) {
		_hasError = true;
	}

	if( pattern !== undefined && !new RegExp(pattern).test( value ) ) {
		_hasError = true;
	}

	if( _hasError ) {
		$this
			.addClass('has-error')
			.after('<span class="error js-error" role="alert">' + error + '</span>')

		return {
			element: $this,
			error: error,
		}
	}
	else {
		return {};
	}
}


$('input[required]').each(function() {

	$(this).on('blur', function() {

		validate( $(this) ); //validate all input fields after blur

	});
});


$('.js-form')
	.attr('novalidate', true) //html5 fallback without js
	.on('submit', function(e) {
		e.preventDefault();
		var allErrors = [];
		var form = this;

		$('.js-errors').remove();

		//check all elements
		$('input[required]').each(function() {
			var error = validate( $(this) );

			if( error.error !== undefined ) {
				allErrors.push( error );
			}
		});

		//if we get errors back
		if( allErrors.length > 0 ) {
			var error = '';

			$.each(allErrors, function( index, value ) {
				error += '<li>' + allErrors[ index ].error + '</li>'; //build error list
			});

			$('.js-form').prepend('<div class="alert alert-warning js-errors" role="alert" tabindex="0">' +
				'<ul>' + error + '</ul>' +
			'</div>');

			$('.js-errors').focus();
		}
		//no errors
		else {
			form.submit();
		}
});