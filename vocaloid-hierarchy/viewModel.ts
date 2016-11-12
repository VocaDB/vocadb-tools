namespace mapper {

	type ArtistMap = { [id: number]: ArtistWithChildren; };

	export class ViewModel {

		constructor() {

			this.loadArtists(0);

		}

		public artists: ArtistWithChildren[] = [];

		public artistsWithChildren: KnockoutObservableArray<ArtistWithChildren> = ko.observableArray([]);

		private loadArtists = (start: number) => {

			$.getJSON("https://vocadb.net/api/artists?artistTypes=Vocaloid&maxresults=50&lang=English&fields=BaseVoicebank&start=" + start, result => {
				var items = result.items as vdb.Artist[];
				if (items.length === 0)
					this.done();
				else {
					this.artists = this.artists.concat(items);
					this.loadArtists(start + 50);	
				}
			});

		}

		private done = () => {

			var dict = _.keyBy(this.artists, i => i.id);

			_.forEach(this.artists, a => {

				if (a.baseVoicebank) {
					var base = dict[a.baseVoicebank.id];
					if (!base) {
						this.artists.push(a.baseVoicebank);
						base = a.baseVoicebank;
						dict[base.id] = base;
					}

					if (!base.children)
						base.children = [a];
					else
						base.children.push(a);	
										
				}

			});

			this.artistsWithChildren(_.filter(this.artists, a => a.baseVoicebank == null));

		}

	}

	interface ArtistWithChildren extends vdb.Artist {
		children?: ArtistWithChildren[];
	}

}
