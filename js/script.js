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
							<div class="card border-secondary bg-light mb-4" style="max-width: 14rem; min-width: 10rem;">\
									<div class="card-header text-white __LANG__COLOR__">\
										<h6>__CARD__HEADER__</h6>\
									</div>\
								    <div class="card-body">\
								      	<p class="card-text">__CARD__TEXT__</p>\
								      	<div class="text-right">\
								      	<small class="text-muted ">__LAST__COMMIT__</small>\
								      	</div>\
								    </div>\
								    <div class="card-footer d-flex justify-content-between">\
								      <small>\
								      	<svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>\
								      	__STAR__COUNT__\
								      </small>\
								      <small>\
								      	<svg aria-hidden="true" class="octicon octicon-repo-forked" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>\
										__FORK__COUNT__\
								      </small>\
								      <small class="text-muted">__LANG__NAME__</small>\
								    </div>\
							    </div>';

						var objInnerContent = "";
						var counter = 0;

		              $.each(repos, function (i, repo) {
		                console.log(repo);
		                counter++;

		                objInnerContent = objInnerContent + (((((((objDiv.replace(/__CARD__HEADER__/g, repo.name))
		                	.replace(/__CARD__TEXT__/g, repo.description))
		                	.replace(/__LAST__COMMIT__/g, repo.updated_at))
		                	.replace(/__LANG__NAME__/g, repo.language == null ? "" : repo.language))
		                	.replace(/__STAR__COUNT__/g, repo.stargazers_count))
		                	.replace(/__FORK__COUNT__/g, repo.forks_count))
		                	.replace(/__LANG__COLOR__/g, 
		                			(("lang-" + repo.language).toLowerCase()).replace(/ /g, "_")));
		            
		            	// // $("#main-content").append(objInnerContent);
		            	// if( counter%3 === 0) {
		            	// 	objInnerContent = objInnerContent + '<div class="w-100 .d-none .d-sm-block .d-md-none"></div>';
		            	// }

		            	// if( counter%4 === 0) {
		            	// 	objInnerContent = objInnerContent + '<div class="w-100 .d-none .d-md-block .d-lg-none"></div>';
		            	// }
		              });

		             objInnerContent = '<div id="main-content" class="card-columns">' + objInnerContent + '</div>';

		             $("#repo-content").prepend(objInnerContent);


		          }
		      });
		}

		fetchRepos();

		})(jQuery);