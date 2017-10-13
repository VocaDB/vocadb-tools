namespace mapper {

	export class ViewModel {

		public clicked = ko.observable(false);

		public showRandom = () => {

			var entryTypes = [
				{ api: 'artists', url: 'Ar' },
				{ api: 'albums', url: 'Al' },
				{ api: 'songs', url: 'S' }
			];

			var entryType = entryTypes[this.random(entryTypes.length)];
			this.goToEntry(entryType.api, entryType.url);

		}

		public showArtist = () => this.goToEntry('artists', 'Ar');
		public showAlbum = () => this.goToEntry('albums', 'Al');
		public showSong = () => this.goToEntry('songs', 'S');
		public showVocaloid = () => this.goToEntry('artists', 'Ar', "&artistTypes=Vocaloid&advancedFilters%5B0%5D%5BfilterType%5D=RootVoicebank&advancedFilters%5B0%5D%5Bparam%5D=&advancedFilters%5B0%5D%5Bdescription%5D=Root+voicebank+(no+base)&advancedFilters%5B0%5D%5Bnegate%5D=false");

		private random = (max: number) => {
			return Math.floor(Math.random() * max);
		}

		private goToEntry = (api: string, urlPrefix: string, extra?: string) => {

			this.clicked(true);

			$.getJSON("https://vocadb.net/api/" + api + "?maxResults=1&getTotalCount=true" + (extra || ""), result => {
				const index = this.random(result.totalCount);
				$.getJSON("https://vocadb.net/api/" + api + "?maxResults=1&start=" + index + (extra || ""), result => {
					window.location.href = "http://vocadb.net/" + urlPrefix + "/" + result.items[0].id;
				});
			});

		}

	}

}
