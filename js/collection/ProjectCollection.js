var ProjectCollection = Backbone.Collection.extend(
{
	model: Project,

	parse: function(response)
	{
		return response.projects;
	}
})