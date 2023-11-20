document.addEventListener("DOMContentLoaded", () => {

	async function init() {
		const model = await tmImage.load("assets/model_gsp/model.json", "assets/model_gsp/metadata.json");

        	const webcam = new tmImage.Webcam(window.innerHeight, window.innerHeight, true); // width, height, flip

		let text = document.getElementById("text");		

		await webcam.setup(); // request access to the webcam
		await webcam.play();

	        document.body.appendChild(webcam.canvas);

		let skip = 1;

		async function loop() {
			skip++;
			webcam.update(); // update the webcam frame
			if(skip%5==0)
			{
				// predict can take in an image, video or canvas html element
				const prediction = await model.predict(webcam.canvas);
				let str="";
				let maxp = prediction[0].probability;
				let who = prediction[0].className;
				for (let i = 0; i < prediction.length; i++) 
				{
				    	str += prediction[i].className + ": " + prediction[i].probability.toFixed(2)*100 + "%<br>";
					if(prediction[i].probability > maxp)
					{
						maxp = prediction[i].probability;
						who = prediction[i].className
					}	
				}
				text.innerHTML = str + "<br>Визначено " + who + " з ймовірністю "+maxp ;
			}
			window.requestAnimationFrame(loop);
	    	}

		window.requestAnimationFrame(loop);
	}

	init();
});

