(function () {
	var dtpickerOpt = {
		format: "dd/mm/yyyy",
        language: "pt-BR",
	    clearBtn: true,
	    orientation: "bottom auto",
	    multidate: false,
	    autoclose: true,
	    todayHighlight: true
	};

	$('#inicio').datepicker(dtpickerOpt);
	$('#fim').datepicker(dtpickerOpt);
})();