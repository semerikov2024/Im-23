let markerVisible = { A: false, B: false, C: false, D: false, F: false, G: false };


AFRAME.registerComponent('registerevents', 
	{
		init: function () {
			var marker = this.el;
			marker.addEventListener('markerFound', function() {
				console.log('markerFound', marker.id); 
				markerVisible[marker.id] = true;
			});
			marker.addEventListener('markerLost', function() {
				console.log('markerLost', marker.id); 
				markerVisible[marker.id] = false;
			});
		}
	}
);


AFRAME.registerComponent('run', 
	{
		init: function () {
			this.plane = document.getElementById("Caravaggio").object3D;
			console.log(this.plane);
			//...
		},
		
		tick: function () {
			if(markerVisible['A']&&markerVisible['B'])
			{
				console.log("A and B"); 
				this.plane.visible = true;
			}
			if(!markerVisible['A'] || !markerVisible['B'])
				this.plane.visible = false;


		},
	}
);



