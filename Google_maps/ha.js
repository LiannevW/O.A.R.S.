
			function return_graph() {
				var result 	= [];
				var t_start = Math.round(Math.random() * 10 - 0.5);
				var len 	= Math.round(Math.random() * 150 + 150);
				var mean 	= Math.round(len / 2 + (10 - Math.random() * 10)) * 10;
				var amp  	= Math.round(Math.random() * 200 + 400);
				var spread  = Math.round(Math.random() * 20 + 50) * 10;
				for (var i = 0; i < len; i++) {
					var t = t_start + i * 10;
					result.push({
						time: t,
						val:  Math.round(normal_dist(t, amp * spread, mean, spread))
					});
				}
				return result;
			}
			function normal_dist(x, u, m, s) {
				return ((u / (s * Math.sqrt(2 * Math.PI))) * Math.exp((-1/2)*Math.pow(((x - m) / s),2)));
			}
			console.log(return_graph());
		
