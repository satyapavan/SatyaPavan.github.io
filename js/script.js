	(function(){
		console.log("Testing...");

	    repos = [];

	function fetchRepos() {
		console.log("fetchRepos");
			var uri = "https://api.github.com/users/satyapavan/repos?callback=?"
	                + "&per_page=100";


	    $.getJSON(uri, function (result) {
	          if (result.data && result.data.length > 0) {
	            repos = repos.concat(result.data);
	            console.log(repos);

	              $.each(repos, function (i, repo) {
	                repo.pushed_at = new Date(repo.pushed_at);
	                var weekHalfLife  = 1.146 * Math.pow(10, -9);
	                var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
	                var createdDelta = (new Date) - Date.parse(repo.created_at);
	                var weightForPush = 1;
	                var weightForWatchers = 1.314 * Math.pow(10, 7);
	                repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
	                repo.hotness += weightForWatchers * repo.watchers / createdDelta;
	              });
	              
	              // Sort by highest # of watchers.
	              repos.sort(function (a, b) {
	                if (a.hotness < b.hotness) return 1;
	                if (b.hotness < a.hotness) return -1;
	                return 0;
	              });

// <h5 class="card-title">__CARD__HEADER__</h5>\
					var objDiv = '\
						<div class="card border-secondary  bg-light mb-4" style="max-width: 15rem;">\
								<h5 class="card-header text-white bg-success">__CARD__HEADER__</h5>\
							    <div class="card-body">\
							      	<p class="card-text">__CARD__TEXT__</p>\
							    </div>\
							    <div class="card-footer">\
							      <small class="text-muted">__CARD__FOOTER__</small>\
							    </div>\
						    </div>';

					var objInnerContent = "";
					var counter = 0;

	              $.each(repos, function (i, repo) {
	                console.log(repo);
	                counter++;

	                objInnerContent = objInnerContent + (((objDiv.replace(/__CARD__HEADER__/g, repo.name))
	                	.replace(/__CARD__TEXT__/g, repo.description))
	                	.replace(/__CARD__FOOTER__/g, repo.updated_at));
	            
	            	// $("#main-content").append(objInnerContent);
	            	if( counter%3 === 0) {
	            		objInnerContent = objInnerContent + '<div class="w-100 .d-none .d-sm-block .d-md-none"></div>';
	            	}

	            	if( counter%4 === 0) {
	            		objInnerContent = objInnerContent + '<div class="w-100 .d-none .d-md-block .d-lg-none"></div>';
	            	}
	              });

	             objInnerContent = '<div id="main-content" class="card-deck">' + objInnerContent + '</div>';

	             $("#repo-content").prepend(objInnerContent);


	          }
	      });
	}

	function addRepos() {

		console.log("haha" + repos);
	              // Convert pushed_at to Date.
	            
	}

	fetchRepos();
	addRepos();

	})(jQuery);