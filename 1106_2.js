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


const makeLine = () => {
	let geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 12);
	let material = new THREE.MeshLambertMaterial({color:0xFF0000});
	geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));
	return new THREE.Mesh(geometry, material);
}


AFRAME.registerComponent('run', 
	{
		init: function () {
			this.A = document.getElementById("A").object3D; //a-marker
			this.B = document.getElementById("B").object3D;
			this.C = document.getElementById("C").object3D;
			this.D = document.getElementById("D").object3D;
			this.F = document.getElementById("F").object3D;
			this.AB = document.getElementById("AB").object3D; //a-entity
			this.AC = document.getElementById("AC").object3D;
			this.AD = document.getElementById("AD").object3D;
			this.AF = document.getElementById("AF").object3D;
			this.BC = document.getElementById("BC").object3D;
			this.BD = document.getElementById("BD").object3D;
			this.BF = document.getElementById("BF").object3D;
			this.CD = document.getElementById("CD").object3D;
			this.CF = document.getElementById("CF").object3D;
			this.DF = document.getElementById("DF").object3D;

			this.AB.add(makeLine()); this.AB.visible = false;
			this.AC.add(makeLine()); this.AC.visible = false;
			this.AD.add(makeLine()); this.AD.visible = false;
			this.AF.add(makeLine()); this.AF.visible = false;
			this.BC.add(makeLine()); this.BC.visible = false;
			this.BD.add(makeLine()); this.BD.visible = false;
			this.BF.add(makeLine()); this.BF.visible = false;
			this.CD.add(makeLine()); this.CD.visible = false;
			this.CF.add(makeLine()); this.CF.visible = false;
			this.DF.add(makeLine()); this.DF.visible = false;
		},
		
		tick: function () {
			var posA = new THREE.Vector3();
			var posB = new THREE.Vector3();
			var posC = new THREE.Vector3();
			var posD = new THREE.Vector3();
			var posF = new THREE.Vector3();

			this.A.getWorldPosition(posA);
			this.B.getWorldPosition(posB);
			this.C.getWorldPosition(posC);
			this.D.getWorldPosition(posD);
			this.F.getWorldPosition(posF);

			let checks = [
				["A", "B", posA, posB, this.AB],				
				["A", "C", posA, posC, this.AC],				
				["A", "D", posA, posD, this.AD],				
				["A", "F", posA, posF, this.AF],				
				["B", "C", posB, posC, this.BC],				
				["B", "D", posB, posD, this.BD],				
				["B", "F", posB, posF, this.BF],				
				["C", "D", posC, posD, this.CD],				
				["C", "F", posC, posF, this.CF],				
				["D", "F", posD, posF, this.DF],				
			];
			
			for(let i=0; i<checks.length; i++)
			{
				if ( markerVisible[checks[i][0]] && markerVisible[checks[i][1]] ) {
					let distance = checks[i][2].distanceTo(checks[i][3]);
					checks[i][4].lookAt(checks[i][3]);
					checks[i][4].scale.set(1,1,distance);
					checks[i][4].visible = true;
				}
			}

			if(! markerVisible["A"])
				this.AB.visible = this.AC.visible = this.AD.visible = this.AF.visible = false;

			if(! markerVisible["B"])
				this.AB.visible = this.BC.visible = this.BD.visible = this.BF.visible = false;

			if(! markerVisible["C"])
				this.AC.visible = this.BC.visible = this.CD.visible = this.CF.visible = false;

			if(! markerVisible["D"])
				this.AD.visible = this.BD.visible = this.CD.visible = this.DF.visible = false;

			if(! markerVisible["F"])
				this.AF.visible = this.BF.visible = this.CF.visible = this.DF.visible = false;

		},
	}
);



