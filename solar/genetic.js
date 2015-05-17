(function(that) {

	String.prototype.replaceAt=function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}
	
	function toBinary(dec){
		return ('000000000000000000000000000000000000000' + (dec >>> 0).toString(2)).slice(-32);
	}
	
	function toInt(binary) {
		return parseInt(binary, 2) >> 0;
	}

	var Genetic = function() {
		
	};
	
	Genetic.prototype.train = function (Trainable, population, epochs, fitness) {
		
		var Chromosome = function (data) {
			this.data = data;
			
			this.asString = function () {
				var s = "";
				for (var i = 0; i < data.length; i++) {
					s += toBinary(this.data[i]);
				};
				return s;
			};
			
			this.fromString = function (string) {
				for (var i = 0; i < string.length / 32; i++){
					var front = string.substring(0, 32);
					string = string.substring(32);
					this.data[i] = toInt(front);
				}
			};
			
			this.crossWith = function (chromosome) {
				var chromeAString = this.asString();
				var chromeBString = chromosome.asString();
				var ri = parseInt(Math.random() * chromeAString.length);
				
				var front = chromeAString.substring(0, ri);
				var end = chromeBString.substring(ri);
				
				var baby = new Array(chromosome.data.length);
				var c = new Chromosome(baby);
				c.fromString(front + end);
				return c;
			};
			
			this.mutate = function () {
				/*
				var string = this.asString();
				var ri = parseInt(Math.random() * string.length);
				var ch = string.charAt(ri);
				if (ch === '0') {
					string = string.replaceAt(ri, '1');
				} else {
					string = string.replaceAt(ri, '0');
				}
				this.fromString(string);	
				*/
				var ri = parseInt(Math.random() * this.data.length);				
				this.data[ri] += parseInt(Math.random() * 10) - 5;
			};
		};
				
		var panels = [];
		for (var i = 0; i < population; i += 1) {
			panels.push(new Trainable());
		}
		
		var calcScores = function () {
			scores = [];
			for (var i = 0; i < panels.length; i++){
				var score = fitness(panels[i]);
				scores.push({
					i: i,
					score: score
				});
			}
			
			scores.sort(function(a, b){
				return a.score - b.score;
			});
			
			return scores;
		}
				
		for (var epoch = 0; epoch < epochs; epoch++) {
			
			var scores = calcScores();
			
			var back = panels.length - 1;
			
			for (var i = 0; i < scores.length / 2; i += 2){
				var panelA = panels[scores[i].i];
				var panelB = panels[scores[i+1].i];
				var chromeA = new Chromosome(panelA.encode());
				var chromeB = new Chromosome(panelB.encode());
				var babyChrome = chromeA.crossWith(chromeB);
				panels[scores[back--].i].decode(babyChrome);
			}
			
			for (var i = 0; i < panels.length; i++){
				if (Math.random() > 0.9) {
					var chrome = new Chromosome(panels[i].encode());
					chrome.mutate();
					var panel = new Trainable();
					panel.decode(chrome);
					panels[i] = panel;
				}
			}
		}		
		
		return panels[calcScores()[0].i];
	};
		
	that.Genetic = new Genetic();
})(this);