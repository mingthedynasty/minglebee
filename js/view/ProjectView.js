var ProjectView = Backbone.View.extend(
{
	linkTemplate: null,
	listTemplate: null,
	linkListTemplate: null,
	imageTemplate: null,
	subNavTemplate: null,

	initialize: function()
	{
		// Template
		this.linkTemplate = Handlebars.compile($("#info-link-template").html());
		this.linkListTemplate = Handlebars.compile($("#info-link-list-template").html());
		this.listTemplate = Handlebars.compile($("#info-list-template").html());
		this.imageTemplate = Handlebars.compile($("#project-image-template").html());
		this.subNavTemplate = Handlebars.compile($("#project-subnav-template").html());


		// Handlers
		this.model.on("change:activeProject", this.handleProjectChange, this);
		$("#nextButton").click($.proxy(this.handleNavClick, this));
		$("#prevButton").click($.proxy(this.handleNavClick, this));

		this.setElement($("#project"));
	},


	//------------------------------------------------
	// Handlers 
	//------------------------------------------------
	handleProjectChange: function()
	{
		var html, element;
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
			element = $(html);

			var image, w, h;
			element.find("div").each(function(index) 
			{
				image = project.get("images")[index];
  				if(image.width)
  				{
  					w = image.width + "px";
  					h = image.height + "px";
  				}
  				else
  				{
  					w = "560px";
  					h = "375px";
  				}

  				$(this).css({width: w, height: h});
				$(this).css("background-size", w + " " + h);
			});

			

			$("#projectImages").empty();
			$("#projectImages").append(element);
		}

		this.createSubNav();
		this.updateNavButtons();
	},


	handleNavClick: function(event)
	{
		if(event.target == $("#nextButton")[0])
		{
			this.model.showNextProject();
		}
		else if(event.target == $("#prevButton")[0])
		{
			this.model.showPrevProject();
		}
	},


	//------------------------------------------------
	// Helpers 
	//------------------------------------------------
	createSubNav: function()
	{
		if(this.model.get("currentState") != AppState.ME)
		{
			var html, project, element;
			var self = this;
			var projects = this.model.getCurrentProjects();

			function createHandler(project)
			{
				return function()
				{
					self.model.showProject(project);
				}
			}

			$("#otherProjects").empty();
			for(var i = 0; i < projects.length; i++)
			{
				project = projects[i];				
				html = this.subNavTemplate({title: project.get("name")});
				element = $(html);
				element.click(createHandler(project));

				$("#otherProjects").append(element);	
				
			}
		}
	},


	updateNavButtons: function()
	{
		if(this.model.hasNextProject())
		{
			$("#nextButton").show();
		}
		else
		{
			$("#nextButton").hide();
		}

		if(this.model.hasPrevProject())
		{
			$("#prevButton").show();
		}
		else
		{
			$("#prevButton").hide();
		}
	}

})