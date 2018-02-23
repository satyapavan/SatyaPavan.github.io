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

              $.each(repos, function (i, repo) {
                console.log(repo);
              });
              
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