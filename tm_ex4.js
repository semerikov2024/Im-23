document.addEventListener("DOMContentLoaded", () => {

	async function init() {

		const model = await handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands, 
			{	
			  runtime: 'mediapipe', // or 'tfjs',
			  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
			  modelType: 'full'
			});

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
				const prediction = await model.estimateHands(webcam.canvas);
				if(prediction.length == 0)
					text.innerHTML = "руки не видно";
				else
				{
					let str="";
					for(let hand =0;hand <prediction.length ;hand++)
					{
						//console.log(prediction[hand]["handedness"]);
						str += "<p>Визначено руку: " + prediction[hand]["handedness"] +
							" з ймовірністю " + prediction[hand]["score"].toFixed(2)+"<br>";
						for(let finger=0; finger < prediction[hand]["keypoints"].length; finger++)
						{
							str+= "&nbsp;&nbsp;&nbsp;Палець: " +
								prediction[hand]["keypoints"][finger]["name"] + " (" +
								prediction[hand]["keypoints"][finger]["x"].toFixed(0) + ", " +
								prediction[hand]["keypoints"][finger]["y"].toFixed(0) + ")<br>";
						}
/*
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
*/
					}
					text.innerHTML = str;
				}	
/*	
[
    {
        "keypoints": [
            {
                "x": 56.4847514256835,
                "y": 518.1980202198029,
                "name": "wrist"
            },
            {
                "x": 129.4129974246025,
                "y": 480.4653400182724,
                "name": "thumb_cmc"
            },
            {
                "x": 174.9260693192482,
                "y": 402.3435907959938,
                "name": "thumb_mcp"
            },
            {
                "x": 196.18515381217003,
                "y": 343.16598093509674,
                "name": "thumb_ip"
            },
            {
                "x": 209.97508245706558,
                "y": 302.7270117402077,
                "name": "thumb_tip"
            },
            {
                "x": 112.27755506336689,
                "y": 302.28126659989357,
                "name": "index_finger_mcp"
            },
            {
                "x": 129.27996262907982,
                "y": 231.46700209379196,
                "name": "index_finger_pip"
            },
            {
                "x": 141.60114406049252,
                "y": 187.67952167987823,
                "name": "index_finger_dip"
            },
            {
                "x": 151.88462510704994,
                "y": 150.388861566782,
                "name": "index_finger_tip"
            },
            {
                "x": 73.17585524171591,
                "y": 287.54694029688835,
                "name": "middle_finger_mcp"
            },
            {
                "x": 71.0157859325409,
                "y": 192.90402334928513,
                "name": "middle_finger_pip"
            },
            {
                "x": 73.44100812077522,
                "y": 131.0639520585537,
                "name": "middle_finger_dip"
            },
            {
                "x": 74.7337175309658,
                "y": 79.37288162112236,
                "name": "middle_finger_tip"
            },
            {
                "x": 36.17909347638488,
                "y": 294.0565848648548,
                "name": "ring_finger_mcp"
            },
            {
                "x": 23.58439477533102,
                "y": 202.2672904729843,
                "name": "ring_finger_pip"
            },
            {
                "x": 21.178016111254692,
                "y": 140.5972134768963,
                "name": "ring_finger_dip"
            },
            {
                "x": 20.382431365549564,
                "y": 88.35310864448547,
                "name": "ring_finger_tip"
            },
            {
                "x": -2.5130810290575027,
                "y": 318.59922498464584,
                "name": "pinky_finger_mcp"
            },
            {
                "x": -30.197215519845486,
                "y": 250.71791499853134,
                "name": "pinky_finger_pip"
            },
            {
                "x": -41.836896769702435,
                "y": 203.78594756126404,
                "name": "pinky_finger_dip"
            },
            {
                "x": -48.27629888802767,
                "y": 162.24770003557205,
                "name": "pinky_finger_tip"
            }
        ],
        "keypoints3D": [
            {
                "x": -0.003990225028246641,
                "y": 0.09476915001869202,
                "z": -0.0118865966796875,
                "name": "wrist"
            },
            {
                "x": 0.025156591087579727,
                "y": 0.07084206491708755,
                "z": -0.0084075927734375,
                "name": "thumb_cmc"
            },
            {
                "x": 0.04450054466724396,
                "y": 0.04734203964471817,
                "z": -0.00299835205078125,
                "name": "thumb_mcp"
            },
            {
                "x": 0.053407929837703705,
                "y": 0.019435420632362366,
                "z": -0.0028533935546875,
                "name": "thumb_ip"
            },
            {
                "x": 0.05505097657442093,
                "y": 0.0000031674280762672424,
                "z": 0.0034198760986328125,
                "name": "thumb_tip"
            },
            {
                "x": 0.021095532923936844,
                "y": 0.0026983926072716713,
                "z": 0.0142669677734375,
                "name": "index_finger_mcp"
            },
            {
                "x": 0.027779167518019676,
                "y": -0.02258436381816864,
                "z": 0.00621795654296875,
                "name": "index_finger_pip"
            },
            {
                "x": 0.03066079691052437,
                "y": -0.04003038629889488,
                "z": -0.0025043487548828125,
                "name": "index_finger_dip"
            },
            {
                "x": 0.035491008311510086,
                "y": -0.05097886919975281,
                "z": -0.0276947021484375,
                "name": "index_finger_tip"
            },
            {
                "x": -0.0009504781337454915,
                "y": -0.0035224026069045067,
                "z": 0.00798797607421875,
                "name": "middle_finger_mcp"
            },
            {
                "x": 0.0029327040538191795,
                "y": -0.04180968925356865,
                "z": 0.0010881423950195312,
                "name": "middle_finger_pip"
            },
            {
                "x": 0.0024967140052467585,
                "y": -0.06272479891777039,
                "z": -0.01058197021484375,
                "name": "middle_finger_dip"
            },
            {
                "x": 0.006791846826672554,
                "y": -0.08972401171922684,
                "z": -0.022216796875,
                "name": "middle_finger_tip"
            },
            {
                "x": -0.015275788493454456,
                "y": -0.0031431233510375023,
                "z": -0.00885009765625,
                "name": "ring_finger_mcp"
            },
            {
                "x": -0.016302751377224922,
                "y": -0.03362554311752319,
                "z": -0.0134429931640625,
                "name": "ring_finger_pip"
            },
            {
                "x": -0.01486499048769474,
                "y": -0.05951404944062233,
                "z": -0.0227203369140625,
                "name": "ring_finger_dip"
            },
            {
                "x": -0.012756972573697567,
                "y": -0.08144671469926834,
                "z": -0.033721923828125,
                "name": "ring_finger_tip"
            },
            {
                "x": -0.025611935183405876,
                "y": 0.010128778405487537,
                "z": -0.0239105224609375,
                "name": "pinky_finger_mcp"
            },
            {
                "x": -0.03267229348421097,
                "y": -0.00948571041226387,
                "z": -0.024200439453125,
                "name": "pinky_finger_pip"
            },
            {
                "x": -0.03763826563954353,
                "y": -0.03360839560627937,
                "z": -0.031036376953125,
                "name": "pinky_finger_dip"
            },
            {
                "x": -0.037486352026462555,
                "y": -0.051525626331567764,
                "z": -0.04180908203125,
                "name": "pinky_finger_tip"
            }
        ],
        "score": 0.98681640625,
        "handedness": "Left"
    },
    {
        "keypoints": [
            {
                "x": 383.7984976172447,
                "y": 496.9741879105568,
                "name": "wrist"
            },
            {
                "x": 300.41707214713097,
                "y": 455.04931104183197,
                "name": "thumb_cmc"
            },
            {
                "x": 246.35564643144608,
                "y": 379.8182408809662,
                "name": "thumb_mcp"
            },
            {
                "x": 206.69271031022072,
                "y": 322.6423419713974,
                "name": "thumb_ip"
            },
            {
                "x": 157.1353282481432,
                "y": 285.6977624595165,
                "name": "thumb_tip"
            },
            {
                "x": 280.4026788175106,
                "y": 282.0057510137558,
                "name": "index_finger_mcp"
            },
            {
                "x": 244.47063437104225,
                "y": 214.21411389112473,
                "name": "index_finger_pip"
            },
            {
                "x": 214.9798060655594,
                "y": 173.28533917665482,
                "name": "index_finger_dip"
            },
            {
                "x": 188.87600058317184,
                "y": 132.6791306734085,
                "name": "index_finger_tip"
            },
            {
                "x": 313.4677914083004,
                "y": 266.7109596133232,
                "name": "middle_finger_mcp"
            },
            {
                "x": 292.6250978708267,
                "y": 174.78412932157516,
                "name": "middle_finger_pip"
            },
            {
                "x": 272.7367160618305,
                "y": 115.8409843146801,
                "name": "middle_finger_dip"
            },
            {
                "x": 254.61786970496178,
                "y": 61.43706724047661,
                "name": "middle_finger_tip"
            },
            {
                "x": 345.20614528656006,
                "y": 273.10039365291595,
                "name": "ring_finger_mcp"
            },
            {
                "x": 326.1032255887985,
                "y": 181.8043776154518,
                "name": "ring_finger_pip"
            },
            {
                "x": 305.1221424937248,
                "y": 124.35480380058289,
                "name": "ring_finger_dip"
            },
            {
                "x": 285.3049246966839,
                "y": 73.90202209353447,
                "name": "ring_finger_tip"
            },
            {
                "x": 375.74699199199677,
                "y": 293.97686487436295,
                "name": "pinky_finger_mcp"
            },
            {
                "x": 360.0422120690346,
                "y": 218.28295701742172,
                "name": "pinky_finger_pip"
            },
            {
                "x": 341.6565200686455,
                "y": 166.8137599825859,
                "name": "pinky_finger_dip"
            },
            {
                "x": 320.8895692527294,
                "y": 120.2292118370533,
                "name": "pinky_finger_tip"
            }
        ],
        "keypoints3D": [
            {
                "x": 0.02314302884042263,
                "y": 0.09637659788131714,
                "z": -0.0069732666015625,
                "name": "wrist"
            },
            {
                "x": -0.007963526993989944,
                "y": 0.07471530139446259,
                "z": 0.002490997314453125,
                "name": "thumb_cmc"
            },
            {
                "x": -0.025885850191116333,
                "y": 0.051590289920568466,
                "z": 0.00476837158203125,
                "name": "thumb_mcp"
            },
            {
                "x": -0.04773504659533501,
                "y": 0.023847270756959915,
                "z": 0.00836944580078125,
                "name": "thumb_ip"
            },
            {
                "x": -0.06509921699762344,
                "y": 0.003287835977971554,
                "z": 0.018341064453125,
                "name": "thumb_tip"
            },
            {
                "x": -0.020456084981560707,
                "y": 0.007308525033295155,
                "z": 0.020294189453125,
                "name": "index_finger_mcp"
            },
            {
                "x": -0.03032504767179489,
                "y": -0.022106703370809555,
                "z": 0.0132598876953125,
                "name": "index_finger_pip"
            },
            {
                "x": -0.04116170108318329,
                "y": -0.03930285573005676,
                "z": 0.004344940185546875,
                "name": "index_finger_dip"
            },
            {
                "x": -0.05541323125362396,
                "y": -0.05215700715780258,
                "z": -0.01548004150390625,
                "name": "index_finger_tip"
            },
            {
                "x": -0.0031775387469679117,
                "y": -0.003159439656883478,
                "z": 0.0090484619140625,
                "name": "middle_finger_mcp"
            },
            {
                "x": -0.009864323772490025,
                "y": -0.04130706563591957,
                "z": 0.0009479522705078125,
                "name": "middle_finger_pip"
            },
            {
                "x": -0.02142491564154625,
                "y": -0.061999280005693436,
                "z": -0.0087432861328125,
                "name": "middle_finger_dip"
            },
            {
                "x": -0.0341070294380188,
                "y": -0.08672043681144714,
                "z": -0.01922607421875,
                "name": "middle_finger_tip"
            },
            {
                "x": 0.014285638928413391,
                "y": -0.005336317699402571,
                "z": -0.012603759765625,
                "name": "ring_finger_mcp"
            },
            {
                "x": 0.005683192051947117,
                "y": -0.03384030982851982,
                "z": -0.0190582275390625,
                "name": "ring_finger_pip"
            },
            {
                "x": -0.006008198484778404,
                "y": -0.05722029134631157,
                "z": -0.0272216796875,
                "name": "ring_finger_dip"
            },
            {
                "x": -0.017584577202796936,
                "y": -0.0800132155418396,
                "z": -0.034912109375,
                "name": "ring_finger_tip"
            },
            {
                "x": 0.02261475846171379,
                "y": 0.0073717739433050156,
                "z": -0.0328369140625,
                "name": "pinky_finger_mcp"
            },
            {
                "x": 0.02091604471206665,
                "y": -0.016324326395988464,
                "z": -0.032470703125,
                "name": "pinky_finger_pip"
            },
            {
                "x": 0.011419188231229782,
                "y": -0.03917643427848816,
                "z": -0.036102294921875,
                "name": "pinky_finger_dip"
            },
            {
                "x": -0.002299463376402855,
                "y": -0.0615401491522789,
                "z": -0.043792724609375,
                "name": "pinky_finger_tip"
            }
        ],
        "score": 0.98748779296875,
        "handedness": "Right"
    }
]
*/
			}
			window.requestAnimationFrame(loop);
	    	}

		window.requestAnimationFrame(loop);
	}

	init();
});

