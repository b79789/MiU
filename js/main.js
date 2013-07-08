/* Brian Stacks
   VFW 1306
   6-3-13
   Project 1*/
window.addEventListener("DOMContentLoaded", function(){
	
	function $(x){
		var myElement = document.getElementById(x);
		return myElement;
	}
	// create select field element and populate with options
	function makingMySelect (){
		var formTag = document.getElementsByTagName("form");// array
		var	selectLi = $("select");
		var	makeSelect = document.createElement("select");
			makeSelect.setAttribute("id","peopleGoing");
		for(i=0,j=reservePeopleGoing.length;i<j;i++){
			var makeOption = document.createElement("option");
			var optText = reservePeopleGoing[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		if(selectLi){
		selectLi.appendChild(makeSelect);
		}
	}
	// find value of radio buttons
	function getSelectedPlace(){
		var radios = document.forms[0].cPlace;
		for(i=0;i<radios.length;i++){
			if(radios[i].checked){
				placeValue = radios[i].value;
			}
			
		}
	}
	
	function getMyCheckedBox1(){
		if($("applebee").checked){
			cPlaceValue.push("applebee");
		}else{
			cPlaceValue.push("No applebees");
		}
	}
	
	function getMyCheckedBox2(){
		if($("chili").checked){
			cPlaceValue.push("chili");
		}else{
			cPlaceValue.push("No chilis");
		}
	}

	function toggleControl(n){
		switch(n){
		case "on":
			$("contactForm").style.display="none";
			$("clearData").style.display="inline";
			$("displayData").style.display="none";
			$("addNew").style.display="inline";
			break;
		case "off":
			$("contactForm").style.display="block";
			$("clearData").style.display="inline";
			$("displayData").style.display="inline";
			$("addNew").style.display="none";
			$("items").style.display="none";
			break;
		default:
			return false;
			}
	}
	
	function saveData(key){
		if(!key){
				var id		 = Math.floor(Math.random()*90000009);//generate key
				}else{
		id = key;
	}
		getSelectedPlace();
		getMyCheckedBox1();
		getMyCheckedBox2();
		var item = {};
			item.places =["People",$("peopleGoing").value];
			item.fName =["Name",$("fName").value];
			item.eMail =["Email",$("eMail").value];
			item.pWord =["Password",$("pWord").value];
			item.eDate =["Date",$("eDate").value];
			item.eTime =["Time",$("eTime").value];
			item.place =["Place",cPlaceValue];
			item.comments =["Comments",$("comments").value];
			//Save data into local storage using stringify to get the object to a str
			localStorage.setItem(id,JSON.stringify(item));
			alert("Succesful!!");
	}
	
	function showUserData(){
		toggleControl("on");	
		if(localStorage.length === 0){
			alert("There is no data in local Storage so default data added.");
			autoFillData();
		}
		// write data from local storage to browser
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(i=0, j=localStorage.length;i<j;i++){
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li")
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert string back to object
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.places[1],makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" : "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi)
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	function getImage(catName,makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement("img")
		var setSource = newImage.setAttribute("src", "img/"+ catName + ".png");
		imageLi.appendChild(newImage);
	}

	// store default info from json.js
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*90000009);//generate key
			localStorage.setItem(id,JSON.stringify(json[n]));
		}
	}

	// create links for edit and delete
	function makeItemLinks(key,linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Info";
		editLink.addEventListener("click",editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete info";
		deleteLink.addEventListener("click",deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		// grab the data from local storage item
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		var array1 = [$("applebee").id,$("chili").id];
		
		//show the form
		toggleControl("off");
		
		
		$("peopleGoing").value = item.places[1];
		$("fName").value = item.fName[1];
		$("eMail").value = item.eMail[1];
		$("pWord").value = item.pWord[1];
		$("eDate").value = item.eDate[1];
		$("eTime").value = item.eTime[1];
		
		for(i=0;i<array1.length;i++){
			for(j=0;j<item.place[1].length;j++){
				if(array1[i] === item.place[1][j]){
					$(array1[i]).setAttribute("checked", "checked");
				}
			}
		}
		/*for(i=0;i<array1.length;i++){
			for(j=0;j<array1.length;i++){
				if(array1[i] === array1[j]){
					$("applebee").setAttribute("checked", "checked");
				}else if(array1[j] === array1[i]){
					$("chili").setAttribute("checked", "checked");

				}else{
					return false;
				}
			}
		}*/
		$("comments").value = item.comments[1];
		
		// remove the listener from the input save reserve button
		getInfoButton.removeEventListener("click",saveData);
		// change submit value to say edit button
		$("submit").value = "Edit Reservation";
		var editSubmit =$("submit");
		editSubmit.addEventListener("click",validate);
		editSubmit.key = this.key;
	}
	
	function clearUserData(){
		if(localStorage.length === 0){
			alert("There is no data!")
		}else{
			localStorage.clear();
			alert("All info wiped!");
			window.location.reload();
			return false;
		}
}
	
	function validate(e){
		// define values we want to check
		var getFname = $("fName");
		var getEmail = $("eMail");
		// reset error
		errMsg.innerHTML = " ";
			getFname.style.border = "1px solid black";
			getEmail.style.border ="1px solid black";

		
		//get error messages
		var messageAry = [];
				// first name vlidation
		if(getFname.value === ""){
			var fNameError = "Please enter Name";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter valid email";
			getEmail.style.border ="1px solid red";
			messageAry.push(emailError);
		}
		if(messageAry.length >= 1){
			for(i=0,j = messageAry.length;i<j;i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
		return false;
		}else{
			saveData(this.key);
		}
		
	}
		
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Reservation deleted")
			window.location.reload();
		}else{
			alert("Reservation not deleted!")
		}
	}

	var reservePeopleGoing = ["1","2","3","4","5"],
		placeValue,
		cPlaceValue = [],
		errMsg = $("errors");
	makingMySelect ();
	
	var clearData = $("clearData");
	clearData.addEventListener("click",clearUserData);
	var getInfoButton =$("submit");
	getInfoButton.addEventListener("click",validate);
	var displayLink = $("displayData");
	displayLink.addEventListener("click",showUserData)
	






});