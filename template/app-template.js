"use strict";
//
//  app-template.js
//
//  Created by Keb Helion, February 2020.
//
//  This is a template of a typical application using a HTML ui.
//  You can use it to start to build your own project.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//	
(function() {
	var jsMainFileName = "app-template.js"; // <=== REPLACE VALUE (File name of this current .js file)
	var ROOT = Script.resolvePath('').split(jsMainFileName)[0];
	
	var APP_NAME = "TEMPLATE"; // <=== REPLACE VALUE (Caption of the Tablet button.)
	var APP_URL = ROOT + "template.html"; // <=== REPLACE VALUE (html page that will be your UI)
	var APP_ICON_INACTIVE = ROOT + "icon_template_inactive.png"; // <=== REPLACE VALUE (Provide a 50 X 50 pixels, .png or .svg file, WHITE on transparent background)
	var APP_ICON_ACTIVE = ROOT + "icon_template_active.png"; // <=== REPLACE VALUE  (Provide a 50 X 50 pixels, .png or .svg file, BLACK on transparent background)
	var Appstatus = false;
		
	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
	
	tablet.screenChanged.connect(onScreenChanged);
	
	var button = tablet.addButton({
		text: APP_NAME,
		icon: APP_ICON_INACTIVE,
        activeIcon: APP_ICON_ACTIVE
	});
	
	
	function clicked(){
		if (Appstatus == true){
			tablet.webEventReceived.disconnect(onMoreAppWebEventReceived); 
			tablet.gotoHomeScreen();
			Appstatus = false;
		}else{
			//Launching the Application UI. 
			
			//Data can be transmitted using GET methode, through paramater in the URL.			
			tablet.gotoWebScreen(APP_URL);			
			tablet.webEventReceived.connect(onMoreAppWebEventReceived);		
			Appstatus = true;
		}

		button.editProperties({
			isActive: Appstatus
		});
	}
	
	button.clicked.connect(clicked);

	
	function onMoreAppWebEventReceived(event){
		
		if(typeof event === "string"){
			eventObj = JSON.parse(event);
			
			//Here you can react to the different attributes of the object recieved from the html UI
			/*
			if(eventObj.attribute === "installScript"){
				
				//We could reply using: 
				//tablet.emitScriptEvent(JSON.stringify(anyJSONObject));
			}
			*/

			
		}
		
	}


	function onScreenChanged(type, url) {
		if (type == "Web" && url.indexOf(APP_URL) != -1){
			Appstatus = true;
			//Here we know that the HTML UI is loaded.
			//We could communitate to it here as we know it is loaded. Using:
			//tablet.emitScriptEvent(JSON.stringify(anyJSONObject));
			
		}else{;
			Appstatus = false;
		}
		
		button.editProperties({
			isActive: Appstatus
		});
	}
	
	
	function cleanup() {
		tablet.webEventReceived.disconnect(onMoreAppWebEventReceived);
		tablet.screenChanged.disconnect(onScreenChanged);
		tablet.removeButton(button);
	}
	
	Script.scriptEnding.connect(cleanup);
}());