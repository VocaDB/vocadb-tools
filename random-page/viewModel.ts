namespace mapper {

	export class ViewModel {

		public clicked = ko.observable(false);

		public showRandom = () => {

			this.clicked(true);

			var entryTypes = [
				{ api: 'artists', url: 'Ar' },
				{ api: 'albums', url: 'Al' },
				{ api: 'songs', url: 'S' }
			];

			var entryType = entryTypes[this.random(entryTypes.length)];
			this.goToEntry(entryType.api, entryType.url);

		}

		private random = (max: number) => {
			return Math.floor(Math.random() * max);
		}

		private goToEntry = (api: string, urlPrefix: string) => {

			$.getJSON("https://vocadb.net/api/" + api + "?maxResults=1&getTotalCount=true", result => {
				const index = this.random(result.totalCount);
				$.getJSON("https://vocadb.net/api/" + api + "?maxResults=1&start=" + index, result => {
					window.location.href = "http://vocadb.net/" + urlPrefix + "/" + result.items[0].id;
				});
			});

		}

	}

}
