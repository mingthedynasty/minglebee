var AppModel = Backbone.Model.extend(
{	
	defaults:
	{
		router: null,
		currentState: AppState.NONE,
		projects: null,
		playProjects: null,
		workProjects: null,
		activeProjects: null,
		activeIndex: 0,
		activeProject: null
	},

	initialize: function()
	{
		var self = this;

		this.set("playProjects", []);
		this.set("workProjects", []);

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
		var self = this;
		var allProjects = this.get("projects");
		var project, type;
		$.each(allProjects, function(index)
		{
			project = allProjects.at(index);
			type = project.get("type");
			if(type == ProjectType.PERSONAL)
			{
				self.get("playProjects").push(project);
			}
			else
			{
				self.get("workProjects").push(project);
			}
		})

		Backbone.history.navigate("play/0", true);
		//this.set("activeProject", this.get("projects").at(0));
	},


	handleDefaultRoute: function()
	{
		this.set("currentState", AppState.ME);
		this.set("activeProject", null);
	},

	handleShowPlayProject: function(index)
	{
		this.set("currentState", AppState.PLAY);
		this.set("activeProjects", this.get("playProjects"));
		this.updateActiveProject(index);
	},

	handleShowWorkProject: function(index)
	{
		this.set("currentState", AppState.WORK);
		this.set("activeProjects", this.get("workProjects"));
		this.updateActiveProject(index);
	},


	//------------------------------------------------
	// Helpers
	//------------------------------------------------
	updateActiveProject: function(index)
	{
		this.set("activeProject", this.get("activeProjects")[index]);
		this.set("activeIndex", Number(index));	
	},


	//------------------------------------------------
	// Controller like functions
	//------------------------------------------------
	setCurrentState: function(newState)
	{
		this.set("currentState", newState);
		switch(newState)
		{
			case AppState.PLAY:
				Backbone.history.navigate("play/0", true);
				break;
			case AppState.WORK:
				Backbone.history.navigate("work/0", true);
				break;
			case AppState.ME:
				Backbone.history.navigate("", true);
				break;
		}	
	},


	showNextProject: function()
	{
		var state = this.get("currentState");
		if(state != AppState.ME)
		{
			var index = this.get("activeIndex") + 1;
			if(index < this.get("activeProjects").length)
			{
				Backbone.history.navigate(state + "/" + index, true);
			}
		}
	},


	hasNextProject: function()
	{
		var index = this.get("activeIndex");
		return index + 1 < this.get("activeProjects").length;
	}

})