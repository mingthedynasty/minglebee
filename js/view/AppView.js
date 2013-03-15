var AppView = Backbone.View.extend(
{

	initialize: function()
	{
		this.model.on("change:currentState", this.handleCurrentStateChange, this);
	
		var navView = new NavView({model: this.model});
		this.handleCurrentStateChange();
	},

	//------------------------------------------------
	// Handlers
	//------------------------------------------------
	handleCurrentStateChange: function()
	{
		switch(this.model.get("currentState"))
		{
			case AppState.ME:
				$("#project").hide();
				$("#me").show();
				break;
			case AppState.PLAY:
			case AppState.WORK:
				$("#project").show();
				$("#me").hide();
				break;							
		}
	}
})