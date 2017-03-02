frappe.ready(function() {
	$(".btn-iot-add-user").click(function() {
		var args = {
			enable: $("#enable").val(),
			enterprise: $("#enterprise").val(),
			user: $("#user").val(),
		};

		if(!args.user) {
			frappe.msgprint("User Email Required.");
			return false;
		}

		frappe.call({
			type: "POST",
			method: "iot.iot.doctype.iot_user.iot_user.add_user",
			btn: $(".btn-iot-add-user"),
			args: args,
			statusCode: {
				401: function() {
					$('.page-card-head .indicator').removeClass().addClass('indicator red')
						.text(__('Invalid User Email'));
				},
				200: function(r) {
					$("input").val("");
					strength_indicator.addClass('hidden');
					strength_message.addClass('hidden');
					$('.page-card-head .indicator')
						.removeClass().addClass('indicator green')
						.html(__('User has been added'));
					if(r.message) {
						frappe.msgprint(r.message);
	                    setTimeout(function() {
							window.location.href = "/iot_users/"+args.user;
	                    }, 2000);
					}
				}
			}
		});

        return false;
	});

	window.strength_indicator = $('.bunch-code-strength-indicator');
	window.strength_message = $('.bunch-code-strength-message');
});