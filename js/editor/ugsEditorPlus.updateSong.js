/**
 * Updates an exising song via AJAX.
 * Dependencies: jQuery
 * @class updateSong
 * @namespace ugsEditorPlus
 */
ugsEditorPlus.updateSong = (function() {
	/**
	 * attach public members to this object
	 * @type {Object}
	 */
	var _public = {};

	var _ajaxUri = '';
	var _filename = '';

	/**
	 * Name / Value pairs for jQuery selectors of HTML elements to be manipulated
	 * @type {JSON}
	 */
	var _selectors = {
		messageBox : '#messageBox',
		message : '#sourceFeedback',
		button : '#saveBtn',
		spinner : '#loadingSpinner',
		song : '#chordProSource'
	};

	/**
	 * lock-down the Submit (Update) button to avoid double posts;
	 * @type {Boolean}
	 */
	var _isUpdating = false;

	_public.init = function(ajaxUri, filename) {
		_ajaxUri = ajaxUri;
		_filename = filename;

		$(_selectors.button).click(function(event) {
			doUpdate();
			return false;
		});

		$(_selectors.messageBox).hide();
		$(document)
			.ajaxStart(function() {
				showBusy();
				_isUpdating = true;
			})
			.ajaxStop(function() {
				hideMessage();
				_isUpdating = false;
			});
	};

	var showBusy = function(){
		$(_selectors.message).hide().html();
		$(_selectors.messageBox).slideDown('fast');
		$(_selectors.spinner).show();
	};

	var showMessage = function(message){
		$(_selectors.spinner).hide();
		$(_selectors.message).show().html(message);
	};

	var hideMessage = function(){
		$(_selectors.messageBox).delay(3000).fadeOut('slow');
	};

	var doUpdate = function() {
		if (_isUpdating){
			return;
		}

		$(_selectors.message).show();

		var data = {
			'handler': 'ugs_update_81jr',
			'filename': _filename,
			'song': $(_selectors.song).val()
		};

		$.ajax({
			url: _ajaxUri,
			type: 'POST',
			dataType: 'json',
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify(data),
			success: function(data) {
				doAjaxOk(data);
			}
		});
	};

	var doAjaxOk = function(data) {
		//if (data.HasErrors)
		showMessage(data.Message);
	};

	// ---------------------------------------
	// return public interface "JSON handle"
	// ---------------------------------------
	return _public;
})();