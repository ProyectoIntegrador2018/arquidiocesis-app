import { Alert, Platform } from "react-native"

var alert = (title, message, buttons)=>{
	var mobileAlert = ()=>{
		Alert.alert(title, message, buttons)
	}

	var webAlert = ()=>{
		if(buttons){
			var a = confirm(title+'\n'+message);
			var c = buttons.find(b=>a ? b.style!='cancel' : b.style=='cancel');
			if(c && c.onPress) c.onPress()
		}else{
			alert(message);
		}
	}

	Platform.select({
		web: webAlert,
		android: mobileAlert,
		ios: mobileAlert
	})();
}


export default {
	alert
}