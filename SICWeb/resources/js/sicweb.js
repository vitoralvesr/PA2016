(function () {
	var dtpickerOpt = {
		format: "dd/mm/yyyy",
        language: "pt-BR",
	    clearBtn: true,
	    orientation: "bottom auto",
	    multidate: false,
	    daysOfWeekDisabled: "0,6",
	    autoclose: true,
	    todayHighlight: true
	};

	$('#inicio').datepicker(dtpickerOpt);
	$('#fim').datepicker(dtpickerOpt);
})();