var NavView = Backbone.View.extend(
{
	initialize: function()
	{
		this.setElement($("nav"));

		this.model.on("change:currentState", this.handleCurrentStateChange, this);

		var self = this;
		$(this.el).find("a").click(function(event)
		{
			self.handleNavClick(event);
		})
	},


	//------------------------------------------------
	// Handlers
	//------------------------------------------------
	handleCurrentStateChange: function()
	{
		$(this.el).find("a").each(function()
		{
			$(this).removeClass("selected");
		})

		var activeNav;
		switch(this.model.get("currentState"))
		{
			case AppState.PLAY:
				activeNav = $("#navPlay");
				break;
			case AppState.WORK:
				activeNav = $("#navWork");
				break;				
			case AppState.ME:
				activeNav = $("#navMe");
				break;
		}
		activeNav.addClass("selected");
	},

	handleNavClick: function(event)
	{
		var newState = AppState.NONE;
		if(event.target == $("#navPlay")[0])
		{
			newState = AppState.PLAY;
		}
		else if(event.target == $("#navWork")[0])
		{
			newState = AppState.WORK;
		}
		else if(event.target == $("#navMe")[0])
		{
			newState = AppState.ME;
		}

		this.model.setCurrentState(newState);
	}

})