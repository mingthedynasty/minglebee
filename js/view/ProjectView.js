var ProjectView = Backbone.View.extend(
{
	linkTemplate: null,
	listTemplate: null,
	linkListTemplate: null,
	imageTemplate: null,

	initialize: function()
	{
		// Template
		this.linkTemplate = Handlebars.compile($("#info-link-template").html());
		this.linkListTemplate = Handlebars.compile($("#info-link-list-template").html());
		this.listTemplate = Handlebars.compile($("#info-list-template").html());
		this.imageTemplate = Handlebars.compile($("#project-image-template").html());
		
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
				html = this.linkTemplate(project.get("site"));
				$("#site").find("p").remove();
				$("#site").append(html);
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
			$("#roles").find("ul").remove();
			$("#roles").append(html);

			// Techs
			html = this.listTemplate({item: project.get("technologies")});
			$("#techs").find("ul").remove();
			$("#techs").append(html);

			// Links
			if(project.get("links"))
			{
				html = this.linkListTemplate({item: project.get("links")});
				$("#links").find("ul").remove();
				$("#links").append(html);
				$("#links").show();
			}
			else
			{
				$("#links").hide();
			}

			// Images
			html = this.imageTemplate({image: project.get("images")});
			$("#projectImages").empty();
			$("#projectImages").append(html);
		}
	}

})