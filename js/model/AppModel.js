var AppModel = Backbone.Model.extend(
{	
	defaults:
	{
		router: null,
		currentState: AppState.NONE,
		projects: null,
		activeProject: null
	},

	initialize: function()
	{
		var self = this;

		// Fetch data
		var projectsColl = new ProjectCollection();
		projectsColl.fetch(
			{url: "data/projects.json",
			 success: function()
			 {
				self.handleProjectsLoad();
			 }}
		);
		this.set("projects", projectsColl);

		// Set up handlers
		this.get("router").on("route:defaultRoute", 
			this.handleDefaultRoute, this);
		this.get("router").on("route:showPlayProject", 
			this.handleShowPlayProject, this);
		this.get("router").on("route:showWorkProject", 
			this.handleShowWorkProject, this);
	},

	//------------------------------------------------
	// Handler
	//------------------------------------------------
	handleProjectsLoad: function()
	{
		console.log("loaded!!!", this.get("projects"));
	},


	handleDefaultRoute: function()
	{
		this.set("currentState", AppState.ME);
		this.set("activeProject", null);
	},

	handleShowPlayProject: function()
	{
		this.set("currentState", AppState.PLAY);
		// this.set("activeProject", null);
	},

	handleShowWorkProject: function()
	{
		this.set("currentState", AppState.WORK);
		// this.set("activeProject", null);		
	},

	//------------------------------------------------
	// Controller like functions
	//------------------------------------------------
	setCurrentState: function(newState)
	{
		switch(newState)
		{
			case AppState.PLAY:
				Backbone.history.navigate("play", true);
				break;
			case AppState.WORK:
				Backbone.history.navigate("work", true);
				break;
			case AppState.ME:
				Backbone.history.navigate("", true);
				break;
		}
		
	}
})