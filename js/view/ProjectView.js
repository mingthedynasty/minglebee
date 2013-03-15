var ProjectView = Backbone.View.extend(
{
	listTemplate: null,

	initialize: function()
	{
		// Template
		this.listTemplate = Handlebars.compile($("#info-list-template").html());

		// Handlers
		this.model.on("change:activeProject", this.handleProjectChange, this);

		this.setElement($("#project"));
	},


	//------------------------------------------------
	// Handlers 
	//------------------------------------------------
	handleProjectChange: function()
	{
		var html;
		var project = this.model.get("activeProject");
		if(project)
		{
			// Title
			$("#title").text(project.get("name"));

			// Site
			if(project.get("site"))
			{
				$("#site").find("a").text(project.get("site"));
				$("#site").show();
			}
			else
			{
				$("#site").hide();
			}
		
			// Background
			$("#background").find("p").text(project.get("background"));
		
			// Features
			$("#features").find("p").text(project.get("features"));

			// Roles
			html = this.listTemplate({item: project.get("roles")});
			$("#roles").append(html);

			// techs
			html = this.listTemplate({item: project.get("technologies")});
			$("#techs").append(html);
		}
	}

})